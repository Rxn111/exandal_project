'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MP_Register extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MP_Register.belongsTo(models.work_shift, {
                as: 'work_shift',
                foreignKey: 'work_shift_id'
            });
           
            MP_Register.belongsTo(models.operator, {
                as: 'operator',
                foreignKey: 'operator_id'
            });
            
            MP_Register.belongsTo(models.material, {
                as: 'material',
                foreignKey: 'material_id'
            });
            
            MP_Register.hasMany(models.rp_register, {
                as: "rp_registers",
                foreignKey: "mp_register_id",
            });
        }
    }

    MP_Register.init({
        date: DataTypes.DATEONLY,
        work_shift_id: DataTypes.INTEGER.UNSIGNED,        
        registration_datetime: DataTypes.DATE,
        operator_id: DataTypes.INTEGER.UNSIGNED,
        production_order: DataTypes.STRING,
        lot_mp: DataTypes.STRING,
        material_id: DataTypes.INTEGER.UNSIGNED,
        unit_quantity: DataTypes.DECIMAL,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'mp_register',
        tableName: 'mp_registers'
    });

    return MP_Register;
};