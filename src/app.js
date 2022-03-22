const path = require("path");
const express = require("express");
const app = express();
const db = require('../scripts/create-db')
const createBuger = require('./routes/create');

app.use(express.urlencoded({extended:false}));
app.use(express.static('css'));
app.use(express.static(path.join(__dirname, 'public')));

//PUG
app.engine('pug', require('pug').__express);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

//ROUTES
app.get('/', (req, res) => {  
    res.render("index", { title: 'Welcome to Buger Express !!'});
});

//Route pour créer un nouveau burger et un nouvelle boisson
app.use('/create', createBuger)


module.exports = app;

