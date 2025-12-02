import InputField from "cpm_components/atoms/InputField";
import { Row, Form } from "react-bootstrap";
import { Muestra } from "types/Muestra";
import { Usuario } from "types/authTypes";
import { v4 as uuid } from 'uuid';

interface ValidacionFormProps {
    item: Muestra|null,
    usuario: Usuario|null,
    onChangeUsuario: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ValidacionForm = ({ item, usuario, onChangeUsuario }: ValidacionFormProps) => {


    return (
        <>
            <Form>
                <Row>
                    <Form.Label>Muestra a validar: </Form.Label>
                    <InputField
                        value={(item?.tipoCuenta==1)?"Ordinario":"Tarjeta de Crédito"}
                        required
                        disabled
                        name=""
                        type="text"
                        controlId={uuid()}
                        label=""
                        onChange={()=>{}}></InputField>
                </Row>
                <Row>
                    <Form.Label>Area que valida:</Form.Label>
                    <InputField
                        value={usuario?.area}
                        required
                        disabled
                        name=""
                        type="text"
                        label=""
                        controlId={uuid()}
                        onChange={()=>{}}></InputField>
                </Row>
                <Row>
                    <InputField
                        value={item?.periodo}
                        label="Periodo de Estado de Cuenta:"
                        required
                        disabled
                        name=""
                        type="text"
                        controlId={uuid()}
                        onChange={()=>{}}
                    ></InputField>
                </Row>
                <Row>
                    <InputField
                        value={usuario?.nombre?.toString()}
                        label="Nombre de la persona que valida del área"
                        required
                        disabled
                        onChange={onChangeUsuario}
                        name="usuario"
                        type="text"
                        controlId={uuid()}></InputField>
                </Row>
            </Form>
        </>
    )
}

export default ValidacionForm;