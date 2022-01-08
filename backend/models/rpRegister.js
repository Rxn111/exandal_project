'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RP_Register extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RP_Register.belongsTo(models.work_shift, {
                as: 'work_shift',
                foreignKey: 'work_shift_id'
            });
            
            RP_Register.belongsTo(models.mp_register, {
                as: 'mp_register',
                foreignKey: 'mp_register_id'
            });           
        }
    }

    RP_Register.init({
        date: DataTypes.DATEONLY,
        work_shift_id: DataTypes.INTEGER.UNSIGNED,        
        registration_datetime: DataTypes.DATE,
        lot_pt: DataTypes.STRING,
        production_order: DataTypes.STRING,        
        mp_register_id: DataTypes.INTEGER.UNSIGNED,
        unit_quantity: DataTypes.DECIMAL,
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'rp_register',
        tableName: 'rp_registers'
    });

    return RP_Register;
};