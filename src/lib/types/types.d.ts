export interface usuarioLogin {
    nombrenombreUsuario: string;
    contrasena: string;
}

export interface rolEmpNuevo {
    empleado: string;
    roles: string;
}

export interface rolUsrNuevo {
    usuario: string;
    roles: string;
}

export interface roles {
    id: number;
    roles: string;
}

export interface rolEmp {
    id: {
        empleado: string;
        roles: string;
    };
    roles: roles;
}

export interface rolUsr {
    id: {
        usuario: string;
        roles: string;
    };
    roles: roles;
}

export interface empleadoNuevo {
    id: string;
    usuario: string;
    local: string;
    fechaContratado: string;
    fechaDespedido: string;
    estado: string;
    roles: rolEmpNuevo[];
}

export interface empleado {
    id: string;
    usuario: usuario;
    local: local;
    fechaContratado: string;
    fechaDespedido: string;
    estado: string;
    roles: rolEmp[];
}

export interface categoria {
    id: string;
    empresa: string;
    categoria: string;
    subcategoria: string;
}

export interface artiCateNueva {
    articulo: string;
    categoria: string;
}

export interface artiCate {
    id: {
        articulo: string;
        categoria: string;
    };
    categoria: categoria;
}

export interface articuloNuevo {
    id: string;
    nombre: string;
    descripcion: string;
    puntoReorden: number;
    empresa: string;
    caracteristicaDimensional: string;
    estado: string;
    categorias: artiCateNueva[];
}

export interface articulo {
    id: string;
    nombre: string;
    descripcion: string;
    puntoReorden: number;
    empresa: empresa;
    caracteristicaDimensional: string;
    estado: string;
    categorias: artiCate[];
}

export interface unidadNueva {
    sku: string;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    articulo: string;
    local: string;
    fechaCreacion: string;
    fechaCompra: string;
}

export interface unidad {
    sku: string;
    nombre: string;
    descripcion: string;
    precioDetal: number;
    precioMayorista: number;
    articualo: articulo;
    local: local;
    fechaCreacion: string;
    fechaCompra: string;
}

export interface localNuevo {
    id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    empresaPadre: string;
}

export interface local {
    id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    empresaPadre: empresa;
    empleados: empleado[];
    unidades: unidad[];
}

export interface planNuevo {
    nombre: string;
    precio: number;
    descripcion: string;
}

export interface planes {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
}

export interface vigenciaPlanNuevo {
    id: string;
    empresa: string;
    plan: number;
    fechaCompra: string;
    fechaFinalizacion: string;
}

export interface vigenciaPlan {
    id: string;
    empresa: empresa;
    plan: planes;
    fechaCompra: string;
    fechaFinalizacion: string;
}

export interface empresa {
    nit: string;
    nombre: string;
    dueno: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    departamento: string;
    email: string;
    estado: string;
    locales: local[];
    articulos: articulo[];
}

export interface usuarioRegister {
    cedula: string;
    nombres: string;
    apellidos: string;
    nombreUsuario: string;
    email: string;
    contrasena: string;
    direccion: string;
    telefono: string;
    estado: string;
    roles: rolUsrNuevo[];
}

export interface usuario {
    cedula: string;
    nombres: string;
    apellidos: string;
    nombreUsuario: string;
    email: string;
    contrasena: string;
    direccion: string;
    telefono: string;
    fechaCreacion: string;
    estado: string;
    roles: rolUsr[];
    empleos: empleado[];
    empresas: empresa[];
}