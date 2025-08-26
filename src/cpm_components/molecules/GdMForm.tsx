import { Form, Row, Col } from "react-bootstrap";
import ErrorAlert from "cpm_components/atoms/ErrorAlert";
import InputSelect from "cpm_components/atoms/InputSelect";
import InputField from "cpm_components/atoms/InputField";
import PrimaryButton from "cpm_components/atoms/PrimaryButton";


interface GdMFormProps {
    onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string | null;
    loading: boolean;
    ultimoPeriodo: string | null;
    tipo_edocta: string;
}

const GdMForm = ({ onChangeFile, onChangeSelect, onSubmit, error, ultimoPeriodo, loading, tipo_edocta }: GdMFormProps) => (
    <Form onSubmit={onSubmit}>
        {error && <ErrorAlert message={error} />}

        <Row>
            <Col>
                <Row style={{ height: "100px" }}>
                    <Col className="d-flex align-items-center">
                        <Form.Label>Ultimo periodo validado: {ultimoPeriodo}</Form.Label>
                    </Col>
                </Row>
            </Col>
            <Col>
                <InputSelect
                    label="Tipo Estado de Cuenta"
                    controlId=""
                    name="tipo_edocta"
                    onChange={onChangeSelect}
                    value={tipo_edocta}
                    values={[{ id: "1", value: "Ordinario" }, { id: "2", value: "Tarjeta de Crédito" }]}
                    required
                >
                </InputSelect>
            </Col>
        </Row>
        <Row>
            <Col>
                <InputField
                    name="layout"
                    label="Layout de socios"
                    type="file"
                    controlId={"layout_input"}
                    onChange={onChangeFile}
                    placeholder="Cargar el archivo aqui..."
                    required
                >
                </InputField>
            </Col>
            <Col>
                <Row style={{ height: "100px" }}>
                    <Col className="d-flex align-items-center justify-content-end">
                        <PrimaryButton loading={loading} text="Cargar Layout" />
                    </Col>
                </Row>
            </Col>
        </Row>
    </Form >
)

export default GdMForm;