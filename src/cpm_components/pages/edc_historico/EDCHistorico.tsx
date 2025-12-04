import EDCHTable from "cpm_components/molecules/EDCHTable";
import EDCHCard from "cpm_components/organisms/EDCHCard";
import { useMounted } from "hooks/useMounted";
import { useSession } from "hooks/useSession";
import { Fragment, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import EDCHService from "services/EDCHService";
import Swal from "sweetalert2";
import { EDCH } from "types/EDCH";



const EDCHistorico = () => {
    // hooks
    const hasMounted = useMounted();
    const { loadingSesion, usuarioSesion, esAutenticado } = useSession();

    // states
    const [tokenState, setTokenState] = useState<string>("")
    const [cif, setCif] = useState<string>("");
    const [EDCs, setEDCS] = useState<EDCH[]>([]);
    const [textDescargar, setTextoDescargar] = useState<string>("Descargar")


    // variables
    let token = "";

    useEffect(() => {
        if (loadingSesion || !esAutenticado || !usuarioSesion?.token) return;

        token = usuarioSesion.token;
        setTokenState(token);
    },
        [loadingSesion, esAutenticado, usuarioSesion]);

    useEffect(() => {

    }, [])


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (cif.length < 10) {
            setCif(cif.padStart(10, "0"));
        }
        var resultado = await EDCHService.Consultar(cif, tokenState).then(r => r);
        if(resultado.length==0){
            Swal.fire("","No se encontraron estados de cuenta", "info")
        }
        setEDCS(resultado)
    }

    const onChangeCif = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue) && newValue.length <= 10) {
            setCif(newValue);
        }
    };

    const btnDescargar = (edc: EDCH) => {
        return <Button variant="primary" size="sm" className="me-1" onClick={async (e) => {
            e.preventDefault();
            setTextoDescargar("Espere...")
            EDCHService.DescargarEDC(edc, tokenState).finally(()=>setTextoDescargar("Descargar"))
        }} disabled={textDescargar != "Descargar"}>
            {textDescargar}
        </Button>
    }

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                {hasMounted && (
                    <EDCHCard
                        onSubmit={onSubmit}
                        key={""}
                        loading={loadingSesion}
                        onChangeCif={onChangeCif}
                        cif={cif}
                    >
                        <Row>
                            <br></br>
                            <EDCHTable
                                data={EDCs}
                                key={"000002"}
                                btnDescargar={btnDescargar}>

                            </EDCHTable>
                        </Row>
                    </EDCHCard>)}
            </Container>
        </Fragment>
    )
}

export default EDCHistorico;