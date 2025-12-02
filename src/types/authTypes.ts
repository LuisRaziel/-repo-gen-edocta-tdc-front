export interface Usuario {
    id: string,
    nombre: string,
    correo: string,
    token: string,
    perfil: string,
    idPerfil: number,
    area: string
    idUsuario: string
}

export interface CredencialesLogin {
    user: string,
    password: string
}
