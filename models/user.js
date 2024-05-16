
/* Import packages
-------------------------------------------------- */
const mongoose = require("mongoose");
// const Artist = require('./artist-profile');
// const Artwork = require('./artwork');


const artistSchema = new mongoose.Schema({ 
    artistName: {
      type: String,
      required: true,
    },
    artistAge: {
      type: Number,
      required: true,
    },
    artistBio: {
      type: String,
    },
  });

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
        type: String,
        required: true,
      },
      owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    });

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
    gallery: {
      type: [artworkSchema],
    },
    profile: {
    type: [artistSchema],
},
});


/* Use the userSchema to build a model that will add all documents to a "user" collection */
const User = mongoose.model('User', userSchema);
module.exports = User
