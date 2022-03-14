const Objet = require('../model/Object');
const validator = require('express-validator');

// Avoir tout les objets
module.exports.list = function (req, res, next) {
  Objet.find({}, function(err, objet){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(objet);
  });
}


// Avoir un objet
module.exports.show = function(req, res) {
  var id = req.params.id;
  Objet.findOne({_id: id}, function(err, objet){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!objet) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(objet);
  });
}


// creer un objet
module.exports.create = [

  validator.body('title', 'Please enter Article Title').isLength({ min: 1 }),
  validator.body('title').custom(value => {
    return Objet.findOne({title:value}).then(objet => {
      if (objet !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
 

  function(req, res) {

    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var objet = new Objet({
        title : req.body.title,
       
    })

    objet.save(function(err, objet){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        return res.json({
            message: 'saved',
            _id: objet._id
        });
    })
  }
]

// Mettre à jour l'objet
module.exports.update = [

  validator.body('title', 'Please enter Object Title').isLength({ min: 1 }),
  validator.body('title').custom( (value, {req}) => {
    return Objet.findOne({ title:value, _id:{ $ne: req.params.id } })
      .then( objet => {
      if (objet !== null) {
        return Promise.reject('Title already in use');
      }
    })
  }),
  
  function(req, res) {
 
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Objet.findOne({_id: id}, function(err, objet){
        if(err) {
            return res.status(500).json({
                message: 'Error saving record',
                error: err
            });
        }
        if(!objet) {
            return res.status(404).json({
                message: 'No such record'
            });
        }


        objet.title =  req.body.title ? req.body.title : objet.title;
        


        objet.save(function(err, article){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting record.'
                });
            }
            if(!objet) {
                return res.status(404).json({
                    message: 'No such record'
                });
            }
            return res.json(objet);
        });
    });
  }

]

//suppresion d'un objet
module.exports.delete = function(req, res) {
  var id = req.params.id;
  Objet.findByIdAndRemove(id, function(err, objet){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      return res.json(objet);
  });
}
