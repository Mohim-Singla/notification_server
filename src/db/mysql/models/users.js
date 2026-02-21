import { Model, DataTypes } from 'sequelize';

const schema = {
  userId: { type: DataTypes.STRING, required: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING },
  isEnabled: { type: DataTypes.BOOLEAN },
};

let model;

export const usersModel = {
  /**
   * Initializes the users model.
   * @param {Sequelize} mysqlConnection - The Sequelize connection.
   * @returns {Promise<void>}
   */
  init: async (mysqlConnection) => {
    class users extends Model {}
    model = users.init(schema, { sequelize: mysqlConnection, modelName: 'users' });
    users.removeAttribute('id');
  },

  /**
   * Gets the users model instance.
   * @returns {Model} The Sequelize model.
   */
  getModel: () => model,
};
