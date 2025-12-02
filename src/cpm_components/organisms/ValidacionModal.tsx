import ValidacionForm from 'cpm_components/molecules/ValidacionForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Muestra } from "types/Muestra";
import { Usuario } from 'types/authTypes';


interface validacionModalProps {
    item: Muestra|null,
    usuarioSession: Usuario|null,
    onChangeUsuario: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ValidacionModal = ({ item, onChangeUsuario, usuarioSession, onSubmit, show, setShow }: validacionModalProps) => {

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Validación de Muestra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ValidacionForm
                        onChangeUsuario={onChangeUsuario}
                        item={item}
                        usuario={usuarioSession}
                    >

                    </ValidacionForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Validar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ValidacionModal;