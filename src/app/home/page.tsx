"use client";

import Comprobar from "@/lib/scripts/comprobar";
import { usuario } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Perfil from "@/components/usuario/perfil";

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
    if (!usuario && !token) {
      setReload(!reload);
    }
  }, [usuario, token, reload]);

  return (
    <>
      <div className="w-full bg-purple-100 h-[91.6%] p-8 md:flex">
        <div className="md:w-1/4 max-md:hidden">
          <Perfil usuario={usuario} />
        </div>
        <div className="w-full md:w-3/4 px-8">
          <h1 className="text-2xl font-bold">Bienvenido {usuario?.nombres}</h1>
          <p className="text-lg">Este es el panel de control de tu cuenta</p>
        </div>
        <div className="w-full md:w-1/4 hidden max-md:block">
          <Perfil usuario={usuario} />
        </div>
      </div>
    </>
  );
}
