import { useSession } from "hooks/useSession";
import { Navigate, replace } from 'react-router-dom';

interface RoleProtectedProps {
    allowedRoles: string[],
    redirecTo?: string,
    children: React.ReactNode
}

export const RolProtegida = ({
    allowedRoles,
    redirecTo = '/unauthorized',
    children,
}: RoleProtectedProps) => {
    const { usuarioSesion, esAutenticado, loadingSesion } = useSession();

    if (loadingSesion) {
        return <div>Cargando...</div>
    }

    if (!esAutenticado) {
        return <Navigate to={"/login"} replace></Navigate>
    }

    const tieneRolPermitido = (usuarioSesion?.perfil && allowedRoles.includes(usuarioSesion.perfil))

    if (!tieneRolPermitido) {
        return <Navigate to={redirecTo} replace />
    }

    return <>{children}</>


}