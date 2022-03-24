const express = require('express');
const db = require('../../scripts/create-db');
const router = express.Router();
const multer = require("../middlewar/multer");

router.get('/', (req, res, next) => {
    const sqlBoisson = "SELECT * FROM boisson";
    let boissons = null;
    let burgers = null;
    let menus = null;
    db.all(sqlBoisson, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        boissons = rows;
    });
    const sqlBurger = "SELECT * FROM burger";
    db.all(sqlBurger, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        burgers = rows;
    });
    const sqlMenu = "SELECT * FROM menu";
    db.all(sqlMenu, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        menus = rows;  
        console.log(burgers)

        res.render("update", { burgers: burgers, boissons: boissons, menus: menus} )
    });
    
});

router.get('/burger/:id', (req, res, next) => {

    const id = req.params['id'];
    const sql ="SELECT * FROM burger WHERE id = ?";
    db.all(sql, id, (err, rows) => {
        if(err){
            return console.error(err.message)
        }
        res.render("product", {elements: rows, id:id, type: "burger"});
    })
});

router.get('/boisson/:id', (req, res, next) => {

    const id = req.params['id'];
    const sql ="SELECT * FROM boisson WHERE id = ?";
    db.all(sql, id, (err, rows) => {
        if(err){
            return console.error(err.message)
        }
        res.render("product", {elements: rows, id:id, type: "boisson"});
    })
});

router.get('/menu/:id', (req, res, next) => {
    const sqlBoisson = "SELECT * FROM boisson";
    let boissons = null;
    let burgers = null;
    db.all(sqlBoisson, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        boissons = rows;
    });
    const sqlBurger = "SELECT * FROM burger";
    db.all(sqlBurger, [], (err, rows) => {
        if(err) {
            return console.error(err.message)
        }
        burgers = rows;
    });
    const id = req.params['id'];
    const sql ="SELECT * FROM menu WHERE id = ?";
    db.all(sql, id, (err, rows) => {
        if(err){
            return console.error(err.message)
        }
        console.log(rows)
        res.render("product", {elements: rows, id:id, type: "menu", burgers: burgers, boissons: boissons});
    })
});

router.post('/update-burger', multer, (req, res, next) => {
    //const id = req.params.id;
    const sql = "UPDATE burger set nom = ?, prix = ?, description = ?, photoURL = ? WHERE id = ?";
    const photo = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    const burger = [
        req.body.nom,
        req.body.prix,
        req.body.description,
        photo,
        req.body.id
    ];
    console.log(burger)
    db.run(sql, burger, err => {
        if (err){
            console.log(err);
        }
        res.redirect("/update");
    } )
});

router.post('/update-boisson', multer, (req, res, next) => {
    //const id = req.params.id;
    const sql = "UPDATE boisson set nom = ?, prix = ?, description = ?, photoURL = ? WHERE id = ?";
    const photo = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    const boisson = [
        req.body.nom,
        req.body.prix,
        req.body.description,
        photo,
        req.body.id
    ];
    db.run(sql, boisson, err => {
        if (err){
            console.log(err);
        }
        res.redirect("/update");
    } )
});

router.post('/update-menu', multer, (req, res, next) => {
    //const id = req.params.id;
    const sql = "UPDATE menu set nom = ?, accompagnement = ?, description = ?, prix = ?, photoURL = ?, burgerId = ?, boissonId = ? WHERE id = ?";
    const photo = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null);
    const menu = [
        req.body.nom,
        req.body.accompagnement,
        req.body.description,
        req.body.prix,
        photo,
        req.body.burger,
        req.body.boisson,
        req.body.id
    ];
    console.log(menu)
    db.run(sql, menu, err => {
        if (err){
            console.log(err);
        }
        res.redirect("/update");
    } )
});

module.exports = router;