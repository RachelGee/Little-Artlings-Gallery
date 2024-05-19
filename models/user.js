
/* Import packages
-------------------------------------------------- */
const mongoose = require("mongoose");


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
    userArtists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }
    ],
    userGallery: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork'
        }
    ]
});


/* Use the userSchema to build a model that will add all documents to a "user" collection */
module.exports = mongoose.model("User", userSchema);
