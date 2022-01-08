'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class WorkShift extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            WorkShift.hasMany(models.mp_register, {
                as: "mp_registers",
                foreignKey: "work_shift_id",
            });
        }
    }
  
    WorkShift.init({        
        type: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'work_shift',
        tableName: 'work_shifts'
    });
  
    return WorkShift;
};