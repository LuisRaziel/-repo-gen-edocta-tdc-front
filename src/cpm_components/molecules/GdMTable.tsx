import { ItemsGeneracionDeMuestras } from "cpm_components/pages/generacion_muestra/GeneracionDeMuestra";
import { Table } from "react-bootstrap"



interface GdMTableProps {
    data: ItemsGeneracionDeMuestras[]|null,
    events: any[],
}


const GdMTable = ({ data, events }: GdMTableProps) => {
    return <>
        <Table className="text-nowrap" responsive>
            <thead className="table-light">
                <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Periodo</th>
                    <th scope="col">Impuestos</th>
                    <th scope="col">Validado por</th>
                    <th scope="col">Mercadotecnia</th>
                    <th scope="col">Validado por</th>
                    <th scope="col">Estado de Cuenta</th>
                    <th scope="col">Validado por</th>
                    <th scope="col">Tarjeta de Credito</th>
                    <th scope="col">Validado por</th>
                    <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data && data.length > 0) ?
                        data.map(itemgdc => {
                            return <tr>
                                <td>{itemgdc.tipo}</td>
                                <td>{itemgdc.periodo}</td>
                                <td>{itemgdc.validadoImpuestos.toString()}</td>
                                <td>{itemgdc.validadorImpuestos}</td>
                                <td>{itemgdc.validadoMercadotecnia.toString()}</td>
                                <td>{itemgdc.validadorMercadotecnia}</td>
                                <td>{itemgdc.validadoEstadoDeCuenta.toString()}</td>
                                <td>{itemgdc.validadorEstadoDeCuenta}</td>
                                <td>{itemgdc.validadoTDC.toString()}</td>
                                <td>{itemgdc.validadorTDC}</td>
                            </tr>
                        }) : null
                }
            </tbody>
        </Table>
    </>
}

export default GdMTable;