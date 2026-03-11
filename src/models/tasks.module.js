let tareas = [];
let contadorId = 1;

export function crear(datos) {
    let nuevaTarea = {
        id: contadorId++,
        titulo: datos.title,
        descripcion: datos.description || "",
        estado: "pending",
        prioridad: datos.priority || "medio",
        assignedUsers: datos.assignedUsers || [],
        fechaCreacion: new Date(),
        fechaVencimiento: datos.dueDate ? new Date(datos.dueDate) : null,
        usuarioId: datos.userId || null,
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

export function obtenerTodos() {
    return tareas;
}

export function obtenerPorId(id) {
    return tareas.find(t => t.id == id);
}

export function actualizar(id, nuevosDatos) {
    let tarea = obtenerPorId(id);
    if (tarea) {
        let { estado, assignedUsers, fechaCreacion, ...datosSeguros } = nuevosDatos;
        Object.assign(tarea, datosSeguros);
        if (nuevosDatos.dueDate) tarea.fechaVencimiento = new Date(nuevosDatos.dueDate);
        return tarea;
    }
    return null;
}

export function actualizarEstado(id, estado) {
    let tarea = obtenerPorId(id);
    if (tarea) {
        tarea.estado = estado;
        return tarea;
    }
    return null;
}

export function eliminar(id) {
    let indice = tareas.findIndex(t => t.id == id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        return true;
    }
    return false;
}

export function asignarUsuarios(tareaId, usuarioIds) {
    let tarea = obtenerPorId(tareaId);
    if (!tarea) return null;

    usuarioIds.forEach(uid => {
        if (!tarea.assignedUsers.includes(uid)) {
            tarea.assignedUsers.push(uid);
        }
    });
    return tarea;
}

export function obtenerUsuariosAsignados(tareaId) {
    let tarea = obtenerPorId(tareaId);
    if (!tarea) return null;
    return tarea.assignedUsers;
}

export function removerUsuario(tareaId, usuarioId) {
    let tarea = obtenerPorId(tareaId);
    if (!tarea) return null;

    let indice = tarea.assignedUsers.findIndex(uid => uid == usuarioId);
    if (indice === -1) return false;

    tarea.assignedUsers.splice(indice, 1);
    return true;
}

export function filtrarTareasModel({ estado, prioridad, usuarioId, fechaInicio, fechaFin }) {
    let resultado = [...tareas];

    if (estado)      resultado = resultado.filter(t => t.estado === estado);
    if (prioridad)   resultado = resultado.filter(t => t.prioridad === prioridad);
    if (usuarioId)   resultado = resultado.filter(t => t.assignedUsers.includes(Number(usuarioId)));
    if (fechaInicio) resultado = resultado.filter(t => t.fechaCreacion >= new Date(fechaInicio));
    if (fechaFin)    resultado = resultado.filter(t => t.fechaCreacion <= new Date(fechaFin));

    return resultado;
}

export function obtenerTareasPorUsuario(usuarioId) {
    return tareas.filter(t => t.usuarioId == usuarioId);
}