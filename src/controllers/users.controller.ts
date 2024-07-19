import { BodyRequestLogin, BodyResponseLogin } from "../models/auth.model"; // las interfaces no se transpilan (no se debe poner '.js' al finalizar el enrutamiento). 

export class UsersController { // se crea la clase 'CrudUsers' donde se almacenan...

    public domain : string; // variable que necesita la clase para poder funcionar a la hora de instanciarla. 

    constructor (domain : string) {
        this.domain = domain;
    }

    async login(email : HTMLInputElement, password : HTMLInputElement) : Promise <BodyResponseLogin> { // función para loguear un usuario. Retorna la interface 'BodyResponseLogin'.
        const userData : BodyRequestLogin = { // la información que se enviará corresponde a la interface 'BodyRequestLogin'.
            email : email.value,
            password : password.value
        }

        const headers : Record <string, string> = { // los header (-H) se obtienen en la documentación de la API. 
            'accept' : '*/*',
            'Content-Type' : 'application/json'
        }

        const requestOptions : RequestInit = { // objeto con la información que se enviará a la API implementando una petición HTTP. Método 'POST' para loguearse.
            method : 'POST',
            headers : headers,
            body : JSON.stringify(userData) // 'JSON.stringify' envía el objeto con la información en formato JSON.
        }

        const response : Response = await fetch(`${this.domain}/api/v1/auth/login`, requestOptions); // conexión con la URL de la API y su endpoint (auth/login). Se le envía el requerimiento (requestOptions).

        if (!response.ok) { // condición que verifica si la conexión fue exitosa o no. 
            console.log(`response body: ${((await response.json()).message)}`); // 'response.json()' devuelve un objeto con la información obtenida de la API y '.message' trae la información de esa propiedad.
            throw new Error(`error: ${response.status} ${response.statusText}`); // 'throw new Error' permite generar y captutar un mensaje en caso de error (de conexión).
        }

        const responseBodyLogin : BodyResponseLogin = await response.json(); // se obtiene la información esperada por la API y se transforma a código.
        
        return responseBodyLogin;

    }
}