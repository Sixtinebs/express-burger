const multer = require('multer');
const path = require("path");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        callback(null, path.join( __dirname,'../images'));
    },
    filename: (req, file, callback) => {
        console.log(file)
        const regex = /\.jpg|\.jpeg|\.png/;
        const extension = MIME_TYPES[file.mimetype];
        const name = file.originalname.split(' ').join('_').replace(regex, "_");
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('photo');