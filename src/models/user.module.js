let listaUsuarios = [
    { id: 1, name: "Ana García",       email: "ana.garcia@email.com",       role: "admin", status: "active",   createdAt: new Date("2024-01-15") },
    { id: 2, name: "Carlos López",     email: "carlos.lopez@email.com",     role: "user",  status: "active",   createdAt: new Date("2024-02-20") },
    { id: 3, name: "María Rodríguez",  email: "maria.rodriguez@email.com",  role: "user",  status: "inactive", createdAt: new Date("2024-03-10") },
];

let listaTareas = [
    { id: 1, userId: 1, title: "Revisar reportes mensuales", status: "completada"  },
    { id: 2, userId: 1, title: "Actualizar documentación",   status: "pendiente"    },
    { id: 3, userId: 2, title: "Corregir bug en login",      status: "en-progreso"},
    { id: 4, userId: 2, title: "Diseñar nueva pantalla",     status: "pendiente"    },
    { id: 5, userId: 3, title: "Testear módulo de pagos",    status: "pendiente"    },
];

let contadorId = 4;


export function create(datos) {
    let nuevoUsuario = {
        id: contadorId++,
        createdAt: new Date(),
        role: "user",
        status: "active",
        ...datos,            
    };
    listaUsuarios.push(nuevoUsuario);
    return nuevoUsuario;
}

export function seeAll() {
    return listaUsuarios;
}

export function seeOne(id) {
    return listaUsuarios.find(u => u.id == id);
}

export function seeByEmail(email) {
    return listaUsuarios.find(u => u.email === email);
}

export function update(id, newDatos) {
    let usuario = seeOne(id);
    if (usuario) {
        Object.assign(usuario, newDatos);
        return usuario;
    }
    return null;
}

export function updateStatusUser(id, status) {
    let usuario = seeOne(id);
    if (usuario) {
        usuario.status = status;
        return usuario;
    }
    return null;
}

export function destroy(id) {
    let indice = listaUsuarios.findIndex(u => u.id == id);
    if (indice !== -1) {
        listaUsuarios.splice(indice, 1);
        return true;
    }
    return false;
}

// ---- Operaciones de tareas ----

export function seeTasksByUser(userId) {
    return listaTareas.filter(t => t.userId == userId);
}