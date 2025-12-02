import { Form } from "react-bootstrap";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value?: string; // Opcional para inputs tipo file
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    controlId: string;
    required?: boolean;
    accept?: string; // Para especificar tipos de archivos permitidos
    multiple?: boolean; // Para permitir múltiples archivos
    disabled?: boolean
}

const InputField = ({
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
    controlId,
    required = true,
    accept,
    multiple = false,
    disabled = false

}: InputFieldProps) => (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            value={type !== "file" ? value : undefined} // Evita error con inputs tipo file
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            accept={type === "file" ? accept : undefined}
            multiple={type === "file" ? multiple : undefined}
            disabled={disabled}
        />
    </Form.Group>
);

export default InputField;
