import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { Container, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'

import { useMounted } from "hooks/useMounted";
import { useSession } from "hooks/useSession";
import GdMCard from "cpm_components/organisms/GdMCard";
import GdMTable from "cpm_components/molecules/GdMTable";
import Muestras from "data/muestras/muestras";

export interface ItemsGeneracionDeMuestras {
    id: number,
    tipo: string,
    periodo: string,
    validadoImpuestos: boolean
    validadorImpuestos: string,
    validadoMercadotecnia: boolean,
    validadorMercadotecnia: string
    validadoEstadoDeCuenta: boolean,
    validadorEstadoDeCuenta: string,
    validadoTDC: boolean,
    validadorTDC: string

}

const GeneracionDeMuestra = () => {
    // hooks
    const hasMounted = useMounted();
    const { loadingSesion, usuarioSesion, esAutenticado, } = useSession()


    // states
    const [error, setError] = useState<string | null>(null);
    const [ultimoPeriodo, setUltimoPeriodo] = useState("");
    const [archivo, setArchivo] = useState<File | null>(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState("");
    const [muestras, setMuestras] = useState<ItemsGeneracionDeMuestras[] | null>(null);

    // useEffect
    useEffect(() => {
        obtenerUltimoPeriodo();
        obtenerMuestras();
    }, [])

    const obtenerUltimoPeriodo = () => {
        setUltimoPeriodo("Espere...");
        setTimeout(() => {
            setUltimoPeriodo("AGOSTO 2025")
        }, 2000);
    }

    const obtenerMuestras = async () => {
        setMuestras(Muestras)
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Desea cargar el layout?",
            text: "Una vez cargado esto no se puede deshacer la accion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#36784a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cargar"
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                if (archivo) formData.append("archivo", archivo);
                formData.append("tipo", tipoSeleccionado);

                axios.postForm("", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((response) => {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                })
            }
        });





    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setArchivo(file);
            console.log("Archivo seleccionado:", file.name);
        }
    };

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setTipoSeleccionado(value);
        console.log("Opción seleccionada:", value);
    };



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
                                data={muestras}
                                key={"000002"}
                                events={[]}>

                            </GdMTable>
                        </Row>
                    </GdMCard>)}
            </Container>
        </Fragment>
    )

}

export default GeneracionDeMuestra;

