const express = require('express');

const auth            = require('./auth');
const AuthMiddleware  = require('../app/middleware/AuthMiddleware');
const ErrorMiddleware = require('../app/middleware/ErrorMiddleware');
const AjvValidators = require('../utils/AjvValidators');
const { TestController } = require('../app/controllers');

const router = express.Router();

router.use(auth);

router.get('/categories', TestController.getCategories);
router.get('/categories/:id', TestController.getCategory);

router.get('/attributes', TestController.getAttributes)
// router.get('/categories/:id', TestController.getCategoryItems);

router.get('/test', TestController.index);
router.get('/test/:id', TestController.findById)
router.post('/test/:id', TestController.saveAttributes);

router.post('/item', TestController.saveItem);

router.use(ErrorMiddleware)

module.exports = router;
