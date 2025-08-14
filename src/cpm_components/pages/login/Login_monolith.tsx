import { Row, Col, Card, Form, Button, Image, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { CredencialesLogin } from "types/authTypes";
import { useMounted } from "hooks/useMounted";

const Login = () => {
    const hasMounted = useMounted();

    const [usuario, setUsuario] = useState<CredencialesLogin>({
        user: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Validación simple
        if (usuario.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            // Simulación de login
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Credenciales enviadas:", usuario);
            // Aquí iría la lógica real de autenticación
        } catch (err) {
            setError("Error al iniciar sesión. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                <Card className="smooth-shadow-md">
                    <Card.Body className="p-6">
                        <Row className="justify-content-center">
                            <Col xs={6} md={4}>
                                <Image
                                    src="/images/cpm/logo-vector.png"
                                    className="mb-2"
                                    alt="Logo de la empresa"
                                    width={"100px"}
                                />
                            </Col>
                        </Row>

                        {hasMounted && (
                            <Form onSubmit={login}>
                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form.Group className="mb-3" controlId="user">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="user"
                                        placeholder="Usuario"
                                        required
                                        value={usuario.user}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="**************"
                                        required
                                        value={usuario.password}
                                        onChange={onChange}
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{" "}
                                                Iniciando...
                                            </>
                                        ) : (
                                            "Iniciar Sesión"
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
