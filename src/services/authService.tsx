import apiService from "./apiService";

import { CredencialesLogin, Usuario } from './../types/authTypes'
import { AxiosResponse } from "axios";
import { respuestaAxios } from "types/RespuesAxios";


const authService = {
    Login: async (login: CredencialesLogin): Promise<Usuario> => {
        try {
            let response: AxiosResponse<respuestaAxios> = await apiService.post("/autenticacion/login", { user: login.user, password: login.password });
            return response.data.datos;
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
}

export default authService;