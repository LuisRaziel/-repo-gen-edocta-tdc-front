import apiService from "./apiService";

import { CredencialesLogin, Usuario } from './../types/authTypes'


const authService = {
    Login: async (login: CredencialesLogin): Promise<Usuario> => {
        try {
            let usuario: Usuario={
                nombre:"Juan",
                correo:"diego_grande@cpm.coop",
                id:"gacd25972",
                idPerfil:1,
                perfil: "Administrador",
                token:"kjskjskjsskjslsjskkj"
            }
            return await new Promise(resolve => { setTimeout(() => resolve(usuario), 1500) });
            return await apiService.post("/auth/login", { user: login.user, password: login.password });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    Logout: async () => {
        try {

            return await apiService.post("/auth/logout", {});
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    ObtenerUsuario: async () => {
        try {

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default authService;