module.exports = (app) => {
    const sucursales = require('./sucursal.controller.js');

    app.post('/sucursales', sucursales.create);

    app.get('/sucursales', sucursales.findAll);

    app.get('/sucursales/:sucursalId', sucursales.findOne);

    app.put('/sucursales/:sucursalId', sucursales.update);

    app.delete('/sucursales/:sucursalId', sucursales.delete);
}
