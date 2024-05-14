// models/art.js

const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
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

module.exports = artwork;