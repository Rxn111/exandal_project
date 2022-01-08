const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

const MP_Register = require('../models').mp_register;
const RP_Register = require('../models').rp_register;
const Operator = require('../models').operator;
const Material = require('../models').material;

module.exports = {
    
    
    list (req, res){     
        
        let filterMPRegisterID = req.query.mp_registerId ? req.query.mp_registerId : null;
        let filters = {};
        
        if(filterMPRegisterID){
            filters.id = filterMPRegisterID;
        }
        
        
        MP_Register
            .findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include:[{
                    model: Operator,
                    as: 'operator',
                    attributes: ['code','name']
                },{
                    model: Material,
                    as: 'material',
                    attributes: ['code','description','unit']
                }],
                where: {
                    [Op.and]: filters
                },
            })
            .then(response => {
                res.json(response)
            })
            .catch(err => res.json(err));
    },
    
    
    listOperators (req, res){       
        
        Operator
            .findAll({
                attributes: ['id','code','name'],
            })
            .then(response => {
                res.json(response)
            })
            .catch(err => res.json(err));
    },
    
    
    listMaterials (req, res){       
        
        Material
            .findAll({
                attributes: ['id','code','description','unit'],
            })
            .then(response => {
                res.json(response)
            })
            .catch(err => res.json(err));
    },
    
    
    async create(req, res){
        
        await MP_Register
            .create({
                date: moment(req.body.date).toISOString(),
                work_shift_id: req.body.work_shift_id,
                registration_datetime: moment(req.body.registration_datetime).toISOString(),
                operator_id: req.body.operator_id,
                production_order: req.body.production_order,
                lot_mp: req.body.lot_mp,
                material_id: req.body.material_id,
                unit_quantity: req.body.unit_quantity    
            })
            .then(() => {
                res.sendStatus(200);
            });
    },
    
    
    listRP (req, res){       
        
        RP_Register
            .findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include:[{
                    model: MP_Register,
                    as: 'mp_register',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                    include: [{
                        model: Material,
                        as: 'material',
                        attributes: ['code','description','unit']
                    }]
                }]
            })
            .then(response => {
                res.json(response)
            })
            .catch(err => res.json(err));
    },
    
    async createRP(req, res){
        
        await RP_Register
            .create({
                date: moment(req.body.date).toISOString(),
                work_shift_id: req.body.work_shift_id,
                registration_datetime: moment(req.body.registration_datetime).toISOString(),
                production_order: req.body.production_order,
                lot_pt: req.body.lot_pt,
                mp_register_id: req.body.mp_register_id,
                unit_quantity: req.body.unit_quantity    
            })
            .then(() => {
                res.sendStatus(200);
            });
    },
    
}