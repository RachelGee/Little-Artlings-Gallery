const mongoose = require("mongoose");

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
  const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;