import { FC, Fragment, useState } from "react"
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { empresa, localNuevo, usuario } from "@/lib/types/types";
import Swal from "sweetalert2";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Cookies from "js-cookie";

interface FloatNuevaEmpresaProps {
    closeComponent: () => void;
    usuario: usuario | null;
    update: () => void;
}

const FloatNuevaEmpresa: FC<FloatNuevaEmpresaProps> = ({ closeComponent, usuario, update }) => {
    const [isOpen, setIsOpen] = useState(true);

    const [localNuevo, setLocalNuevo] = useState<localNuevo>({
        id: "",
        ciudad: "",
        direccion: "",
        empresaPadre: "",
        nombre: "",
        telefono: "",
    });
    const [empresa, setEmpresa] = useState<empresa>({
        nit: "",
        nombre: "",
        dueno: usuario?.cedula || "",
        direccion: "",
        telefono: "",
        ciudad: "",
        departamento: "",
        email: "",
        estado: "",
        articulos: [],
        locales: []
    });
    const token: string | undefined = Cookies.get("authToken");

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.id !== "nombreLocal") {
            setEmpresa({
                ...empresa,
                [e.target.id]: e.target.value
            });
        } else {
            setLocalNuevo({
                ...localNuevo,
                nombre: e.target.value
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (empresa.nit === "" || empresa.nombre === "" || empresa.direccion === "" || empresa.telefono === "" || empresa.departamento === "" || empresa.ciudad === "" || empresa.email === "" || empresa.estado === "" || localNuevo.nombre === "") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios"
            });
        } else {
            Swal.fire({
                icon: "question",
                title: "¿Estas seguro?",
                text: "¿Deseas agregar esta nueva empresa?",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    crearEmpresa();
                }
            });
        }
    }

    const crearEmpresa = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/empresa/nueva`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                empresa: empresa,
                localNuevoDTO: localNuevo
            })
        });
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: "Empresa creada correctamente"
            }).then(() => {
                update();
                closeComponent();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al crear la empresa"
            });
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        closeComponent();
    };
    return (
        <>
            <div className="w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm z-1">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <div className="fixed inset-0 bg-black/25" />
                        </TransitionChild>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <div className={` absolute max-h-[90%] h-min top-1/2 left-1/2 transform -translate-x-1/2 overflow-y-scroll custom-scrollbar -translate-y-1/2 md:w-[30%] max-md:w-[80%] bg-white rounded-lg pb-1 `}>
                                        <button title="close" className=" float-right pr-1 pt-3" onClick={closeComponent}><Icon icon="material-symbols:close" width={30} height={30} /></button>
                                        <h1 className="text-center font-bold text-3xl pt-4">Crear Empresa</h1>
                                        <div className="w-full flex justify-center items-center">
                                            <div className="w-full p-4 rounded-lg shadow-lg">
                                                <form className="flex flex-col" onSubmit={handleSubmit}>
                                                    <label className="mb-2 font-bold">NIT</label>
                                                    <input id="nit" value={empresa.nit} type="number" className="mb-2 p-2 border rounded" placeholder="NIT" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Nombre</label>
                                                    <input id="nombre" value={empresa.nombre} type="text" className="mb-2 p-2 border rounded" placeholder="Nombre" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Dirección</label>
                                                    <input id="direccion" value={empresa.direccion} type="text" className="mb-2 p-2 border rounded" placeholder="Dirección" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Teléfono</label>
                                                    <input id="telefono" value={empresa.telefono} type="number" className="mb-2 p-2 border rounded" placeholder="Teléfono" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Departamento</label>
                                                    <input id="departamento" value={empresa.departamento} type="text" className="mb-2 p-2 border rounded" placeholder="Departamento" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Ciudad</label>
                                                    <input id="ciudad" value={empresa.ciudad} type="text" className="mb-2 p-2 border rounded" placeholder="Ciudad" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Email</label>
                                                    <input id="email" value={empresa.email} type="email" className="mb-2 p-2 border rounded" placeholder="Email" onChange={handleChanges} />

                                                    <label className="mb-2 font-bold">Estado</label>
                                                    <select id="estado" value={empresa.estado} className="mb-2 p-2 border rounded" onChange={handleChanges}>
                                                        <option value="">Seleccione</option>
                                                        <option value="ACTIVO">Activo</option>
                                                        <option value="INACTIVO">Inactivo</option>
                                                    </select>

                                                    <label className="mb-2 font-bold">Nombre del Local Principal</label>
                                                    <input id="nombreLocal" value={localNuevo.nombre} type="text" className="mb-2 p-2 border rounded" placeholder="Nombre del Local Principal" onChange={handleChanges} />
                                                    <button className="justify-center bg-green-500 text-white rounded-lg shadow-xl px-4 py-2 flex items-center font-bold hover:bg-green-600">
                                                        <Icon icon="akar-icons:check" width="24" height="24" className="mr-1" />
                                                        Crear
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default FloatNuevaEmpresa;