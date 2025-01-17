"use client";

import useAuth from "@/lib/hook/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminNavbar from "./adminNavbar";
import UserNavbar from "./userNavbar";
import NavBarLogOut from "./navbarLogOut";
import CryptoJS from "crypto-js";

const MainNavbar = () => {

    const { usuario, AuthContext, LogOut, ChangeRole, role } = useAuth({ cookie: Cookies.get("authToken") });
    const [admin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (usuario) {
            if (document.readyState === "complete") {
                const usuarioString: string = JSON.stringify(usuario);
                // Encrypt
                const cryp: string = CryptoJS.AES.encrypt(usuarioString, process.env.NEXT_PUBLIC_SECRETKEY as string).toString();
                // Save
                sessionStorage.setItem("usuario", cryp);
            }
            if (usuario.estado === "INACTIVO") {
                Swal.fire({
                    title: "Usuario inactivo o no Aprovado",
                    text: "Su usuario ha sido desactivado, contacte con el administrador",
                    icon: "error",
                    timer: 5000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => {
                        LogOut();
                        sessionStorage.removeItem("usuario");
                        Cookies.remove("authToken");
                        window.location.reload();
                    }
                });
            }
            if (usuario?.roles.some(i => i.roles.roles === "ADMIN") && usuario?.roles.some(i => i.roles.roles === "USER")) {
                setAdmin(true);
            }
        }
    }, [usuario, LogOut]);

    return (
        <AuthContext.Provider value={{
            usuario, logout() {
                LogOut();
            }, changeRole() {
                ChangeRole();
            }, role
        }}>
            {usuario === null && <NavBarLogOut />}
            {usuario?.roles.some(i => i.roles.roles === "ADMIN") && usuario?.roles.some(i => i.roles.roles === "USER") &&
                (!role && <AdminNavbar admin={admin} changeRole={ChangeRole} />) || (role && <UserNavbar admin={admin} changeRole={ChangeRole} />)}
            {usuario?.roles.some(i => i.roles.roles === "ADMIN") && !usuario?.roles.some(i => i.roles.roles === "USER") && <AdminNavbar admin={admin} changeRole={ChangeRole} />}
            {usuario?.roles.some(i => i.roles.roles === "USER") && !usuario?.roles.some(i => i.roles.roles === "ADMIN") && <UserNavbar admin={admin} changeRole={ChangeRole} />}
        </AuthContext.Provider>
    )
};

export default MainNavbar;