import { Form } from "react-bootstrap";

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    controlId: string;
    required?: boolean;
    values: ValuesArray[]
}

interface ValuesArray {
    id: string,
    value: string
}

const InputSelect = ({
    label,
    controlId,
    name,
    value,
    placeholder,
    onChange,
    required = true,
    values
}: InputFieldProps) => (
    <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Select aria-label="Default select example" required={required} onChange={onChange} name={name} value={value}>
            <option value="" key={""}>{placeholder}</option>
            {values.map((item) => {
                return <option value={item.id} key={item.id}>{item.value}</option>
            })}
        </Form.Select>
    </Form.Group>
);

export default InputSelect;
