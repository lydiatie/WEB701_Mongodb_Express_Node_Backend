module.exports = mongoose => {
    const Token = mongoose.model(
      "token",
      mongoose.Schema(
        {
          quantity: Number,
          address: String,
          published: Boolean
        }
      )
    );
  
    return Token;
  };