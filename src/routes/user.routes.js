import { Router } from "express";
// Importamos los nombres actualizados del controlador de usuarios
import { 
    crearUsuario, 
    obtenerTodosLosUsuarios, 
    obtenerUsuarioPorId, 
    actualizarUsuario, 
    eliminarUsuario, 
    actualizarEstadoUsuario, 
    verTareasPorUsuario 
} from "../controllers/user.controller.js";

const router = Router();

router.post('/', crearUsuario);
router.get('/', obtenerTodosLosUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.patch('/:id/status', actualizarEstadoUsuario);
router.get('/:userId/tasks', verTareasPorUsuario);

export default router;