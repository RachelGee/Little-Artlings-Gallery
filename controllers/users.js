/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/auth`
-----------------------------------------------------------------------------------
*/


/* Import packages and models
-------------------------------------------------- */
const User = require('../models/user.js');
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();


/* Routes
-------------------------------------------------- */
// Sign-up route: display a form that triggers the create route when submitted
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up')
})

// Create route: create a user in the database
router.post('/sign-up', async (req, res) => {

    // Check if username already exists in database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send('Username already taken.');
    }

    // Check if password and confirmPassword match
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm Password must match');
    }

    // Encrypt user's password to securely store it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    // Create a user in the database only if it passes the validation
    const newUser = await User.create(req.body)
    res.redirect('/auth/sign-in');

})

// Sign-in Form route: display a form that triggers the sign-in/login route
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in')
})

// Sign-in route: check the databse for an existing user
router.post('/sign-in', async (req, res) => {
    // Confirm username exists in database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        return res.send('Username not found');
    }

    // Confirm password matches found user
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    )
    if (!validPassword) {
        return res.send('Password does not match username')
    }

    // Start a session with the found user. 
    // Save user info (except passwords) in the session.
    console.log(req.session)
    req.session.user = { username: userInDatabase.username }
    console.log(req.session)

    // Redirect the user to the home page now that a session ha sbeen created
    res.redirect('/');
})

// Sign-out route
router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


/* Export these routes so that they are accessible in `server.js`
-------------------------------------------------- */
module.exports = router;