"use client";

import { useParams } from "next/navigation";

const EmpresaPage = () => {
    const { nit } = useParams();
    return(
        <div>
            <h1>Empresa {nit}</h1>
        </div>
    )
}

export default EmpresaPage;