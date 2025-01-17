"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Home() {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<usuario | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        if (document.readyState === "complete") {
            const { token, usuario } = Comprobar();

            if (token !== undefined && usuario !== null) {
                setToken(token);
                setUsuario(usuario);
            }
            if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "") {
                window.location.href = "/";
            }
        }
    }, [reload]);

    useEffect(() => {
        if (usuario && token) {
            if (usuario?.roles?.some(i => i.roles.roles === "ADMIN") && usuario?.roles?.some(i => i.roles.roles === "USER")) {
                window.location.href = "admin";
            } else if (usuario?.roles?.some(i => i.roles.roles === "ADMIN") && !usuario?.roles?.some(i => i.roles.roles === "USER")) {
                window.location.href = "admin";
            } else if (usuario?.roles?.some(i => i.roles.roles === "USER")) {
                window.location.href = "home";
            }
        }
        setReload(!reload);
    }, [usuario, token, reload]);
    return (
        <>
            <div className="w-full fixed h-dvh flex justify-center items-center backdrop-blur-sm inset-0">
                <style jsx>{`
                    .spinner {
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        border-left-color: #09f;
                        animation: spin 1s ease infinite;
                    }
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
                <div className="spinner"></div>
            </div>
        </>
    )
}