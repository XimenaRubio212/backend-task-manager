// ============================================================
// controllers/userController.js
// Recibe req/res, valida datos y llama al modelo
// ============================================================

import { create, seeOne, seeByEmail, update, updateStatusUser, destroy, seeTasksByUser } from '../models/user.module.js';

// POST /api/users — Crear nuevo usuario
export function createUser(req, res) {
    try {
        let datos = req.body;

        // Validar campos obligatorios
        if (!datos.name || !datos.email) {
            return res.status(400).json({
                mensaje: "Los campos 'name' y 'email' son obligatorios"
            });
        }

        // Validar email duplicado
        let usuarioExistente = seeByEmail(datos.email);
        if (usuarioExistente) {
            return res.status(409).json({
                mensaje: "Ya existe un usuario con ese email"
            });
        }

        // Validar rol permitido
        let rolesPermitidos = ["admin", "user"];
        if (datos.role && !rolesPermitidos.includes(datos.role)) {
            return res.status(400).json({
                mensaje: `El rol debe ser: ${rolesPermitidos.join(" o ")}`
            });
        }

        let resultado = create(datos);
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

// GET /api/users — Listar todos los usuarios
export function getAllUsers(req, res) {
    try {
        let datos = seeAll();
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

// GET /api/users/:id — Obtener un usuario específico
export function getUserById(req, res) {
    try {
        let id = req.params.id;
        let datos = seeOne(id);

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

// PUT /api/users/:id — Actualizar información de usuario
export function updateUser(req, res) {
    try {
        let id = req.params.id;
        let datos = req.body;

        // Verificar que el usuario existe
        let usuarioExistente = seeOne(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

        // Si viene email, verificar que no lo use otro usuario
        if (datos.email) {
            let usuarioConEmail = seeByEmail(datos.email);
            if (usuarioConEmail && usuarioConEmail.id != id) {
                return res.status(409).json({
                    mensaje: "Ese email ya está en uso por otro usuario"
                });
            }
        }

        // Validar rol si viene
        let rolesPermitidos = ["admin", "user"];
        if (datos.role && !rolesPermitidos.includes(datos.role)) {
            return res.status(400).json({
                mensaje: `El rol debe ser: ${rolesPermitidos.join(" o ")}`
            });
        }

        let resultado = update(id, datos);
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

// DELETE /api/users/:id — Eliminar un usuario
export function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let eliminado = destroy(id);

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

// PATCH /api/users/:id/status — Activar o desactivar usuario
export function updateStatusUser(req, res) {
    try {
        let id = req.params.id;
        let { status } = req.body;

        // Validar que venga un status válido
        let statusPermitidos = ["active", "inactive"];
        if (!status || !statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensaje: `El campo 'status' es obligatorio y debe ser: ${statusPermitidos.join(" o ")}`
            });
        }

        let resultado = actualizarStatus(id, status);

        if (!resultado) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${id}`
            });
        }

        res.status(200).json({
            mensaje: `Usuario ${status === "active" ? "activado" : "desactivado"} con éxito`,
            data: resultado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}

// GET /api/users/:userId/tasks — Tareas asignadas a un usuario
export function seeTasksByUser(req, res) {
    try {
        let userId = req.params.userId;

        // Verificar que el usuario existe antes de buscar sus tareas
        let usuario = seeOne(userId);
        if (!usuario) {
            return res.status(404).json({
                mensaje: `No se encontró ningún usuario con ID ${userId}`
            });
        }

        let tareas = seeTasksByUser(userId);
        res.status(200).json({
            mensaje: `Tareas del usuario "${usuario.name}"`,
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