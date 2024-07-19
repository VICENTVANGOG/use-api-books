// interface para obtener la respuesta de la petición 'GET'.

export interface BodyResponseGetAllBooks { // interface con la respuesta al conectar con la API y realizar exitosamente la conexión.
    message: string;
    data:    Datum[];
}

export interface Datum { // interface para el objeto que continene la información de 'Datum'.
    id:              string;
    title:           string;
    author:          string;
    description:     string;
    summary:         string;
    publicationDate: Date;
    createdBy:       string;
    updatedBy:       null;
    deletedBy:       null;
    createdAt:       Date;
    updatedAt:       Date;
    deletedAt:       null;
    files:           any[];
}

export interface BodyRequestCreateBook{ // interface con la información para realizar la petición para crear un libro. 
    title : string,
    author : string,
    description : string,
    summary : string,
    publicationDate : string 
}

export interface BodyResponseCreateBook { // interface para obetener la información del libro que fue creado.
    message : string,
    data : Record <string, string>
}


export interface BodyResponseGetById {
menssage : string
data :Record <string, string>

} 

export interface BodyRequestUpdateBook {
    title : string,
    author : string,
    description : string,
    summary : string,
    publicationDate : string
}


export interface BodyResponseUpdateBook {
    message : string,
    data : Record <string, string>
}


export interface BodyResponseDeleteBook {
    message : string,
    data : null
}
