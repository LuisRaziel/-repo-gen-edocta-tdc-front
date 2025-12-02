import { AxiosResponse } from "axios";
import apiService from "./apiService";
import { Muestra } from "types/Muestra";
import { respuestaAxios } from "types/RespuesAxios";


const GdMService = {
    ObtenerUltimoPeriodo: async (token: string | undefined) => {
        try {
            let response: AxiosResponse<respuestaAxios> = await apiService.get("/muestras/ultimoperiodo", {
                headers: {
                    Authorization: "bearer " + token
                }
            });
            return response.data.datos
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    FormatearFecha: (fechaISO: string) => {
        const fecha: Date = new Date(fechaISO);

        // Opciones de formato para mes largo y año en español
        const opciones: Intl.DateTimeFormatOptions = {
            month: "long",
            year: "numeric"
        };

        // Crear formateador en español
        const formato = new Intl.DateTimeFormat("es-ES", opciones);

        // Formatear y limpiar el texto
        const resultado: string = formato.format(fecha).replace(" de ", " ");
        return resultado;

    },

    ObtenerMuestras: async (pagina: number, tamaño: number, token: string | undefined) => {
        try {
            let response: AxiosResponse<respuestaAxios> = await apiService.get(`/muestras/${pagina}/${tamaño}`, {
                headers: {
                    Authorization: "bearer " + token
                }
            });
            let values = response.data.datos;
            values.datos = values.datos.map((muestra: Muestra, index: number) => ({
                ...muestra,
                index,
                periodo: GdMService.FormatearFecha(muestra.periodo)
            }));
            return values;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    GenerarMuestra: async (json: any, token: string | undefined) => {
        try {
            let response = await apiService.post("/muestras", json, {
                headers: {
                    Authorization: "bearer " + token
                }
            });
            return response
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    ValidarMuestra: async (idValidacion: number | null, idUsuario: string | undefined, token: string) => {
        try {
            let response = await apiService.post("/muestras/validacion",
                {
                    "id": idValidacion,
                    "usuario": idUsuario
                }, {
                headers: {
                    Authorization: "bearer " + token
                }
            })
            return response;
        } catch (error) {
            console.error(error)
            throw error;
        }
    },
    EnviarCorreos: async (id: number, token: string) => {
        try {
            let response = await apiService.post("/muestras/correo", { "id": id }, {
                headers: {
                    Authorization: "bearer " + token
                }
            })
            return response
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default GdMService;