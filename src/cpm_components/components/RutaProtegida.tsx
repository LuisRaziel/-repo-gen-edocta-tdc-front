import { useSession } from "hooks/useSession";
import { Navigate, Outlet } from "react-router-dom";

interface RutaProtegidaProps {
    redirectTo?: string,
    children?: React.ReactNode
}

export const RutaProtegida = ({
    redirectTo = "/login",
}: RutaProtegidaProps) => {
    const { esAutenticado, loadingSesion } = useSession();

    if (loadingSesion) {
        return <div>Cargando...</div>
    }

    if (!esAutenticado) {
        return <Navigate to={redirectTo} replace />
    }


    return <Outlet />
}