import { Table } from "react-bootstrap"
import { v4 as uuid } from 'uuid'
import { EDCH } from "types/EDCH";


interface EDCHTableProp {
    data: EDCH[] | null,
    btnDescargar: (edc: EDCH) => JSX.Element
}

const EDCHTable = ({ data, btnDescargar, }: EDCHTableProp) => {

    function formatoFechaAAAAMM(valor: number) {
        // Convertir a string para manipular
        const str = valor.toString();

        // Extraer año y mes
        const anio = str.slice(0, 4);
        const mes = parseInt(str.slice(4, 6), 10);

        // Lista de meses en español
        const meses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        // Construir resultado
        return `${meses[mes - 1]} de ${anio}`;
    }

    

    return <>
        <Table className="text-nowrap" responsive>
            <thead className="table-light">
                <tr>
                    <th scope="col">Acción</th>
                    <th scope="col">Socio</th>
                    <th scope="col">Id</th>
                    <th scope="col">Año_Periodo</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Tipo Periodo</th>
                    <th scope="col">Fecha Carga</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data && data.length > 0) ?
                        data.map((edc: EDCH) => {
                            return <tr key={uuid()}>
                                <td>{btnDescargar(edc)}</td>
                                <td>{edc.cif}</td>
                                <td>{edc.id}</td>
                                <td>{edc.año_Periodo}</td>
                                <td>{(edc.periodo=="")?formatoFechaAAAAMM(edc.año_Periodo):edc.periodo}</td>
                                <td>{edc.tipo_Periodo == "M" ? "Mensual" : edc.tipo_Periodo == "B" ? "Bimestral" : ""}</td>
                                <td>{new Date(edc.fecha_Creacion).toLocaleString()}</td>
                            </tr>
                        }) : null
                }
            </tbody>
        </Table>
    </>
}

export default EDCHTable;