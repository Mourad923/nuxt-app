const jwt = require('jsonwebtoken');

const config = {
  authSecret:'mysecret', 
}

module.exports = config

// verifie si l'utilisateur est authentifie
module.exports.isAuthenticated = function (req, res, next) {
  const token = req.headers.authorization
  if (token) {
    // verifie si le token a expiré
    jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, function(err, decoded) {
      if (err) {
        return res.status(401).json({message: 'unauthorized'})
      } else {
        return next();
      }
    });
  }
  else{
    return res.status(401).json({message: 'unauthorized'})
  }
}