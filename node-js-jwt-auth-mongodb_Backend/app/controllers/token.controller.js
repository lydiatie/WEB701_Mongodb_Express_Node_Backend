const db = require("../models");
const Token = db.tokens;

// Create and Save a new Token
exports.create = (req, res) => {
  if (!req.body.quantity) {
      res.status(400).send({ message: "Content can not be empty!"});
      return;
  }

const token = new Token({
    quantity: req.body.quantity,
    address: req.body.address,
    published: req.body.published ? req.body.published : false
});

token
    .save(token)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ 
            message: 
                err.message || "Some error occurred while creating the Token."
        });
    });
};

// Retrieve all Tokens from the database.
exports.findAll = (req, res) => {
  const address = req.query.address;
  var condition = address ? { address: { $regex: new RegExp(address), $options: "i" }} :

Token.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ 
            message: 
                err.message || "Some error occurred while retrieving tokens."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Token.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Token with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Token with id=" + id });
      });
  };

// Update a Token by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
};

const id = req.params.id;

Token.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Token with id=${id}. Maybe Token was not found!`
            });
        } else res.send({ message: "Token was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Token with id=" + id
        });
    });

};

// Delete a Token with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Token.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Token with id=${id}. Maybe Token was not found!`
            });

        } else {
            res.send({
              message: "Token was deleted successfully!"
            });
          }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Token with id=" + id
        });
    });
};

// Find all published Tokens
exports.findAllPublished = (req, res) => {
    Token.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tokens."
      });
    });
};
