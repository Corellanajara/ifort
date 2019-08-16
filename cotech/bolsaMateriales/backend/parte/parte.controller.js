const Materia = require('./parte.model.js');

//Create new materia
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {

        return res.status(400).send({
            message: "No puede estar vacio"
        });
    }

    const materia = new Materia({
      nombre: req.body.nombre,
      codigo_jurisdiccion : req.body.codigo_jurisdiccion,
    });

    // Save materia in the database
    materia.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Error en crear las materias."
        });
    });
};

// Retrieve all materias from the database.
exports.findAll = (req, res) => {
    Materia.find()
    .then(materias => {
        res.send(materias);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error en traer las materias."
        });
    });
};


// Find a single materia with a materiaId
exports.findOne = (req, res) => {
    Materia.find({ materia : req.params.materiaId })
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado materiao  " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.materiaId
        });
    });
};


exports.findByJuridisccion = (req, res) => {
    Materia.find({ codigo_jurisdiccion : req.params.juridisccionId })
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No se encontro info con la id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado materiao  " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se puedo encontrar " + req.params.materiaId
        });
    });
};
// Update a materia
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "materia content can not be empty"
        });
    }

    // Find and update materia with the request body
    Materia.findByIdAndUpdate(req.params.materiaId, {
      nombre: req.body.nombre,
      codigo_jurisdiccion : req.body.codigo_jurisdiccion,
    }, {new: true})
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "No encontrado id " + req.params.materiaId
            });
        }
        res.send(materia);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "No encontrado id" + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "Error al actualizar id " + req.params.materiaId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Materia.findByIdAndRemove(req.params.materiaId)
    .then(materia => {
        if(!materia) {
            return res.status(404).send({
                message: "materiao no encontrado id " + req.params.materiaId
            });
        }
        res.send({message: "materiao borrado correctamente!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "materiao no encontrado id " + req.params.materiaId
            });
        }
        return res.status(500).send({
            message: "No se pudo borrar el materiao id " + req.params.materiaId
        });
    });
};
