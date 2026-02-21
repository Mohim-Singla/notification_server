import Sequelize from 'sequelize';
import { mysqlConnectionConfig } from '../../../config/database/mysqlConnectionConfig.js';
import { modelMap } from '../models/index.js';

let mysqlConnectionInstance = null;

/**
 * Initializes the MySQL connection.
 * @returns {Promise<Sequelize>} The Sequelize connection instance.
 */
async function initConnection() {

  mysqlConnectionInstance = new Sequelize(mysqlConnectionConfig.database, mysqlConnectionConfig.username, mysqlConnectionConfig.password, mysqlConnectionConfig);

  await mysqlConnectionInstance.authenticate();

  return mysqlConnectionInstance;
}

/**
 * Initializes all models.
 * @returns {Promise<void>}
 */
async function initModels() {
  const promises = [];
  for(const modelItem of Object.keys(modelMap)) {
    promises.push(modelMap[modelItem].init(mysqlConnectionInstance));
  }
  await Promise.all(promises);
}

export const mysqlConnection = {
  /**
   * Initializes the MySQL connection and models.
   * @returns {Promise<Sequelize>} The connection instance.
   */
  init: async () => {
    await initConnection();
    await initModels();

    return mysqlConnectionInstance;
  },
  /**
   * Gets the MySQL connection instance.
   * @returns {Sequelize} The connection instance.
   */
  getInstance: () => mysqlConnectionInstance ?? mysqlConnection.init(),
};
