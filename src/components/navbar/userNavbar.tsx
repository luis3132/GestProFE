import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import Cookies from "js-cookie";

interface UserNavbarProps {
    admin: boolean;
    changeRole: () => void;
}

const UserNavbar: FC<UserNavbarProps> = ({ admin, changeRole }) => {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogOut = () => {
        Cookies.remove("authToken");
        sessionStorage.removeItem("usuario");
        window.location.href = "/";
    }

    return (
        <nav className={`flex flex-col bg-green-500 justify-around items-center w-full shadow-xl ${showMenu ? "h-48" : "h-20"} duration-500 overflow-hidden max-md:pt-2`}>
            <div className="flex justify-between items-center w-full max-md:mb-4">
                <Link href={"/home"} className="flex items-center ml-3 rounded-2xl shadow-2xl py-1 px-2 hover:bg-green-600">
                    <Image src="/gestpro.png" alt="GestPro" width={50} height={50} />
                    <h1 className="text-white text-2xl font-bold">GestPro</h1>
                </Link>
                {admin && <Link href={"/admin"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4 md:hidden" onClick={changeRole}>
                    <Icon icon="icon-park-outline:change" width="30" height="30" className="font-bold mr-1" />
                    <p className="font-bold">Admin</p>
                </Link>}
                <div className="flex items-center max-md:hidden mr-3">
                    <Link href={"/home/empleos"} className="flex items-center h-12 rounded-lg shadow-xl ml-3 text-lg text-white hover:bg-green-600 px-4">
                        <Icon icon="clarity:employee-line" width="30" height="30" className="font-bold mr-1" />
                        <p className="font-bold">Empleos</p>
                    </Link>
                    <Link href={"/home/empresas"} className="flex items-center h-12 rounded-lg shadow-xl ml-3 text-lg text-white hover:bg-green-600 px-4">
                        <Icon icon="ic:baseline-business" width="24" height="24" className="font-bold mr-1" />
                        <p className="font-bold">Empresas</p>
                    </Link>
                </div>
                <div className="flex items-center max-md:hidden mr-3">
                    {admin && <Link href={"/admin"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4" onClick={changeRole}>
                        <Icon icon="icon-park-outline:change" width="30" height="30" className="font-bold mr-1" />
                        <p className="font-bold">Cambiar a Admin</p>
                    </Link>}
                    <button className="flex items-center h-12 rounded-lg shadow-xl ml-3 text-lg bg-red-400 text-white hover:bg-red-500 px-4" onClick={handleLogOut}>
                        <Icon icon="material-symbols:logout-rounded" width="24" height="24" className="font-bold mr-1" />
                        <p className="font-bold">Cerrar Sesión</p>
                    </button>
                </div>
                <div className="flex items-center md:hidden mr-3">
                    <button className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4" onClick={handleShowMenu}>
                        <Icon icon="iconamoon:menu-burger-horizontal" width="24" height="24" className={`font-bold duration-500 ${showMenu ? "" : "rotate-90"}`} />
                    </button>
                </div>
            </div>
            <div className="flex items-center md:hidden justify-around w-full pb-1">
                <Link href={"/home/empleos"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4">
                    <Icon icon="clarity:employee-line" width="24" height="24" className="font-bold mr-1" />
                    <p className="font-bold">Empleos</p>
                </Link>
                <Link href={"/home/empresas"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4">
                    <Icon icon="ic:baseline-business" width="24" height="24" className="font-bold mr-1" />
                    <p className="font-bold">Empresas</p>
                </Link>
            </div>
            <div className="flex items-center md:hidden justify-around w-full pb-1">
                <button className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white bg-red-400 hover:bg-red-500 px-4" onClick={handleLogOut}>
                    <Icon icon="material-symbols:logout-rounded" width="24" height="24" className="font-bold mr-1" />
                    <p className="font-bold">Cerrar Sesión</p>
                </button>
            </div>
        </nav>
    )
}

export default UserNavbar;