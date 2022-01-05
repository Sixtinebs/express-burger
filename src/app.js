const path = require("path");
const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));

// Si ça ne marche pas avec pug 
//app.engine('pug', require('pug').__express);

app.set('views', path.resolve(__dirname, 'views'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {  res.send('Hello, world!');});

module.exports = app;

