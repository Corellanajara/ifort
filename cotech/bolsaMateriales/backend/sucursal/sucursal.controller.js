const Sucursal = require('./sucursal.model.js');

//Create new Sucursal
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const sucursal = new Sucursal({
        title: req.body.title || "Sin definir",
        code : req.body.code,
        users : req.body.users
    });

    sucursal.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las sucursales."
        });
    });
};

// Retrieve all sucursales from the database.
exports.findAll = (req, res) => {
    Sucursal.find()
    .then(sucursales => {
        res.send(sucursales);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las sucursales."
        });
    });
};

// Find a single sucursal with a sucursalId
exports.findOne = (req, res) => {
    Sucursal.findById(req.params.sucursalId)
    .then(sucursal => {
        if(!sucursal) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.sucursalId
            });
        }
        res.send(sucursal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado sucursal  " + req.params.sucursalId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.sucursalId
        });
    });
};


exports.update = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "sucursal content can not be empty"
        });
    }

    Sucursal.findByIdAndUpdate(req.params.sucursalId, {
        title: req.body.title || "Sin definir",
        code : req.body.code,
        users : req.body.users
    }, {new: true})
    .then(sucursal => {
        if(!sucursal) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.sucursalId
            });
        }
        res.send(sucursal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.sucursalId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.sucursalId
        });
    });
};

exports.delete = (req, res) => {
    Sucursal.findByIdAndRemove(req.params.sucursalId)
    .then(sucursal => {
        if(!sucursal) {
            return res.status(404).send({
                message: "sucursal no encontrado id " + req.params.sucursalId
            });
        }
        res.send({message: "sucursal borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "sucursal no encontrado id " + req.params.sucursalId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el sucursal id " + req.params.sucursalId
        });
    });
};
