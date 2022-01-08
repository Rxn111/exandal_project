const registrationController = require('../controllers/registration');

module.exports = (app) => {
    
    app.get('/api/dashboard/registration/all', registrationController.list);    
    app.get('/api/dashboard/registration/operators', registrationController.listOperators);
    app.get('/api/dashboard/registration/materials', registrationController.listMaterials);
    app.post('/api/dashboard/registration/create', registrationController.create);
    
    app.get('/api/dashboard/registration/resulting-product/all', registrationController.listRP);    
    app.post('/api/dashboard/registration/resulting-product/create', registrationController.createRP);
    
}