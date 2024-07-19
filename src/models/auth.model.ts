// interfaces para realizar la petición y obtener la respuesta al momento de loguear (iniciar sesión) de un usuario.

// para conocer cómo estructurar las interfaces, ir a la documentación de la API.

export interface BodyRequestLogin { // interface de la petición - requerimiento (está en la documentación de la API).
    email : string,
    password : string
}

export interface BodyResponseLogin { // interface de la respuesta (es la forma en la que se nos entregará la información reuquerida por parte de la API).
    message : string,
    data : Record <string, string> // 'data' debe ser tipado como 'Record' (clave - valor).
}

