import { useSession } from "hooks/useSession";
import { Navigate, Outlet } from "react-router-dom";

interface RutaProtegidaProps {
    redirectTo?: string,
    children?: React.ReactNode
}

export const RutaProtegida = ({
    redirectTo = "/login",
    children,
}: RutaProtegidaProps) => {
    const { esAutenticado, loadingSesion } = useSession();

    console.log(redirectTo, children, esAutenticado, loadingSesion)

    if (loadingSesion) {
        return <div>Cargando...</div>
    }

    if (!esAutenticado) {
        return <Navigate to={redirectTo} replace />
    }


    return <Outlet />
}