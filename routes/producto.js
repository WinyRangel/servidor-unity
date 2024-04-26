const express = require('express');
const router = express.Router();
const multer = require('multer');
const productosController = require('../controllers/productosController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('imageUrl'), productosController.crearProducto);

module.exports = router;
