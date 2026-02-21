import { modelMap } from '../models/index.js';

/**
 * Fetches messages from the database.
 * @param {object} filter - MongoDB filter object.
 * @param {object} projection - MongoDB projection object.
 * @param {object} options - MongoDB query options.
 * @returns {Promise<Array>} Array of messages.
 */
async function fetchAll(filter, projection, options) {
  return modelMap.messagesModel.getModel().find(filter, projection, options);
}

/**
 * Module containing database operations for messages.
 * @module messages
 */
export const messages = {
  fetchAll,
};
