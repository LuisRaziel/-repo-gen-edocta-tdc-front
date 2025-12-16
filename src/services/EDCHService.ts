import { AxiosResponse } from "axios";
import apiService from "./apiService";
import { respuestaAxios } from "types/RespuesAxios";
import { EDCH } from "types/EDCH";
import Swal from "sweetalert2";

const EDCHService = {
    Consultar: async (cif: string, token: string | undefined) => {
        try {
            cif = cif;
            let response: AxiosResponse<respuestaAxios> = await apiService.get(`/EDCHistorico/consultar/${cif}`,
                {
                    headers: {
                        Authorization: "bearer " + token
                    }
                });
            let values = response.data.datos;
            return values;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    DescargarEDC: async (edc: EDCH, token: string) => {
        let response: AxiosResponse<any, any> | null = null;
        try {
            response = await apiService.post(`/EDCHistorico/descargar`,
                {
                    cif: edc.cif,
                    ids: edc.id,
                    año_periodo: edc.año_Periodo,
                    ubicacion: edc.ubicacion
                },
                {
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/pdf',
                        Authorization: "bearer " + token
                    },
                });

            // Crear una URL temporal para el blob
            const url = window.URL.createObjectURL(new Blob([response?.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${edc.cif}_EDC_${edc.año_Periodo}.pdf`); // nombre del archivo
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al descargar EDC:" + error, response?.status);
            Swal.fire({title:"", text:"Ocurrio un error al descargar el archivo, intente mas tarde", icon:"error", confirmButtonColor:"#36784a"})
        }
    }
}

export default EDCHService;