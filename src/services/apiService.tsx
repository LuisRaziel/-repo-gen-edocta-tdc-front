import axios from "axios";
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

//export const API_URL = "http://localhost:1311/api/";
export const API_URL = import.meta.env.VITE_API_URL;

/*
{
  "atributoObjeto": "Samuel Casas Mazon",
  "correo": "samuel_casas@cpm.coop",
  "departamento": "Subdirección De Desarrrollo De Soluciones",
  "encontrado": true,
  "idCentroCostos": 8342,
  "idEmpleado": "20137",
  "idPerfil": 1,
  "idPlaza": 83,
  "idUsuario": "cams20137",
  "mensaje": "OK",
  "nombreUsuario": "Samuel Casas Mazon",
  "titulo": "Gerente De Proyectos TI"

 */

const apiService = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json"
    }
})
const SESSION_NAME = "USER_GEC"

apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response?.status === 401) {
                // TODO: cerrar sesion y redireccionar

                // Limpia la sesión
                //console.log(error.response)
                localStorage.removeItem(SESSION_NAME);
                location.reload()
            }
            return Promise.reject(error.response)
        } else
            return Promise.reject(error);
    })

export default apiService;