import { useEffect, useState, Fragment } from "react";
import { Container, Row, Badge, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import Pagination from 'react-bootstrap/Pagination';

import { useMounted } from "hooks/useMounted";
import { useSession } from "hooks/useSession";
import GdMCard from "cpm_components/organisms/GdMCard";
import GdMTable from "cpm_components/molecules/GdMTable";
import GdMService from "services/GdMService";
import { API_URL } from "services/apiService";
import axios, { AxiosResponse } from "axios";
import ValidacionModal from "cpm_components/organisms/ValidacionModal";
import { Muestra } from "types/Muestra";
import { respuestaAxios } from "types/RespuesAxios";


export interface FuncionesProps {
    puedeEnviarCorreos: (e: Muestra) => boolean,
    puedeValidar: (e: string, estatus_edocta: boolean) => boolean
}

const STR_ADMIN = "Administrador"
const STR_EDOCTA = "Estado de Cuenta"

const GeneracionDeMuestra = () => {
    // hooks
    const hasMounted = useMounted();
    const { loadingSesion, usuarioSesion, esAutenticado, } = useSession()

    // states
    const [error, setError] = useState<string | null>(null);
    const [ultimoPeriodo, setUltimoPeriodo] = useState("");
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [cifs, setCifs] = useState<string[]>([])
    const [muestras, setMuestras] = useState<Muestra[]>([]);
    const [mostrarModal, setMostrarModal] = useState<boolean>(false);
    const [tokenState, setTokenState] = useState<string>("")
    const [muestra, setMuestra] = useState<Muestra | null>(null)
    const [idValidacion, setIdValidacion] = useState<number | null>(null)
    const [mesActual, setMesActual] = useState<string>("")
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [paginas, setPaginas] = useState<number>(0)
    const [textoBtnDescargar, setTextoBtnDescargar]=  useState<string>("Descargar");
    let token = "";

    // useEffect
    useEffect(() => {
        if (loadingSesion || !esAutenticado || !usuarioSesion?.token) return;

        token = usuarioSesion.token;
        setTokenState(token);
        obtenerUltimoPeriodo(token);
        obtenerMuestras(token, 1);
        let f = new Date()
        setMesActual(GdMService.FormatearFecha(f.toString()))
    }, [loadingSesion, esAutenticado, usuarioSesion]);

    useEffect(() => {
        if (!tokenState) return;

        obtenerUltimoPeriodo(tokenState);
        obtenerMuestras(tokenState, 1);
    }, [tokenState]);


    useEffect(() => {
        if (!tokenState) return;
        obtenerMuestras(tokenState, paginaActual)
    }, [paginaActual])

    const handleClose = () => setMostrarModal(false);

    const obtenerUltimoPeriodo = async (token: string) => {
        setUltimoPeriodo("Espere...");
        GdMService.ObtenerUltimoPeriodo(token).then(response => {
            setUltimoPeriodo(GdMService.FormatearFecha(response))
        })
    }

    const obtenerMuestras = async (token: string, pagina: number) => {
        console.log(pagina)
        GdMService.ObtenerMuestras(pagina, 10, token).then(response => {
            console.log(response)
            setMuestras(response.datos)
            setPaginaActual(response.paginaActual)
            setPaginas(response.paginas)
        })
    }


    const setPagination = () => {
        let items = [];
        for (let number = 1; number <= paginas; number++) {
            items.push(
                <Pagination.Item key={number} active={number === paginaActual} onClick={() => setPaginaActual(number)}>
                    {number}
                </Pagination.Item>,
            );
        }


        return <Pagination className="justify-content-center">
            {items}
        </Pagination>
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Desea cargar el layout?",
            text: `Se han detectado ${cifs.length} socios para las muestras periodo ${mesActual} de tarjeta de crédito. ¿Estás de acuerdo con la descarga?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#36784a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cargar"
        }).then((result) => {
            if (result.isConfirmed) {

                GdMService.GenerarMuestra({
                    "tipoCuenta": tipoSeleccionado,
                    "periodo": new Date().toISOString(),
                    "cifs": cifs
                }, tokenState)
                    .then((response: AxiosResponse<respuestaAxios>) => {
                        if (response.status == 200 && response.data.mensaje == "") {
                            Swal.fire({
                                title: "Creada!",
                                text: "Generacion de muestra exitosa!",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "",
                                text: "Ocurrio un error! Contacte al administrador",
                                icon: "error"
                            });
                        }
                        setTipoSeleccionado("")
                        setCifs([]); // Esto activa la lógica de limpieza
                    }).catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error"
                        });
                    }).finally(() => {
                        obtenerMuestras(tokenState, 1);
                        obtenerUltimoPeriodo(tokenState);
                    })
            }
        });
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setError("")
        const file = event.target.files?.[0];
        if (!file) return;

        if (!ExcelValido(file)) {
            Swal.fire("Archivo inválido", "El archivo no es un Excel válido", "warning");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const result = e.target?.result;
                if (!result) throw new Error("No se pudo leer el archivo");

                const data = new Uint8Array(result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json<{ Cif?: string }>(worksheet);

                const keys = jsonData
                    .map((row) => row.Cif)
                    .filter((key): key is string => Boolean(key));
                setCifs(keys);
            } catch (error) {
                setError("Error al leer el Excel:")
                console.error("Error al leer el Excel:", error);
                Swal.fire("Error", "Ocurrió un error al leer el Excel", "error");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value;
        setTipoSeleccionado(value);
    };

    const puedeEnviarCorreos = (item: Muestra) => {
        if (item == null || item == undefined)
            return false;
        const requisitos = [
            item.validadoMercadotecnia,
            item.validadoEstadoDeCuenta,
            item.validadoTDC,
            item.validadoEstadoDeCuenta
        ];
        return requisitos.every(Boolean);

    }

    function puedeValidar(item: string, validado_edoctas: boolean): boolean {
        if (!usuarioSesion?.area) return false;
        if (usuarioSesion.area != STR_ADMIN && usuarioSesion.area != STR_EDOCTA && !validado_edoctas) {
            return false
        }

        return usuarioSesion.area === item || usuarioSesion.area === STR_ADMIN;
    }


    const ExcelValido = (file: File) => {
        const validtypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel"
        ]

        return validtypes.includes(file.type)
    }

    const createRow = (
        validado: boolean,
        estatus: boolean,
        muestra: Muestra,
        idValidacion: number,
        fecha: string
    ) => {
        if (validado) {
            return (
                <Badge bg="primary" className="me-1">
                    {new Date(fecha).toLocaleString()}
                </Badge>
            );
        }

        if (estatus) {
            if (muestra.index === 0 && paginaActual === 1) {
                return (
                    <Button
                        size="sm"
                        variant="outline-info"
                        onClick={() => btnValidar(muestra, idValidacion)}>
                        Validar
                    </Button>
                );
            }
            return <></>;
        }

        return (
            <Badge bg="secondary" className="me-1" pill>
                No disponible
            </Badge>
        );
    };


    const btnValidar = (muestra: Muestra, idValidacion: number) => {
        setMostrarModal(true);
        setMuestra(muestra)
        setIdValidacion(idValidacion)
    }

    const handleDescargar = async () => {
        try {
            setTextoBtnDescargar("Espere...")
            const response = await axios.get(API_URL + 'Muestras/descargar', {
                responseType: 'blob',
                headers: {
                    Accept: 'application/zip',
                },
            });

            // Crear una URL temporal para el blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Muestras.pdf'); // nombre del archivo
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }finally{
            setTextoBtnDescargar("Descargar")
        }
    }

    const handleEnviarCorreo = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: "",
            text: `Está pr mandarse la muestra validada por correo`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#36784a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Validar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Se está trabajando en esta funcionalidad. Vuelva mas tarde")
            }
        });
        // const response = await GdMService.EnviarCorreos(0, tokenState);
    }

    const validarMuestra = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: "",
            text: `${usuarioSesion?.area} está por validar la muestra de ${(muestra?.tipoCuenta == 1) ? "Ordinario" : "Tarjeta de crédito"} del periodo ${muestra?.periodo}. ¿Estás seguro?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#36784a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Validar"
        }).then((result) => {
            if (result.isConfirmed) {
                GdMService.ValidarMuestra(idValidacion, usuarioSesion?.idUsuario, tokenState)
                    .then((response: AxiosResponse<respuestaAxios>) => {
                        console.log(response)
                        if (response.status == 200 && response.data.mensaje == "") {
                            Swal.fire({
                                title: "",
                                text: "Muestra validada exitosamente",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "",
                                text: "Ocurrio un error! Contacte al administrador",
                                icon: "error"
                            });
                        }
                        setTipoSeleccionado("")
                        setCifs([]);
                        setMostrarModal(false) // Esto activa la lógica de limpieza
                        setMuestra(null)
                    }).catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error"
                        });
                    }).finally(() => {
                        obtenerMuestras(tokenState, 1);
                        obtenerUltimoPeriodo(tokenState);
                    })
            }
        });
    }

    const btnDescargar = (muestra: Muestra) => {
        let props: { onClick: () => void; children: string } | null = null;

        if (muestra.index === 0 && paginaActual === 1) {
            props = { onClick: handleDescargar, children: textoBtnDescargar };
        } else if (puedeEnviarCorreos(muestra)) {
            props = { onClick: () => Swal.fire("Proximamente"), children: textoBtnDescargar+" P. Ant." };
        }

        return props ? (
            <Button variant="secondary" size="sm" className="me-1" onClick={props.onClick} 
            disabled={textoBtnDescargar!="Descargar"}>
                {props.children}
            </Button>
        ) : <></>;
    };


    const btnEnviarCorreo = (muestra: Muestra) => {
        if (puedeEnviarCorreos(muestra) && (muestra.index == 0 && paginaActual == 1))
            return <Button variant="secondary" size="sm" className="me-1" onClick={handleEnviarCorreo}>Enviar Por Correo</Button>
        return <></>
    }

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                {hasMounted && (
                    <GdMCard
                        onSubmit={onSubmit}
                        error={error}
                        key={""}
                        loading={loadingSesion}
                        onChangeFile={onChangeFile}
                        onChangeSelect={onChangeSelect}
                        tipo_edocta={tipoSeleccionado}
                        ultimoPeriodo={ultimoPeriodo}
                    >
                        <Row>
                            <br></br>
                            <GdMTable
                                setPagination={setPagination}
                                data={muestras}
                                key={"000002"}
                                createRow={createRow}
                                btnDescargar={btnDescargar}
                                btnEnviarCorreo={btnEnviarCorreo}
                                events={{
                                    puedeEnviarCorreos: puedeEnviarCorreos,
                                    puedeValidar: puedeValidar
                                }}>

                            </GdMTable>
                        </Row>
                    </GdMCard>)}
            </Container>
            {/*
            <ValidacionModal
                show={mostrarModal }
                item={ }
                nombreUsuario=""
                onChangeUsuario={ }
                onSubmit={ }
                setShow={ }
                usuarioSession={ }
                key={ }
            ></ValidacionModal>*/}
            <ValidacionModal
                item={muestra}
                usuarioSession={usuarioSesion}
                onChangeUsuario={function (e: React.ChangeEvent<HTMLInputElement>): void {
                    e.preventDefault()
                    throw new Error("Function not implemented.");
                }}
                onSubmit={validarMuestra}
                show={mostrarModal}
                setShow={handleClose}>

            </ValidacionModal>
        </Fragment>
    )

}

export default GeneracionDeMuestra;