"use client";

import { token, usuarioRegister } from "@/lib/types/types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

export default function Home() {

  const [usuario, setUsuario] = useState<usuarioRegister>({
    cedula: "",
    nombres: "",
    apellidos: "",
    nombreUsuario: "",
    email: "",
    contrasena: "",
    direccion: "",
    telefono: "",
    estado: "ACTIVO",
    roles: [
      {
        roles: 1,
        usuario: ""
      }
    ]
  });
  const [confirmContrasena, setConfirmContrasena] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "cedula") {
      setUsuario({ ...usuario, cedula: e.target.value });
    }
    if (e.target.id === "confirmContrasena") {
      setConfirmContrasena(e.target.value);
    } else {
      setUsuario({ ...usuario, [e.target.id]: e.target.value });
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usuario.nombres === "" || usuario.apellidos === "" || usuario.nombreUsuario === "" || usuario.email === "" || usuario.contrasena === "" || usuario.direccion === "" || usuario.telefono === "" || confirmContrasena === "") {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios",
        icon: "error"
      });
    } else if (usuario.contrasena !== confirmContrasena) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error"
      });
    } else {
      registerUser();
    }
  }

  const registerUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
    if (response.ok) {
      const data: token = await response.json();
      Cookies.set("authToken", data.token);
      sessionStorage.clear();
      window.location.href = "/routes";
    } else {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error, por favor intente de nuevo",
        icon: "error"
      });
    }
  }

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
            <form className="bg-white px-8 pt-8 pb-4 rounded-lg shadow-xl w-[90%] md:w-[500px]" id="registerForm" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">
                  Cédula
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cedula" type="number" placeholder="Cédula" maxLength={10} onChange={handleChange} />
              </div>
              <div className="flex max-md:flex-col justify-between">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Nombres
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombres" type="text" placeholder="Nombres" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Apellidos
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="apellidos" type="text" placeholder="Apellidos" onChange={handleChange} />
                </div>
              </div>
              <div className="flex max-md:flex-col justify-between">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Nombre de Usuario
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombreUsuario" type="text" placeholder="Nombre de Usuario" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Teléfono
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="telefono" type="number" placeholder="Teléfono" onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email" type="email" placeholder="Email" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Dirección
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="direccion" type="text" placeholder="Dirección" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  minLength={8} maxLength={20}
                  id="contrasena" type="password" placeholder="********" onChange={handleChange} />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Validar Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  minLength={8} maxLength={20}
                  id="confirmContrasena" type="password" placeholder="********" onChange={handleChange} />
              </div>
              <div className="flex items-center justify-between">
                <Link className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-1 md:px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  href={"/auth/login"}>
                  <Icon icon="material-symbols:login" className="font-bold mr-1" width="24" height="24" />
                  Iniciar Sesión
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  type="submit" form="registerForm">
                  <Icon icon="mdi:register" width="24" height="24" className="font-bold mr-1" />
                  Registrarse
                </button>
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
