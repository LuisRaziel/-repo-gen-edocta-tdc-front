import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { CredencialesLogin } from "types/authTypes";
import { useMounted } from "hooks/useMounted";
import LoginCard from "../../organisms/LoginCard";
import authService from "services/authService";

import { useSession } from "hooks/useSession";
import { Outlet, useNavigate } from "react-router";

const Login = () => {
    const hasMounted = useMounted();
    const navigate = useNavigate();
    
    const [usuario, setUsuario] = useState<CredencialesLogin>({
        user: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {usuarioSesion, login, esAutenticado} = useSession();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const Login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (usuario.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            var response = await authService.Login(usuario);
            if(response){
                login(response)
                console.log("Credenciales enviadas:", response, usuarioSesion, esAutenticado);
                navigate("/dashboard");
            }
        } catch {
            setError("Error al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return ( <section className="bg-light">
      <Container className="d-flex flex-column">
        <Row className="align-items-center justify-content-center g-0 min-vh-100">
            <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
                {hasMounted && (
                    <LoginCard
                        usuario={usuario}
                        onChange={onChange}
                        onSubmit={Login}
                        error={error}
                        loading={loading}
                    />
                )}
            </Col>
        </Row>
      </Container>
    </section>
        
    );
};

export default Login;
