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
    if (!usuario && !token) {
      setReload(!reload);
    }
    if (usuario) {
      if (!usuario.roles.some(r => r.roles.roles === "ADMIN")) {
        window.location.href = "/home";
      }
    }
  }, [usuario, token, reload]);

  return (
    <>
      <div className="w-full bg-purple-100 h-[91.6%] ">

      </div>
    </>
  );
}
