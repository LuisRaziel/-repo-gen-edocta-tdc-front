import { Alert } from "react-bootstrap";

interface ErrorAlertProps {
    message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => (
    <Alert variant="danger">{message}</Alert>
);

export default ErrorAlert;
