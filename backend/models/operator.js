'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Operator extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Operator.hasMany(models.mp_register, {
                as: "mp_registers",
                foreignKey: "operator_id",
            });
        }
    }
  
    Operator.init({        
        code: DataTypes.STRING,
        name: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'operator',
        tableName: 'operators'
    });
  
    return Operator;
};