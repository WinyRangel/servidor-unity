const express = require('express');
const { recaptcha } = require('express-recaptcha');

const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD
conectarDB();
app.use(cors())

app.use(express.json());
app.use('/api/recursos', require('./routes/recurso'));
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/empleado', require('./routes/empleado'));
app.use('/api/departamento', require('./routes/departamento'))
app.use('/api/gama', require('./routes/gama'))
app.use('/api/proveedor', require('./routes/proveedor'))
app.use('/api/producto', require('./routes/producto'));
app.use('/api/solicitud/', require('./routes/solicitud'))
app.use('/api/marca', require('./routes/marca'))
app.use('/api/users', require('./routes/auth'));
app.use('/api/contacto', require ('./routes/contacto'));



app.use('/', require('./routes/empleado'));



//app.use('/api/privilegio', require('./routes/privilegio'));
//app.use('/api/nombreRol', require('./routes/nombreRol'));

//app.get('/', (req, res) => {
   // res.send('Hola Mundo')
//})




app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente!')
})