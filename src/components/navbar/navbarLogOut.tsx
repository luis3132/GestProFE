import Image from "next/image";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import Link from "next/link";

const NavBarLogOut = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <nav className={`flex flex-col bg-green-500 justify-around items-center w-full shadow-xl ${showMenu ? "h-36" : "h-20"} duration-500 overflow-hidden max-md:pt-2`}>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center ml-3 rounded-2xl shadow-2xl py-1 px-2 cursor-default">
                    <Image src="/gestpro.png" alt="GestPro" width={50} height={50} />
                    <h1 className="text-white text-2xl font-bold">GestPro</h1>
                </div>
                <div className="flex items-center max-md:hidden mr-3">
                    <Link href={"/auth/login"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4">
                        <Icon icon="material-symbols:login" className="font-bold mr-1" width="24" height="24" />
                        <p className="font-bold">Iniciar sesión</p>
                    </Link>
                    <Link href={"/auth/register"} className="flex items-center h-12 rounded-lg shadow-xl ml-3 text-lg text-white hover:bg-green-600 px-4">
                        <Icon icon="mdi:register" width="24" height="24" className="font-bold mr-1" />
                        <p className="font-bold">Registrarse</p>
                    </Link>
                </div>
                <div className="flex items-center md:hidden mr-3">
                    <button className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4" onClick={handleShowMenu}>
                        <Icon icon="iconamoon:menu-burger-horizontal" width="24" height="24" className="font-bold" />
                    </button>
                </div>
            </div>
            <div className="flex items-center md:hidden justify-around w-full pb-1">
                <Link href={"/auth/login"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4">
                    <Icon icon="material-symbols:login" className="font-bold mr-1" width="24" height="24" />
                    <p className="font-bold">Iniciar sesión</p>
                </Link>
                <Link href={"/auth/register"} className="flex items-center h-12 rounded-lg shadow-xl text-lg text-white hover:bg-green-600 px-4">
                    <Icon icon="mdi:register" width="24" height="24" className="font-bold mr-1" />
                    <p className="font-bold">Registrarse</p>
                </Link>
            </div>
        </nav>
    );
};

export default NavBarLogOut;
