const db = require('../models');
const Hotel = db.hotel;
const upload = require("../middlewares");

// Create and save data
exports.create = async (req,res) => {
    // Validate request
    if(!req.body.nama_hotel){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    await upload(req,res);
    console.log(req.file);
    if(req.file == undefined){
        return res.send({message: "You must select photos"});
    }
    // create data
    const hotel = new Hotel({
        nama_hotel: req.body.nama_hotel,
        bintang: req.body.bintang,
        image: req.file,
    });

    // save data
    hotel
        .save(hotel)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Hotel data."
            });
        });
}

// Get all data
exports.findAll = (req,res) => {
    const nama_hotel = req.query.nama_hotel;
    var condition = nama_hotel ? {nama_hotel: {$regex: new RegExp(nama_hotel), $options: "i"}} : {};

    Hotel.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving hotel data."
            });
        });
}

// Get one data
exports.findOne = (req,res) => {
    const id = req.params.id;

    Hotel.findById(id)
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Hotel with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Hotel with id=" + id });
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

  Hotel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found!`
        });
      } else res.send({ message: "Hotel was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Hotel with id=" + id
      });
    });
}

// Delete one data
exports.delete = (req,res) => {
    const id = req.params.id;

  Hotel.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`
        });
      } else {
        res.send({
          message: "Hotel was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Hotel with id=" + id
      });
    });
}

// Delete all data
exports.deleteAll = (req,res) => {
    Hotel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Hotels were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Hotels."
      });
    });
}