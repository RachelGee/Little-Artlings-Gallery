
const mongoose = require("mongoose");

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

  const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;