import { Image } from "react-bootstrap";
import image from '../../../public/images/cpm/logo-vector.png'

const Logo = () => (
    <Image
        src={image}
        className="mb-2"
        alt="Logo de la empresa"
        width={"100px"}
    />
);

export default Logo;
