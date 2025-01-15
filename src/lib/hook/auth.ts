import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usuario } from "../types/types";

interface verificacion {
    nombreUsuario: string;
    contrasena: string;
}

interface Context {
    usuario: usuario | null,
    logout: () => void;
    changeRole: () => void;
    role: boolean;
}

const getUsuario = async (token: string | undefined) => {
    if (token && token != "") {
        let verificacion: verificacion = { nombreUsuario: "", contrasena: "" };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(token)
            });
            verificacion = await response.json();
        } catch (error) {
            Cookies.remove("authToken");
            sessionStorage.removeItem("usuario");
            window.location.href = "/";
            console.log(error)
        }

        // cargar datos del usuario

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/usuario/list/${verificacion.nombreUsuario}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const usuario: usuario = await response.json();
            return usuario;
        } catch (error) {
            console.log(error)
        }
    }
}

export const AuthContext = createContext<Context>({
    usuario: null,
    logout: () => {},
    changeRole: () => {},
    role: false
});

export default function useAuth({ cookie }: { cookie: string | undefined }) {
    const [usuario, setUsuario] = useState<usuario | null>(null);
    const [role, setRole] = useState<boolean>(false);
    useEffect(() => {
        //validacion del token
        getUsuario(cookie).then((usuario) => {
            setUsuario(usuario || null);
        });

    }, [cookie]);

    const LogOut = () => {
        setUsuario(null);
    }

    const ChangeRole = () => {
        setRole(!role);
    }

    return {usuario, AuthContext, LogOut, ChangeRole, role};
};