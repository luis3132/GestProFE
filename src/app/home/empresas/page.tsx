"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { empresa, usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import NuevaEmpresa from "@/components/empresa/nuevaEmpresa";
import FloatNuevaEmpresa from "@/components/empresa/nuevaEmpresaFlotante";


export default function Home() {

    const [token, setToken] = useState<string | undefined>(undefined);
    const [usuario, setUsuario] = useState<usuario | null>(null);
    const [empresas, setEmpresas] = useState<empresa[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [nuevo, setNuevo] = useState<boolean>(false);
    const [showNuevaEmpresa, setShowNuevaEmpresa] = useState<boolean>(false);

    useEffect(() => {
        if (!usuario && !token) {
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    useEffect(() => {
        if (!usuario && !token) {
            setReload(!reload);
        } else {
            setNuevo(false);
            fetchEmpresas();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario, token, reload]);


    const fetchEmpresas = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/empresa/list/${usuario?.cedula}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await res.json();
        setEmpresas(data);
    }

    console.log(empresas);

    const handleNuevaEmpresa = () => {
        setShowNuevaEmpresa(!showNuevaEmpresa);
    }

    return (
        <>
            <div className="w-full bg-purple-100 h-[91.6%] px-8 pt-8 pb-4 overflow-y-scroll custom-scrollbar">
                <button className={`float-right bg-green-500 text-white max-md:hidden rounded-lg shadow-xl px-2 py-1 flex items-center font-bold hover:bg-green-600 ${nuevo ? "hidden" : ""}`} onClick={handleNuevaEmpresa}>
                    <Icon icon="gridicons:add-outline" width="24" height="24" className="mr-1" />
                    Crear
                </button>
                <h1 className="text-center font-bold text-5xl mb-4">Empresas creadas</h1>
                <div className="flex justify-center items-center mb-2">
                    <button className={` bg-green-500 text-white md:hidden rounded-lg shadow-xl px-2 py-1 flex items-center font-bold hover:bg-green-600 ${nuevo ? "hidden" : ""}`} onClick={handleNuevaEmpresa}>
                        <Icon icon="gridicons:add-outline" width="24" height="24" className="mr-1" />
                        Crear
                    </button>
                </div>
                {!nuevo && <>
                    <div className="w-full flex flex-wrap h-[79dvh] justify-around">
                        {empresas.map((empresa, index) => (
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
                    <NuevaEmpresa usuario={usuario} update={() => setReload(!reload)} />
                </>}
            </div>
            {showNuevaEmpresa && <FloatNuevaEmpresa usuario={usuario} closeComponent={handleNuevaEmpresa} update={() => setReload(!reload)} />}
        </>
    );
}