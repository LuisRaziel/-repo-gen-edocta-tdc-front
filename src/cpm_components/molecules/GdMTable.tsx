import { FuncionesProps } from "cpm_components/pages/generacion_muestra/GeneracionDeMuestra";
import { Row, Table } from "react-bootstrap"
import { v4 as uuid } from 'uuid'
import { Muestra } from 'types/Muestra';


interface GdMTableProps {
    data: Muestra[] | null,
    events: FuncionesProps,
    createRow: (validado: boolean, estatus: boolean, muestra: Muestra, idValidacion: number, fecha: string) => JSX.Element,
    btnDescargar: (muestra: Muestra) => JSX.Element,
    btnEnviarCorreo: (muestra: Muestra) => JSX.Element | null
    setPagination: () => JSX.Element
}


const GdMTable = ({ data, events, createRow, btnDescargar, btnEnviarCorreo, setPagination }: GdMTableProps) => {
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
                        data.map((itemgdc: Muestra) => {
                            return <tr key={uuid()}>

                                <td>{(itemgdc.tipoCuenta == 1) ? "Ordinario" : "Tarjeta de Crédito"}</td>
                                <td>{itemgdc.periodo}</td>

                                <td>{createRow(Boolean(itemgdc.validadoImpuestos), events.puedeValidar("Impuestos", itemgdc.validadoEstadoDeCuenta == 1), itemgdc, itemgdc.idImpuestos, itemgdc.impuestosFecha)}</td>
                                <td>{itemgdc.validadorImpuestos}</td>

                                <td>{createRow(Boolean(itemgdc.validadoMercadotecnia), events.puedeValidar("Mercadotecnia", itemgdc.validadoEstadoDeCuenta == 1), itemgdc, itemgdc.idMercadotecnia, itemgdc.mercadotecniaFecha)}</td>
                                <td>{itemgdc.validadorMercadotecnia}</td>

                                <td>{createRow(Boolean(itemgdc.validadoEstadoDeCuenta), events.puedeValidar("Estado de Cuenta", itemgdc.validadoEstadoDeCuenta == 1), itemgdc, itemgdc.idEstadoDeCuenta, itemgdc.estadoDeCuentaFecha)}</td>
                                <td>{itemgdc.validadorEstadoDeCuenta}</td>

                                <td>{createRow(Boolean(itemgdc.validadoTDC), events.puedeValidar("Tarjeta de Credito", itemgdc.validadoEstadoDeCuenta == 1), itemgdc, itemgdc.idTDC, itemgdc.tdcFecha)}</td>
                                <td>{itemgdc.validadorTDC}</td>
                                <td>{btnDescargar(itemgdc)} {btnEnviarCorreo(itemgdc)}</td>
                            </tr>
                        }) : null
                }
            </tbody>
        </Table>
        <br></br>
        <Row>
            {setPagination()}
        </Row>
    </>
}

export default GdMTable;