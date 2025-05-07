const { Router } = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const router = Router();

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rutas
router.get('/', (req, res) => {
  res.render('home.ejs');
});

router.get('/download-cv', (req, res) => {
  const file = path.join(__dirname, '..', 'public', 'pdf', 'cv.pdf');
  res.download(file, 'CV.pdf');
});

// Ruta para recibir el formulario con archivo
router.post('/enviar', async (req, res) => {
  const { nombre, mensaje } = req.body;
  console.log('Datos recibidos:', req.body); // Esto ahora sí funcionará

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Nuevo mensaje de contacto: ${nombre}`,
    text: mensaje
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
  }
});


module.exports = router;