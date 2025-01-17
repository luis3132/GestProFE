"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import NuevaEmpresa from "@/components/empresa/nuevaEmpresa";


export default function Home() {

    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<usuario | null>(null);
    const [reload, setReload] = useState<boolean>(false);
    const [nuevo, setNuevo] = useState<boolean>(false);

    useEffect(() => {
        if (document.readyState === "complete") {
            const { token, usuario } = Comprobar();

            if (token !== undefined && usuario !== null) {
                setToken(token);
                setUsuario(usuario);
                if (usuario.empresas.length === 0) {
                    setNuevo(true);
                }
            }
            if (Cookies.get("authToken") === undefined || Cookies.get("authToken") === "") {
                window.location.href = "/";
            }
        }
    }, [reload]);

    useEffect(() => {
        if (!usuario && !token) {
            setReload(!reload);
        }
    }, [usuario, token, reload]);

    return (
        <>
            <div className="w-full bg-purple-100 h-[91.6%] p-8 overflow-y-scroll custom-scrollbar">
                <button className={`float-right bg-green-500 text-white max-md:hidden rounded-lg shadow-xl px-2 py-1 flex items-center font-bold hover:bg-green-600 ${nuevo ? "hidden" : ""}`}>
                    <Icon icon="gridicons:add-outline" width="24" height="24" className="mr-1" />
                    Crear
                </button>
                <h1 className="text-center font-bold text-5xl mb-4">Empresas creadas</h1>
                <div className="flex justify-center items-center">
                    <button className={` bg-green-500 text-white md:hidden rounded-lg shadow-xl px-2 py-1 flex items-center font-bold hover:bg-green-600 ${nuevo ? "hidden" : ""}`}>
                        <Icon icon="gridicons:add-outline" width="24" height="24" className="mr-1" />
                        Crear
                    </button>
                </div>
                {!nuevo && <>
                    <div className="w-full flex flex-wrap h-[79dvh] justify-around">
                        {usuario?.empresas.map((empresa, index) => (
                            <div key={index} className="max-sm:w-full max-lg:w-1/2 w-[30%] bg-gray-100 rounded-lg shadow-lg mx-2 p-5 h-min mb-5">
                                <h1 className="text-center font-bold text-xl">{empresa.nombre}</h1>
                                <p className="text-center">{empresa.estado}</p>
                                <div className="flex justify-center items-center">
                                    <button className="bg-green-500 text-white rounded-lg shadow-xl px-4 py-2 flex items-center font-bold hover:bg-green-600">
                                        <Icon icon="akar-icons:edit" width="24" height="24" className="mr-1" />
                                        Editar
                                    </button>
                                    <button className="bg-red-500 text-white rounded-lg shadow-xl px-4 py-2 flex items-center font-bold hover:bg-red-600">
                                        <Icon icon="akar-icons:delete" width="24" height="24" className="mr-1" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}
                {nuevo && <>
                    <NuevaEmpresa usuario={usuario} />
                </>}
            </div>
        </>
    );
}