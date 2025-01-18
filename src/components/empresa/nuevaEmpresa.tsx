import { empresa, localNuevo, usuario } from "@/lib/types/types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { FC, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface NuevaEmpresaProps {
    usuario: usuario | null;
    update: () => void;
}

const NuevaEmpresa: FC<NuevaEmpresaProps> = ({ usuario, update }) => {

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
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al crear la empresa"
            });
        }
    };

    return (
        <>
            <div className="w-full flex justify-center min-h-[79dvh] items-center">
                <div className="md:w-1/3 w-3/4 bg-white p-4 rounded-lg shadow-lg">
                    <h1 className="text-center font-bold text-xl">Crear Empresa</h1>
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
        </>
    )
};

export default NuevaEmpresa;