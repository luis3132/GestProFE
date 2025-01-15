import { usuario } from "../types/types"
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const Comprobar = () => {
    let usuario: usuario = {} as usuario;
    const token: string | undefined = Cookies.get("authToken");

    const cryp: string | null = sessionStorage.getItem("usuario");

    if (cryp) {
        const usuariosStringBytes = CryptoJS.AES.decrypt(cryp, process.env.NEXT_PUBLIC_SECRETKEY as string);

        const usuarioString: string = usuariosStringBytes.toString(CryptoJS.enc.Utf8);

        usuario = JSON.parse(usuarioString);
    }


    return ({ token, usuario });
}

export default Comprobar;