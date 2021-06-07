const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;

// Create and save data
exports.create = (req,res) => {
    // Validate request
    if(!req.body.nama){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // create data
    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        nohp: req.body.nohp,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    // save data
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User data."
            });
        });
}

// Get all data
exports.findAll = (req,res) => {
    const nama = req.query.nama;
    var condition = nama ? {nama: {$regex: new RegExp(nama), $options: "i"}} : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving user data."
            });
        });
}

// Get one data
exports.findOne = (req,res) => {
    const id = req.params.id;

    User.findById(id)
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
}

// update data
exports.update = (req,res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
}

// Delete one data
exports.delete = (req,res) => {
    const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
}

// Delete all data
exports.deleteAll = (req,res) => {
    User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
}