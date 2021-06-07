module.exports = app => {
    const hotels = require("../../controllers/hotel.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", hotels.create);
  
    // Retrieve all hotels
    router.get("/", hotels.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", hotels.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", hotels.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", hotels.delete);
  
    // Create a new Tutorial
    router.delete("/", hotels.deleteAll);
  
    app.use('/api/hotels', router);
  };