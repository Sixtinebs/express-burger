const express = require('express');
const db = require('../../scripts/create-db');
const router = express.Router();
const multer = require("../middlewar/multer");

router.get('/', (req, res, next) => {
    const sql = "SELECT * FROM boisson";
    let boissons = null;
    let burgers = null;
    db.all(sql, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        boissons = rows;
        //res.render("create", { boissons: rows})
    });
    const sql2 = "SELECT * FROM burger";
    db.all(sql2, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        burgers = rows;
        //res.render("create", { burgers: rows})
        res.render("create", { burgers: burgers, boissons: boissons} )
    });
});

router.post('/new-burger', (req, res, next) => {
    const sql =  'INSERT INTO burger (nom, prix, description) VALUES ( ?, ?, ?)';
    const burger = [
        req.body.nom,
        req.body.prix,
        req.body.description
    ];
    db.run(sql, burger, err => {
        if(err){
            console.log(err);
        }
        res.render("index");
    })
});

router.post('/new-boisson', multer,(req, res, next) => {
    const sql =  'INSERT INTO boisson (nom, prix, description, photoURL) VALUES ( ?, ?, ?, ?)';
    const image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    const boisson = [
        req.body.nom,
        req.body.prix,
        req.body.description,
        image
    ];
    db.run(sql, boisson, err => {
        if(err){
            console.log(err);
        }
        res.render("index");
    })
});

router.post('/new-menu', multer, (req, res, next) => {
    const sql = "INSERT INTO menu (nom, accompagnement, description, prix, photoURL, burgerId, boissonId) VALUES (?,?,?,?,?,?,?)";
    const image = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    const menu = [
        req.body.nom,
        req.body.accompagnement,
        req.body.description,
        req.body.prix,
        image,
        req.body.burger,
        req.body.boisson
    ];
    db.run(sql, menu, err => {
        if(err){
            console.log(err);
        }
        res.render("index");
    })
})

module.exports = router;