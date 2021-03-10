'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotExistException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, {response}) {
    return response.status(404).json({
      error: "Resource does not exist"
    });
  }
  // handle () {}
}

module.exports = ResourceNotExistException
