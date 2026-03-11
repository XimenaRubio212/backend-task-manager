import { 
    crear, 
    obtenerTodos, 
    obtenerPorId, 
    actualizar, 
    actualizarEstado, 
    eliminar, 
    asignarUsuarios, 
    obtenerUsuariosAsignados, 
    removerUsuario, 
    filtrarTareasModel 
} from '../models/tasks.module.js';

export function crearTarea(req, res) {
    try {
        let datos = req.body;
        let resultado = crear(datos);
        res.status(201).json({
            mensaje: "Tarea creada con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function obtenerTodasLasTareas(req, res) {
    try {
        let datos = obtenerTodos();
        res.status(200).json({
            mensaje: "Consulta de todas las tareas",
            total: datos.length,
            data: datos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function obtenerTareaPorId(req, res) {
    try {
        let id = req.params.id;
        let datos = obtenerPorId(id);
        res.status(200).json({
            mensaje: "Consulta por ID, ¡Exitosa!",
            data: datos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function actualizarTarea(req, res) {
    try {
        let id = req.params.id;
        let datos = req.body;
        let resultado = actualizar(id, datos);
        res.status(200).json({
            mensaje: "Tarea actualizada con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function eliminarTarea(req, res) {
    try {
        let id = req.params.id;
        eliminar(id);
        res.status(200).json({
            mensaje: "Tarea eliminada con éxito"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function cambiarEstadoTarea(req, res) {
    try {
        let id = req.params.id;
        let { estado } = req.body;
        let resultado = actualizarEstado(id, estado);
        res.status(200).json({
            mensaje: "Estado actualizado con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function asignarTarea(req, res) {
    try {
        let tareaId = req.params.taskId;
        let { usuarioIds } = req.body;
        let resultado = asignarUsuarios(tareaId, usuarioIds);
        res.status(200).json({
            mensaje: "Usuarios asignados con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function obtenerUsuariosDeTarea(req, res) {
    try {
        let tareaId = req.params.taskId;
        let usuarios = obtenerUsuariosAsignados(tareaId);
        res.status(200).json({
            mensaje: `Usuarios asignados a la tarea ${tareaId}`,
            total: usuarios.length,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function removerUsuarioDeTarea(req, res) {
    try {
        let { taskId, userId } = req.params;
        removerUsuario(taskId, userId);
        res.status(200).json({
            mensaje: `Usuario ${userId} removido de la tarea ${taskId} con éxito`
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function filtrarTareas(req, res) {
    try {
        let { estado, prioridad, usuarioId, fechaInicio, fechaFin } = req.query;
        let datos = filtrarTareasModel({ status: estado, priority: prioridad, userId: usuarioId, startDate: fechaInicio, endDate: fechaFin });
        res.status(200).json({
            mensaje: "Filtro aplicado con éxito",
            total: datos.length,
            data: datos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}