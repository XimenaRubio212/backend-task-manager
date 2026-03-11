let listaUsuarios = [
    { id: 1, email: "admin@email.com",  password: "admin123",  role: "admin" },
    { id: 2, email: "user@email.com",   password: "user123",   role: "user"  },
];

export function buscarPorEmail(email) {
    return listaUsuarios.find(u => u.email === email);
}

export function generarToken(usuario) {
    // Token simulado — en producción se usaría JWT
    return `token-simulado-${usuario.id}-${usuario.role}-${Date.now()}`;
}