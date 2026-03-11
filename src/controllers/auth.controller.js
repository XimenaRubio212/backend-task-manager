import { buscarPorEmail, generarToken } from '../models/authModel.js';

export function login(req, res) {
    try {
        let { email, password } = req.body;
        let usuario = buscarPorEmail(email);

        if (!usuario || usuario.password !== password) {
            return res.status(404).json({
                mensaje: "Credenciales incorrectas"
            });
        }

        let token = generarToken(usuario);
        res.status(201).json({
            mensaje: "Inicio de sesión exitoso",
            data: {
                token,
                usuario: {
                    id:    usuario.id,
                    email: usuario.email,
                    role:  usuario.role,
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
}