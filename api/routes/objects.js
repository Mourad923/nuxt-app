const express = require('express')
const config = require('../config')
const router = express.Router()

const objectsController = require('../controllers/objectsController')

// tous les objets
router.get('/objects', objectsController.list)

// avoir un objet
router.get('/objects/:id', objectsController.show)

// creer un objet
router.post('/objects', config.isAuthenticated, objectsController.create)

// mettre à jour l'objet
router.put('/objects/:id', config.isAuthenticated, objectsController.update)

// supprimer l'objet
router.delete('/objects/:id', config.isAuthenticated, objectsController.delete)

module.exports = router