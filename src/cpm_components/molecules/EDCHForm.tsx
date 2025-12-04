import { Form, Row, Col } from "react-bootstrap";
import InputField from "cpm_components/atoms/InputField";
import PrimaryButton from "cpm_components/atoms/PrimaryButton";


interface GdMFormProps {
    cif: string,
    onChangeCif: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    loading: boolean;
}

const EDCHForm = ({ onChangeCif, onSubmit, cif, loading }: GdMFormProps) => (
    <Form onSubmit={onSubmit}>
        <Row>
            <InputField
                name="cif"
                label=""
                type="text"
                controlId={"cif_input"}
                onChange={onChangeCif}
                placeholder="Capture el socio"
                required
                value={cif}
            >
            </InputField>
            <Col className="d-flex align-items-center justify-content-end">
                <PrimaryButton loading={loading} text="Buscar" />
            </Col>
        </Row>
    </Form >
)

export default EDCHForm;