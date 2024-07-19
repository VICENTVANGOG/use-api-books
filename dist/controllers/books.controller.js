var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    getAllBooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            const response = yield fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOptions); // '?limit=${limit}&page=${page}' corresponden a la sintaxis para escribir los query params de la paginación. ? -> query param & -> para añadir un nuevo query param. 
            if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
                console.log(response);
                throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
            }
            const bodyResponseGetAllBooks = yield response.json(); // se transforma la respuesta obtenida a código, implementando la interface 'BodyResponseGetAllBooks'.
            return bodyResponseGetAllBooks;
        });
    }
    create(title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${token}`
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del nuevo libro.
            };
            const response = yield fetch(`${this.domain}/api/v1/books`, requestOptions);
            if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
                console.log(response);
                throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
            }
            const bodyResponseCreateBook = yield response.json();
            return bodyResponseCreateBook;
        });
    }
    getById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const requestOptions = {
                method: 'GET',
                headers: headers,
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);
            if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
                console.log(response);
                throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
            }
            const BodyResponseGetById = yield response.json();
            return BodyResponseGetById;
        });
    }
    update(idCache, title, author, description, summary, publicationDate, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateBook = {
                title: title.value,
                author: author.value,
                description: description.value,
                summary: summary.value,
                publicationDate: publicationDate.value
            };
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${token}`
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(updateBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del nuevo libro.
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${idCache}`, requestOptions);
            if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
                console.log(response);
                throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
            }
            const bodyResponseUpdateBook = yield response.json();
            return bodyResponseUpdateBook;
        });
    }
    delete(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const requestOptions = {
                method: 'DELETE',
                headers: headers,
            };
            const response = yield fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);
            if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
                console.log(response);
                throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
            }
            const bodyResponseDeleteBook = yield response.json();
            return bodyResponseDeleteBook;
        });
    }
}
