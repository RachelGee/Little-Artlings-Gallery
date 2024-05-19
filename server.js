/* Import packages
-------------------------------------------------- */
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');


/* Create and configure Express app
-------------------------------------------------- */
// initialize the express app from the express package
const app = express();
// configure express to use EJS and look in the "views" folder
app.set('view engine', 'ejs');
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// connect to MongoDB Atlas with mongoose
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB Atlas at ${mongoose.connection.name}'`);
});


//require in Middleware
const isSignedIn = require('./middleware/is-signed-in.js');
const artwork = require('./models/artwork.js');


// import controllers
const authController = require('./controllers/users.js')
const artworksController = require('./controllers/artworks.js')



/* Middleware
-------------------------------------------------- */
app.use(morgan('dev'))
// Used to parse request bodies from PUT/PATCH/POST requests
app.use(express.urlencoded({ extended: false }))
// Allow HTML forms to send PUT/DELETE requests instead of just GET or POST
app.use(methodOverride('_method'))
// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// Use the "users" controller for all routes begininng with "/auth"
app.use('/auth', authController)
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

/* Routes
-------------------------------------------------- */
// Home Page
app.get('/', function (req, res) {
    console.log(req.session)
    res.render('index', { user: req.session.user })
})

app.use(isSignedIn);

//Gallery
app.get('/gallery', function (req, res) {
    console.log(req.session.user)
    res.render('./artwork/index', { user: req.session.user })
})

//Edit Gallery 
app.get('/edit', function (req, res) {
    console.log(req.session.user)
    res.render('./artwork/edit', { user: req.session.user })
})
//Add to  Gallery 
app.get('/add-to-gallery', function (req, res) {
    console.log(req.session.user)
    res.render('./artwork/new', { user: req.session.user })
})

//Artist profile
app.get('/artist-profile', function (req, res) {
    console.log(req.session.user)
    res.render('./artist/index.ejs', { user: req.session.user })
})

//Community Gallery
app.get('/community-gallery', function (req, res) {
    console.log(req.session.user)
    res.render('./comm-gallery/index.ejs', { user: req.session.user })
})



// // Protected route: Only accessible by authorized users
// app.get('/vip-lounge', (req, res) => {
//     if (req.session.user) {
//         res.send(`Welcome to the party ${req.session.user.username}.`);
//     } else {
//         res.send("Sorry, no guests allowed.");
//     }
// })



/* Run Express app on your computer on port 3000
-------------------------------------------------- */
app.listen(port, function () {
    console.log('Express app running on port ' + port)
})