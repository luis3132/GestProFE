import { usuario } from "@/lib/types/types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface PerfilProps {
    usuario: usuario | null;
}

const Perfil: FC<PerfilProps> = ({ usuario }) => {

    const [foto, setFoto] = useState<string>("/gestpro.webp");
    const [usuarioEdit, setUsuarioEdit] = useState<usuario | null>(null);

    useEffect(() => {
        if (usuario) {
            //if (usuario.fotos.length > 0) {
            //setFoto(usuario.fotos[usuario.fotos.length - 1].path);
            //}
            setUsuarioEdit(usuario);
            setFoto("/gestpro.webp");
        }
    }, [usuario]);

    const [edit, setEdit] = useState<boolean>(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleUsuarioEdit = (e: ChangeEvent<HTMLInputElement>) => {
        if (usuarioEdit) {
            setUsuarioEdit({
                ...usuarioEdit,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleCancelar = () => {
        if (usuario) {
            setUsuarioEdit(usuario);
        }
        setEdit(!edit);
    };

    return (
        <>
            <div className="w-full bg-white p-4 rounded-lg shadow-lg">
                <h1 className="text-center font-bold text-2xl">Perfil</h1>
                {edit ? (
                    <div className="w-full ">
                        <div className="w-full justify-center items-center flex">
                            <div className="w-fit rounded-2xl overflow-hidden m-5">
                                <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center ">
                            <input name="file" type="file" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">DNI:</div>
                            <input name="dni" disabled value={usuarioEdit?.cedula} id="dni" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre:</div>
                            <input name="nombres" value={usuarioEdit?.nombres} id="nombres" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Apellidos:</div>
                            <input name="apellidos" value={usuarioEdit?.apellidos} id="apellidos" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Telefono:</div>
                            <input name="telefono" value={usuarioEdit?.telefono} id="telefono" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Dirección:</div>
                            <input name="direccion" value={usuarioEdit?.direccion} id="direccion" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre usuario:</div>
                            <input name="nombre_usuario" value={usuarioEdit?.nombreUsuario} id="nombre_usuario" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Email:</div>
                            <input name="email" value={usuarioEdit?.email} id="email" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" onChange={(e) => handleUsuarioEdit(e)} ></input>
                        </div>
                        <div className="flex-row justify-center w-full flex items-center pt-2 pl-4 pr-4 pb-2">
                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" >
                                <Icon icon="ri:save-line" />
                                Guardar
                            </button>
                            <div className="w-[50%] "></div>
                            <button className="justify-center flex items-center p-1 bg-red-500 hover:bg-red-600 rounded-lg" onClick={handleCancelar}>
                                <Icon icon="line-md:cancel-twotone" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full ">
                        <div className="w-full justify-center items-center flex">
                            <div className="w-fit rounded-2xl overflow-hidden m-5">
                                <Image className="object-cover" src={foto} width={200} height={200} alt="Foto" />
                            </div>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Cedula:</div>
                            <input disabled value={usuario?.cedula} id="dnid" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre:</div>
                            <input disabled value={usuario?.nombres} id="nombred" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Apellidos:</div>
                            <input disabled value={usuario?.apellidos} id="apellidosd" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Telefono:</div>
                            <input disabled value={usuario?.telefono} id="telefonod" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Dirección:</div>
                            <input disabled value={usuario?.direccion} id="direcciond" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Nombre usuario:</div>
                            <input disabled value={usuario?.nombreUsuario} id="nombre_usuariod" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-col justify-center w-full flex items-center ">
                            <div className="text-left w-full pl-5 font-bold">Email:</div>
                            <input disabled value={usuario?.email} id="emaild" type="text" className="bg-black bg-opacity-10 rounded-full text-center w-[80%] pl-2" placeholder="" ></input>
                        </div>
                        <div className="flex-row justify-center w-full flex items-center pt-2 pb-2">
                            <button className="justify-center flex items-center p-1 bg-lime-400 hover:bg-lime-500 rounded-lg" onClick={handleEdit} >
                                <Icon icon="lucide:edit" />
                                Editar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Perfil;