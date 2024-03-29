const hiresRoutes = require('express').Router();
const urlencoded = require('body-parser').urlencoded({ extended: false });
const asyncHandler = require('../app/middlewares/asyncHandler');

// CONTROLLER DECLARATIONS
const { getHireMessages, getDetailHireMessage, addHireMessage } = require('../app/controllers/hiresControllers');

// ROUTE ENDPOINTS
hiresRoutes.get('/', asyncHandler(getHireMessages))
  .get('/:id', asyncHandler(getDetailHireMessage))
  .post('/', urlencoded, asyncHandler(addHireMessage));

module.exports = hiresRoutes;
