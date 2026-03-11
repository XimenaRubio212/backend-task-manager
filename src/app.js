import express from 'express';
import rutasUsuarios from './routes/user.routes.js';
import rutasTareas   from './routes/tasks.routes.js';
import rutasAuth     from './routes/auth.routes.js';

const app = express();
const puerto = 3000;

app.use(express.json());

// Rutas de los módulos
app.use('/api/auth',  rutasAuth);
app.use('/api/users', rutasUsuarios);
app.use('/api/tasks', rutasTareas);


app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});