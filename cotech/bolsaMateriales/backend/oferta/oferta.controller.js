const Oferta = require('./oferta.model.js');

//Create new oferta
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const oferta = new Oferta({
      titulo : req.body.titulo,
      direccion : req.body.direccion,
      fechaExpiracion : req.body.fechaExpiracion,
      fechaDespacho : req.body.fechaDespacho,
      tipo : req.body.tipo,

    });

    oferta.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las ofertas."
        });
    });
};

// Retrieve all ofertaes from the database.
exports.findAll = (req, res) => {
    Oferta.find()
    .then(ofertaes => {
        res.send(ofertaes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las ofertaes."
        });
    });
};


// Find a single oferta with a ofertaId
exports.findOne = (req, res) => {
    Oferta.findById(req.params.ofertaId)
    .then(oferta => {
        if(!oferta) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.ofertaId
            });
        }
        res.send(oferta);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado oferta  " + req.params.ofertaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.ofertaId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "oferta content can not be empty"
        });
    }

    Oferta.findByIdAndUpdate(req.params.ofertaId, {
      titulo : req.body.titulo,
      direccion : req.body.direccion,
      fechaExpiracion : req.body.fechaExpiracion,
      fechaDespacho : req.body.fechaDespacho,
      tipo : req.body.tipo,

    }, {new: true})
    .then(oferta => {
        if(!oferta) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.ofertaId
            });
        }
        res.send(oferta);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.ofertaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.ofertaId
        });
    });
};

exports.delete = (req, res) => {
    oferta.findByIdAndRemove(req.params.ofertaId)
    .then(oferta => {
        if(!oferta) {
            return res.status(404).send({
                message: "oferta no encontrado id " + req.params.ofertaId
            });
        }
        res.send({message: "oferta borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "oferta no encontrado id " + req.params.ofertaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el oferta id " + req.params.ofertaId
        });
    });
};
