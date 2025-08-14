export interface Usuario {
    id: string,
    nombre: string,
    correo: string,
    token: string,
    perfil: string,
    idPerfil: number,
}

export interface CredencialesLogin {
    user: string,
    password: string
}
