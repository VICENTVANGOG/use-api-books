import { BodyResponseDeleteBook,BodyResponseGetAllBooks,BodyResponseGetById, BodyRequestCreateBook, BodyResponseCreateBook,BodyResponseUpdateBook,BodyRequestUpdateBook } from "../models/books.model"; // se importa la interface correspondiente a la respuesta para obtener los libros almacenados en la API.

export class BooksController { 

    public domain : string;

    constructor (domain : string) {
        this.domain = domain;
    }

    async getAllBooks(token : string, limit : number, page : number) : Promise <BodyResponseGetAllBooks> { // función para obtener los libros almacenados en la API. 'limit' y 'page' -> corresponden a la paginación.

        const headers : Record <string, string> = { // headers correspondientes a la petición 'GET' para acceder a los libros.
        'accept' : '*/*',
        'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = { // objeto con la información necesaria para realizar la petición.
            method : 'GET',
            headers : headers,
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOptions) // '?limit=${limit}&page=${page}' corresponden a la sintaxis para escribir los query params de la paginación. ? -> query param & -> para añadir un nuevo query param. 

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const bodyResponseGetAllBooks : BodyResponseGetAllBooks = await response.json(); // se transforma la respuesta obtenida a código, implementando la interface 'BodyResponseGetAllBooks'.

        return bodyResponseGetAllBooks;
    }

    async createBook(title : HTMLInputElement, author : HTMLInputElement, description : HTMLInputElement, summary : HTMLInputElement, publicationDate : HTMLInputElement, token : string) : Promise <BodyResponseCreateBook> { // función para crear un nuevo libro.

        const newBook : BodyRequestCreateBook = { // body (objeto) con la información necesaria para crear un nuevo libro.
            title : title.value,
            author : author.value,
            description : description.value,
            summary : summary.value,
            publicationDate : publicationDate.value
        }
        
        const headers : Record <string, string> = { // headers correspondientes a la petición 'POST' para crear los libros.
            'accept' : '*/*',
            'Content-Type' : 'application.json',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = {
            method : 'POST',
            headers : headers,
            body : JSON.stringify(newBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del nuevo libro.
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const bodyResponseCreateBook : BodyResponseCreateBook = await response.json();

        return bodyResponseCreateBook;
        
    }

    async  getById(id : string, token:string) :Promise<BodyResponseGetById> {
        const headers : Record <string, string> = { // headers correspondientes a la petición 'GET' para obtener un libro por su id.
            'accept' : '*/*',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = {
            method : 'GET',
            headers : headers,
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const BodyResponseGetById : BodyResponseGetById = await response.json();

        return BodyResponseGetById;
    }

    async update( idCache:string,title : HTMLInputElement, author : HTMLInputElement, description : HTMLInputElement, summary : HTMLInputElement, publicationDate : HTMLInputElement, token : string) : Promise <BodyResponseUpdateBook>{



        const updateBook: BodyRequestUpdateBook = { // body (objeto) con la información necesaria para crear un nuevo libro.
            title : title.value,
            author : author.value,
            description : description.value,
            summary : summary.value,
            publicationDate : publicationDate.value
        };
        
        const headers : Record <string, string> = { // headers correspondientes a la petición 'POST' para crear los libros.
            'accept' : '*/*',
            'Content-Type' : 'application.json',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = {
            method : 'POST',
            headers : headers,
            body : JSON.stringify(updateBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del nuevo libro.
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books/${idCache}`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }
        const bodyResponseUpdateBook : BodyResponseUpdateBook = await response.json();
        return bodyResponseUpdateBook;
    }

    async delete(id : string, token : string):Promise<BodyResponseDeleteBook>{

        const headers : Record <string, string> = { // headers correspondientes a la petición 'POST' para crear los libros.
            'accept' : '*/*',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = {
            method : 'DELETE',
            headers : headers,
        }
        const response : Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);
        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }
        const bodyResponseDeleteBook : BodyResponseDeleteBook = await response.json();
        return bodyResponseDeleteBook;
    }
    
    
    


}