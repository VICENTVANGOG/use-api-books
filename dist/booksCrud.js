var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cardTemplateController } from "./controllers/cardTemplate.controllers.js";
import { BooksController } from "./controllers/books.controller.js";
const URL_BOOKS = 'http://190.147.64.47:5155';
const btnLogout = document.getElementById('btn-logout');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const token = localStorage.getItem("authtoken");
let currentPage = 1;
const limit = 10;
btnLogout.addEventListener("click", (e) => {
    localStorage.removeItem("authtoken");
    window.location.href = "index.html";
});
if (!token) {
    alert("El token de autenticación falta. Por favor, inicia sesión.");
}
else {
    const containerBooks = document.querySelector('.container-books');
    const form = document.querySelector("form");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const description = document.getElementById("description");
    const summary = document.getElementById("summary");
    const publicationDate = document.getElementById("publication-date");
    let idCache;
    const cardTemplate = new cardTemplateController(containerBooks);
    prevPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage > 1) {
            currentPage--;
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        currentPage++;
        yield allBooks(limit, currentPage);
    }));
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        const newBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value,
        };
        try {
            if (idCache == undefined) {
                yield crudBooks.create(title, author, description, summary, publicationDate, token);
            }
            else {
                yield crudBooks.update(idCache, title, author, description, summary, publicationDate, token);
                idCache = undefined;
            }
            form.reset();
            yield allBooks(limit, currentPage);
        }
        catch (error) {
            console.error("Error saving book:", error);
        }
    }));
    containerBooks.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);
            if (e.target.classList.contains("btn-warning")) {
                idCache = e.target.dataset.id;
            }
            if (idCache) {
                try {
                    const book = yield crudBooks.getById(idCache, token);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
                catch (error) {
                    console.error("Error fetching book:", error);
                }
            }
            else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;
                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete?");
                    if (confirmDelete) {
                        try {
                            yield crudBooks.delete(bookId, token);
                            yield allBooks(limit, currentPage);
                        }
                        catch (error) {
                            console.error("Error deleting book:", error);
                        }
                    }
                }
            }
        }
    }));
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = yield crudBooks.getAllBooks(token, limit, currentPage);
                const books = response.data;
                containerBooks.innerHTML = ''; // Limpiar el contenedor antes de renderizar nuevos libros
                for (const book of books) {
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                console.error("Error fetching books:", error);
            }
        });
    }
    allBooks(limit, currentPage);
}
