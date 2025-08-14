import { Form } from "react-bootstrap";
import InputField from "../atoms/InputField";
import PrimaryButton from "../atoms/PrimaryButton";
import ErrorAlert from "../atoms/ErrorAlert";
import { CredencialesLogin } from "types/authTypes";

interface LoginFormProps {
    usuario: CredencialesLogin;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string | null;
    loading: boolean;
}

const LoginForm = ({ usuario, onChange, onSubmit, error, loading }: LoginFormProps) => (
    <Form onSubmit={onSubmit}>
        {error && <ErrorAlert message={error} />}

        <InputField
            label="Usuario"
            type="input"
            name="user"
            value={usuario.user}
            placeholder="Usuario"
            onChange={onChange}
            controlId="user"
        />

        <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={usuario.password}
            placeholder="**************"
            onChange={onChange}
            controlId="password"
        />

        <div className="d-grid">
            <PrimaryButton loading={loading} text="Iniciar Sesión" />
        </div>
    </Form>
);

export default LoginForm;
