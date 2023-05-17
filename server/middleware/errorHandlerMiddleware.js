const logger = require('../utils/logger');

function ErrorHandlerMiddleware(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
}

module.exports = ErrorHandlerMiddleware;
