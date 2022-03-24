const path = require("path");
const express = require("express");
const app = express();
const db = require('../scripts/create-db')
const createBuger = require('./routes/create');
const update = require('./routes/update');

const burgerService = require("./services/burgers.service");
const boissonService = require("./services/boissons.service");
const menuService = require("./services/menus.service");

app.use(express.urlencoded({extended:false}));
app.use(express.static('css'));
app.use(express.static(path.join(__dirname, 'public')));

//PUG
app.engine('pug', require('pug').__express);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

//ROUTES
app.get('/', (req, res) => {  
    const burgers = burgerService.findAll();
    const menus = menuService.findAll();
    const boissons = boissonService.findAll();
    //console.log(burgers);
    res.render("index", { title: 'Welcome to Buger Express !!', burgers: burgers, menus: menus, boissons:boissons});
});

//Route pour créer un nouveau burger et un nouvelle boisson
app.use('/create', createBuger)
app.use('/update', update)


module.exports = app;

