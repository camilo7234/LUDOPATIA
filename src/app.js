// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Importar las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const citaRoutes = require('./routes/citaRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/profesionales', profesionalRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/citas', citaRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
