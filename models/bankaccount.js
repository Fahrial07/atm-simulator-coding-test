'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BankAccount.init({
    email: DataTypes.STRING,
    account_number: DataTypes.BIGINT,
    balance: DataTypes.BIGINT,
    debit: DataTypes.BIGINT,
    credit: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'BankAccount',
  });
  return BankAccount;
};