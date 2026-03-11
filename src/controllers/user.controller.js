import {
    crear,
    obtenerTodos,
    obtenerPorId,
    obtenerPorEmail,
    actualizar,
    actualizarEstado,
    eliminar,
    obtenerTareasPorUsuario
} from '../models/user.module.js';

export function crearUsuario(req, res) {
    try {
        let datos = req.body;

        if (!datos.nombre || !datos.email) {
            return res.status(400).json({
                mensaje: "Los campos 'nombre' y 'email' son obligatorios"
            });
        }

        let usuarioExistente = obtenerPorEmail(datos.email);
        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese email"
            });
        }

        let rolesPermitidos = ["admin", "user"];
        if (datos.rol && !rolesPermitidos.includes(datos.rol)) {
            return res.status(400).json({
                mensaje: `El rol debe ser: ${rolesPermitidos.join(" o ")}`
            });
        }

        let resultado = crear(datos);
        res.status(201).json({
            mensaje: "Usuario creado con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function obtenerTodosLosUsuarios(req, res) {
    try {
        let datos = obtenerTodos();
        res.status(200).json({
            mensaje: "Consulta de todos los usuarios",
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

export function obtenerUsuarioPorId(req, res) {
    try {
        let id = req.params.id;
        let datos = obtenerPorId(id);

        if (!datos) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

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

export function actualizarUsuario(req, res) {
    try {
        let id = req.params.id;
        let datos = req.body;

        let usuarioExistente = obtenerPorId(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

        if (datos.email) {
            let usuarioConEmail = obtenerPorEmail(datos.email);
            if (usuarioConEmail && usuarioConEmail.id != id) {
                return res.status(409).json({
                    mensaje: "Ese email ya está en uso por otro usuario"
                });
            }
        }

        let rolesPermitidos = ["admin", "user"];
        if (datos.rol && !rolesPermitidos.includes(datos.rol)) {
            return res.status(400).json({
                mensaje: `El rol debe ser: ${rolesPermitidos.join(" o ")}`
            });
        }

        let resultado = actualizar(id, datos);
        res.status(200).json({
            mensaje: "Usuario actualizado con éxito",
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function eliminarUsuario(req, res) {
    try {
        let id = req.params.id;
        let eliminado = eliminar(id);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

        res.status(200).json({
            mensaje: "Usuario eliminado con éxito"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function actualizarEstadoUsuario(req, res) {
    try {
        let id = req.params.id;
        let { estado } = req.body;

        let estadosPermitidos = ["active", "inactive"];
        if (!estado || !estadosPermitidos.includes(estado)) {
            return res.status(400).json({
                mensaje: `El campo 'estado' es obligatorio y debe ser: ${estadosPermitidos.join(" o ")}`
            });
        }

        let resultado = actualizarEstado(id, estado);

        if (!resultado) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

        res.status(200).json({
            mensaje: `Usuario ${estado === "active" ? "activado" : "desactivado"} con éxito`,
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

export function verTareasPorUsuario(req, res) {
    try {
        let usuarioId = req.params.userId;

        let usuario = obtenerPorId(usuarioId);
        if (!usuario) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${usuarioId}`
            });
        }

        let tareas = obtenerTareasPorUsuario(usuarioId);
        res.status(200).json({
            mensaje: `Tareas del usuario "${usuario.nombre || usuario.name}"`,
            total: tareas.length,
            data: tareas
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}