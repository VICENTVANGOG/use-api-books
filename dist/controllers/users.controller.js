var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                email: email.value,
                password: password.value
            };
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application/json'
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(userData) // 'JSON.stringify' envía el objeto con la información en formato JSON.
            };
            const response = yield fetch(`${this.domain}/api/v1/auth/login`, requestOptions); // conexión con la URL de la API y su endpoint (auth/login). Se le envía el requerimiento (requestOptions).
            if (!response.ok) { // condición que verifica si la conexión fue exitosa o no. 
                console.log(`response body: ${((yield response.json()).message)}`); // 'response.json()' devuelve un objeto con la información obtenida de la API y '.message' trae la información de esa propiedad.
                throw new Error(`error: ${response.status} ${response.statusText}`); // 'throw new Error' permite generar y captutar un mensaje en caso de error (de conexión).
            }
            const responseBodyLogin = yield response.json(); // se obtiene la información esperada por la API y se transforma a código.
            return responseBodyLogin;
        });
    }
}
