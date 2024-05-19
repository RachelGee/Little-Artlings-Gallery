// controllers/artists.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Artist = require('../models/artist.js')

//INDEX of artist profiles
router.get('/artist-profile', async function (req, res) {
    const currentUser = await User.findById(req.session.user.userId).populate('userArtists');
    res.render('./artist/index.ejs', { foundUser: currentUser });
})
//individual Artist show
router.get('/:artistId', async function (req, res) {
    const artist = await Artist.findById(req.params.artistId)
    res.render('./artist/show.ejs', {artist})
})
//Artist new
router.get('/artist-new', async function (req, res) {
    const currentUser = await User.findById(req.session.user.userId).populate('userArtists');
    console.log('current User', currentUser)
    res.render('./artist/new.ejs', { foundUser: currentUser })
})

// Create
router.post('/', async (req, res) => {
    try {
    const currentUser = await User.findById(req.session.user.userId);
    const createdArtist = await Artist.create(req.body);
    console.log(createdArtist);
    currentUser.userArtists.push(createdArtist._id);
    
    await currentUser.save();
    const foundUser = await User.findById(req.session.user.userId).populate('userArtists');
    console.log(foundUser)
    res.render('./artist/index.ejs', { foundUser })
} catch (error) {
    console.log(error)
    res.render(`./artist/new.ejs`, {user: req.session.user});
}
});



//Delete
router.delete('/:artistId', async (req, res) => {
    try {
        await Artist.deleteOne({_id: req.params.artistId})
        res.redirect('/artist/artist-profile')
    } catch (error) {
        console.log(error)
        res.redirect('/artist/artist-profile')
    }
})


//**Edit
router.get('/:artistId/edit', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        res.render('./artist/edit', {artist})
    } catch (error) {
        console.log(error)
        res.redirect('/artist/artist-profile');
    }   
})

//Update
router.post('/:artistId/edit', async (req, res) => {
    console.log(req.body)
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true});
        res.render('./artist/show', {artist} )
    } catch (error) {
        console.log(error)
        res.redirect('/artist-profile');
    }   
})

module.exports = router;