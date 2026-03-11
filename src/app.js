import express from 'express';

import rutasUsuarios from './src/routes/users-routes.js';
import rutasTareas   from './src/routes/tasks-routes.js';

const app = express();
const puerto = 3000;


app.use(express.json());

app.use('/api/usuarios', rutasUsuarios);
app.use('/api/tareas',   rutasTareas);

app.get('/', (req, res) => {
    res.send('Servidor de ArreglosApp corriendo correctamente 🚀');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
    console.log(`Rutas de Usuarios: http://localhost:${puerto}/api/usuarios`);
    console.log(`Rutas de Tareas: http://localhost:${puerto}/api/tareas`);
});