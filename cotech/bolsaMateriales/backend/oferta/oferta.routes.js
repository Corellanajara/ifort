module.exports = (app) => {
    const ofertas = require('./oferta.controller.js');

    app.post('/ofertas', ofertas.create);

    app.get('/ofertas', ofertas.findAll);

    app.get('/ofertas/:ofertaId', ofertas.findOne);  

    app.put('/ofertas/:ofertaId', ofertas.update);

    app.delete('/ofertas/:ofertaId', ofertas.delete);
}
