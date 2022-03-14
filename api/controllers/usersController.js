const validator = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../model/User')
const config = require('../config')


module.exports.register = [

  validator.body('name', 'Entrez votre nom').isLength({ min: 1 }),
  validator.body('email', 'Entrez votre email').isLength({ min: 1 }),
  validator.body('email').custom(value => {
    return User.findOne({email:value}).then(user => {
      if (user !== null) {
        return Promise.reject('Email déjà utilisé');
      }
    })
  }),
  validator.body('password', 'Entrez votre mot de passe').isLength({ min: 1 }),

  function(req, res) {
 
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    })

    // crypte le mdp
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash

  
    user.save(function(err, user){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: user._id
        });
    })
  }
]


module.exports.login = [
  
  validator.body('email', 'Entre votre mail').isLength({ min: 1 }),
  validator.body('password', 'Entrez votre mot de passe').isLength({ min: 1 }),

  function(req, res) {
    
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    
    User.findOne({email: req.body.email}, function(err, user){
        if(err) {
            return res.status(500).json({
                message: 'Error logging in',
                error: err
            });
        }

        if (user === null) {
          return res.status(500).json({
            message: 'L adresse mail que vous avez entre n est pas connu'
          });
        }

        // compare si le mot de passe match avec le password dans la db
        return bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
          if(isMatched===true){
            return res.json({
              user: {
                _id: user._id,
                email: user.email,
                name: user.name
              },
              token: jwt.sign({_id: user._id, email: user.email, name: user.name}, config.authSecret) // generate JWT token here
            });
          }
          else{
            return res.status(500).json({
              message: 'Email ou mot de passe invalide'
            });
          }
        });
    });
  }
]

// Get User
module.exports.user = function(req, res) {
  const token = req.headers.authorization
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return res.json({ user: decoded })
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }
}