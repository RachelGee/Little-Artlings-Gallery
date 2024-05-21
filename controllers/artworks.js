// controllers/artworks.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Artwork = require('../models/artwork.js');


//INDEX of artwork aka Gallery
router.get('/', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user.userId).populate('userGallery');
        res.render('./artwork/index.ejs', {user: currentUser});
    } catch (error) {
        res.render('./artwork/index.ejs');
    }
});

// New artwork
router.get('/new', (req, res) => {
    console.log(req.session._id);
    res.render('artwork/new');
})

// Create
router.post('/new', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user.userId);
    const createdArtwork = await Artwork.create(req.body);

    currentUser.userGallery.push(createdArtwork._id);
    await currentUser.save();
    const foundUser = await User.findById(req.session.user.userId).populate('userGallery');

    res.render('./artwork/index.ejs', {user: foundUser})
    } catch (error) {
    console.log(error)
    res.render(`./artwork/new.ejs`, {user: req.session.user});
}
});

//Delete
router.delete('/:artworkId', async (req, res) => {
    try {
        await Artwork.deleteOne({_id: req.params.artworkId})
        res.redirect('/artwork')
    } catch (error) {
        console.log(error)
        res.redirect('/artwork')
    }
})

// //Edit
router.post('/:artworkId/edit', async (req, res) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(req.params.artworkId, req.body, {new: true});
        res.render('./artwork/show', {artwork} )
    } catch (error) {
        console.log(error)
        res.redirect(`/user/${req.session.user.userId}/artworks/`)
    } 
})

router.get('/:artworkId/edit', async function (req, res) {
    try {
    const artwork = await Artwork.findById(req.params.artworkId)
    res.render('./artwork/edit.ejs', {artwork, user: req.session.user})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// //SHOW
//individual Artist show
router.get('/:artworkId', async function (req, res) {
    try {
    const artwork = await Artwork.findById(req.params.artworkId)
    res.render('./artwork/show.ejs', {artwork})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


module.exports = router;


