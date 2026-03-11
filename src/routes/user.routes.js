import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
    res.json({
        message: "Se listarán los usuarios"
    });
});

router.post('/tasks', (req, res) => {
    res.json({
        message: "Se creará una tarea"
    });
});

export default router;