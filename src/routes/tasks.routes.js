import { Router } from 'express';
// Importamos los nombres actualizados del controlador de tareas
import { 
    crearTarea, 
    obtenerTodasLasTareas, 
    obtenerTareaPorId, 
    actualizarTarea, 
    eliminarTarea, 
    cambiarEstadoTarea, 
    asignarTarea, 
    obtenerUsuariosDeTarea, 
    removerUsuarioDeTarea, 
    filtrarTareas 
} from '../controllers/tasks.controller.js';

const router = Router();

// Filtros primero para evitar que colisionen con el :id
router.get('/filter', filtrarTareas);

router.post('/', crearTarea);
router.get('/', obtenerTodasLasTareas);
router.get('/:id', obtenerTareaPorId);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);
router.patch('/:id/status', cambiarEstadoTarea);
router.post('/:taskId/assign', asignarTarea);
router.get('/:taskId/users', obtenerUsuariosDeTarea);
router.delete('/:taskId/users/:userId', removerUsuarioDeTarea);

export default router;