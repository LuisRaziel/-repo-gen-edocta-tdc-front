import { Form, Row } from "react-bootstrap";
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
}

const GdMForm = ({ onChangeFile, onChangeSelect, onSubmit, error, ultimoPeriodo, loading }: GdMFormProps) => (
    <Form onSubmit={onSubmit}>
        {error && <ErrorAlert message={error} />}
        <Form.Label>Ultimo periodo validado: {ultimoPeriodo}</Form.Label>

        <Row>
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
            <InputSelect
                label="Tipo Estado de Cuenta"
                controlId=""
                name="tipo_edocta"
                onChange={onChangeSelect}
                value={""}
                values={[{ id: "1", value: "Ordinario" }, { id: "2", value: "Tarjeta de Crédito" }]}
            >
            </InputSelect>
        </Row>
        <div className="d-grid">
            <PrimaryButton loading={loading} text="Cargar Layout" />
        </div>
    </Form>
)

export default GdMForm;