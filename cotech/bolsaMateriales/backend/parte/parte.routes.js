module.exports = (app) => {
    const partes = require('./parte.controller.js');

    app.post('/partes/', partes.create);

    app.get('/partes/', partes.findAll);

    app.get('/partes/:materiaId', partes.findOne);

    app.get('/partes/juridisccion/:juridisccionId', partes.findByJuridisccion);

    app.put('/partes/:materiaId', partes.update);

    app.delete('/partes/:materiaId', partes.delete);
}
