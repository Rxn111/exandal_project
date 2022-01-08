'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Material extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Material.hasMany(models.mp_register, {
                as: "mp_registers",
                foreignKey: "material_id",
            });
        }
    }
  
    Material.init({        
        code: DataTypes.STRING,
        description: DataTypes.STRING,
        unit: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'material',
        tableName: 'materials'
    });
  
    return Material;
};