var logger = require('logger-initializer')();

module.exports = function internalErrorMW(error, req, res, next) {
  var internalErrorResponse = {
    status  : 'Internal Server Error',
    message : error.message,
    error   : error
  };

  logger.error(internalErrorResponse);
  logger.error(error.stack);

  res.status(500);
  res.json(internalErrorResponse);
};