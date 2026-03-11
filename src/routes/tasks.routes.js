import express from 'express';
import routesUsers from '../routes/user.routes.js';

const app = express();
const puerto = 3000;

app.use(express.json());
app.use('/api/users', routesUsers);

app.listen(puerto, () => {
    console.log(`Example app listening on port ${puerto}`);
});
