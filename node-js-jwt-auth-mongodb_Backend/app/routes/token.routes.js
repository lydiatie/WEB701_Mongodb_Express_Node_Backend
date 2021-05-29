module.exports = app => {
    const tokens = require("../controllers/token.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Token
    router.post("/", tokens.create);
  
    // Retrieve all Tokens
    router.get("/", tokens.findAll);
  
    // Retrieve all published Tokens
    router.get("/published", tokens.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tokens.findOne);

    // Update a Token with id
    router.put("/:id", tokens.update);
  
    // Delete a Token with id
    router.delete("/:id", tokens.delete);
  
    app.use('/api/tokens', router);
  };