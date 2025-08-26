import { Button, Spinner } from "react-bootstrap";

interface PrimaryButtonProps {
    loading: boolean;
    text: string;
}

const PrimaryButton = ({ loading, text }: PrimaryButtonProps) => (
    <Button variant="primary" type="submit" disabled={loading}  >
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
            text
        )}
    </Button>
);

export default PrimaryButton;
