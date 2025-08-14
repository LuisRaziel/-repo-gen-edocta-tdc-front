import { useEffect, useState } from "react";
import { Usuario } from "types/authTypes";

export interface UseSession {
    usuarioSesion: Usuario | null,
    esAutenticado: boolean,
    login: (usuarioData: Usuario) => void;
    logout: () => void;
    loadingSesion: boolean
}

export function useSession(): UseSession {
    const SESSION_NAME = "USER_GEC"

    const [usuarioSesion, setUsuarioSesion] = useState<Usuario | null>(null);
    const [loadingSesion, setLoadingSesion] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(SESSION_NAME);
        if (storedUser) {
            setUsuarioSesion(JSON.parse(storedUser));
        }
        setLoadingSesion(false);
    }, [])

    const login = (usuarioData: Usuario) => {
        localStorage.setItem(SESSION_NAME, JSON.stringify(usuarioData));
        setUsuarioSesion(usuarioData);
    }

    const logout = () => {
        localStorage.removeItem(SESSION_NAME)
        setUsuarioSesion(null)
    }

    return {
        usuarioSesion,
        esAutenticado: !!usuarioSesion,
        login,
        logout,
        loadingSesion,
    }
}