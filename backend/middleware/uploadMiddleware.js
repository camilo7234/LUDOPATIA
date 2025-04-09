const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento para los archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta donde se guardarán los archivos subidos
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista en la raíz de tu proyecto
  },
  filename: (req, file, cb) => {
    // Define cómo se nombrarán los archivos subidos
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Crea el middleware de subida de archivos con la configuración definida
const upload = multer({ storage: storage });

module.exports = upload;