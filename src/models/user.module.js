let usuarios = [];
let contadorId = 1;

export function crear(datos) {
    let nuevoUsuario = {
        id: contadorId++,
        fechaCreacion: new Date(),
        rol: "user",
        estado: "active",
        ...datos,
    };
    usuarios.push(nuevoUsuario);
    return nuevoUsuario;
}

export function obtenerTodos() {
    return usuarios;
}

export function obtenerPorId(id) {
    return usuarios.find(u => u.id == id);
}

export function obtenerPorEmail(email) {
    return usuarios.find(u => u.email === email);
}

export function actualizar(id, nuevosDatos) {
    let usuario = obtenerPorId(id);
    if (usuario) {
        Object.assign(usuario, nuevosDatos);
        return usuario;
    }
    return null;
}

export function actualizarEstado(id, estado) {
    let usuario = obtenerPorId(id);
    if (usuario) {
        usuario.estado = estado;
        return usuario;
    }
    return null;
}

export function eliminar(id) {
    let indice = usuarios.findIndex(u => u.id == id);
    if (indice !== -1) {
        usuarios.splice(indice, 1);
        return true;
    }
    return false;
}

export function obtenerTareasPorUsuario(usuarioId) {
    return obtenerTareasDesdeModeloTareas(usuarioId);
}