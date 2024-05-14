
/* Import packages
-------------------------------------------------- */
const mongoose = require("mongoose");

// artwork schema 
const artworkSchema = new mongoose.Schema({ 
    artworkImage: {
      type: String,
      required: true,
    },
    artworkTitle: {
        type: String,
        required: true,
      },
      artistName: {
        type: String,
        required: true,
      },
      medium: {
        type: Number,
        required: true,
      },
      owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    });
  
    const artwork = mongoose.model('artwork', artworkSchema);


/* Build the custom "user" schema from the mongoose "Schema" class
-------------------------------------------------- */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


/* Use the userSchema to build a model that will add all documents to a "user" collection */
module.exports = mongoose.model("User", userSchema);
// module.exports = artwork;