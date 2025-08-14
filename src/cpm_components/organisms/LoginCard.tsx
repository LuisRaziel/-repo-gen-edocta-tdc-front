import { Card, Col, Row } from "react-bootstrap";
import Logo from "../atoms/Logo";
import LoginForm from "../molecules/LoginForm";
import { CredencialesLogin } from "types/authTypes";

interface LoginCardProps {
    usuario: CredencialesLogin;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string | null;
    loading: boolean;
}

const LoginCard = ({ usuario, onChange, onSubmit, error, loading }: LoginCardProps) => (
    <Card className="smooth-shadow-md">
        <Card.Body className="p-6">
            <Row className="justify-content-center">
                <Col xs={6} md={4}>
                    <Logo />
                </Col>
            </Row>
            <LoginForm
                usuario={usuario}
                onChange={onChange}
                onSubmit={onSubmit}
                error={error}
                loading={loading}
            />
        </Card.Body>
    </Card>
);

export default LoginCard;
