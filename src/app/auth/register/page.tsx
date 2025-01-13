"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-dvh w-full bg-green-500 overflow-y-scroll custom-scrollbar">
        <div className="h-inherit flex max-md:flex-col justify-around items-center ">
          <div className="max-md:hidden flex max-lg:flex-col justify-center items-center">
            <div className="flex flex-col items-center md:mr-10">
              <h1 className="text-white text-7xl font-bold">GestPro</h1>
              <p className="text-white text-xl font-bold">Optimiza tu inventario, maximiza tu éxito</p>
            </div>
            <div className="rounded-2xl shadow-xl overflow-hidden">
              <Image src="/gestpro.webp" alt="GestPro" width={200} height={200} />
            </div>
          </div>
          <div className="md:hidden w-full flex justify-around items-center pb-2">
            <div className="rounded-2xl shadow-xl overflow-hidden my-3">
              <Image src="/gestpro.webp" alt="GestPro" width={100} height={100} />
            </div>
            <div className="flex flex-col items-center md:mr-10">
              <h1 className="text-white text-5xl font-bold">GestPro</h1>
              <p className="text-white text-sm font-semibold">Optimiza tu inventario, maximiza tu éxito</p>
            </div>
          </div>
          <div className="max-md:pb-8 max-md:w-full flex justify-center">
            <form className="bg-white px-8 pt-8 pb-4 rounded-lg shadow-xl w-[90%] md:w-[500px]">
              <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">
                  Cédula
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cedula"
                  type="text"
                  placeholder="Cédula"
                />
              </div>
              <div className="flex max-md:flex-col justify-between">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Nombres
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="Nombres"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Apellidos
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              <div className="flex max-md:flex-col justify-between">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Nombre de Usuario
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Nombre de Usuario"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Teléfono
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Teléfono"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Dirección
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  type="text"
                  placeholder="Dirección"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Validar Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  type="button"
                  onClick={() => alert('Registrarse')}>
                  <Icon icon="mdi:register" width="24" height="24" className="font-bold mr-1" />
                  Registrarse
                </button>
                <Link className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  href={"/auth/login"}>
                  <Icon icon="material-symbols:login" className="font-bold mr-1" width="24" height="24" />
                  Iniciar Sesión
                </Link>
              </div>
              <div className="flex justify-center p-2">
                <Link href={"/"} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                  <Icon icon="line-md:cancel-twotone" className="font-bold mr-1" width="24" height="24" />
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
