// controllers/artworks.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Artwork = require('../models/artwork.js');


//INDEX of artwork aka Gallery
router.get('/', async function (req, res) {
    try {
        const currentUser = await User.findById(req.session.user.userId).populate('userGallery');
        console.log(currentUser);
        res.render('./artwork/index.ejs', {user: currentUser});
    } catch (error) {
        console.log(error);
        res.render('./artwork/index.ejs');
    }
})

// // New artwork
// router.get('/new', (req, res) => {
//     console.log(req.session._id);
//     res.render('artworks/new');
// })

// // Create
// router.post('/', async (req, res) => {
//     try {
//     const currentUser = await User.findById(req.session.user._id)
//     currentUser.gallery.push(req.body);
//     await currentUser.save();
//     res.redirect(`/user/${req.session.user_id}/artworks`)
// } catch (error) {
//     console.log(error)
//     res.redirect(`/user/${req.session.user_id}/artworks/new`)
// }
// })

// //Delete
// router.delete('/:itemId', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//         currentUser.gallery.id(req.params.itemId).deleteOne()
//         await currentUser.save();
//         res.redirect(`/user/${req.session.user_id}/artworks`)
//     } catch (error) {
//         console.log(error)
//         res.redirect(`/user/${req.session.user._id}/artworks/`)
//     }
// })

// //Edit
// router.get('/:itemId', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//         const galleryItem = currentUser.gallery.id(req.params.itemId)
//         res.render('./artworks/edit', {artwork: galleryItem})
//     } catch (error) {
//         console.log(error)
//         res.redirect(`/user/${req.session.user._id}/artworks/`)
//     } 
// })

// //Update
// router.post('/:itemId', async (req, res) => {
//     try {
//         const currentUser = await User.findById(req.session.user._id);
//         const galleryItem = currentUser.gallery.id(req.params.itemId);
//         galleryItem.set(req.body);
//         await currentUser.save();
//         res.redirect(`/user/${req.session.user._id}/artworks/`)
//     } catch (error) {
//         console.log(error)
//         res.redirect(`/user/${req.session.user._id}/artworks/${req.params.id}/edit`)
//     }   
// })

module.exports = router;


