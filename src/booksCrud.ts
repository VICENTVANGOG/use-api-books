import { cardTemplateController } from "./controllers/cardTemplate.controllers.js";
import { BooksController } from "./controllers/books.controller.js";

const URL_BOOKS: string = 'http://190.147.64.47:5155';

const btnLogout = document.getElementById('btn-logout') as HTMLButtonElement;
const prevPage = document.getElementById('prev-page') as HTMLButtonElement;
const nextPage = document.getElementById('next-page') as HTMLButtonElement;

const token = localStorage.getItem("authtoken");

let currentPage: number = 1;
const limit: number = 10;

btnLogout.addEventListener("click", (e: Event) => {
    localStorage.removeItem("authtoken");
    window.location.href = "index.html";
});

if (!token) {
    alert("El token de autenticación falta. Por favor, inicia sesión.");
} else {
    const containerBooks = document.querySelector('.container-books') as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;

    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;

    let idCache: undefined | string;

    const cardTemplate = new cardTemplateController(containerBooks);

    prevPage.addEventListener("click", async (e: Event) => {
        if (currentPage > 1) {
            currentPage--;
            await allBooks(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (e: Event) => {
        currentPage++;
        await allBooks(limit, currentPage);
    });

    form.addEventListener("submit", async (e: Event) => {
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
                await crudBooks.create(title, author, description, summary, publicationDate, token as string);
            } else {
                await crudBooks.update(idCache, title, author, description, summary, publicationDate, token as string);
                idCache = undefined;
            }
            form.reset();
            await allBooks(limit, currentPage);
        } catch (error) {
            console.error("Error saving book:", error);
        }
    });

    containerBooks.addEventListener("click", async (e: Event) => {
        if (e.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);

            if (e.target.classList.contains("btn-warning")) {
                idCache = e.target.dataset.id;
            }

            if (idCache) {
                try {
                    const book = await crudBooks.getById(idCache, token as string);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                } catch (error) {
                    console.error("Error fetching book:", error);
                }
            } else if (e.target.classList.contains("btn-danger")) {
                const bookId = e.target.dataset.id;

                if (bookId) {
                    const confirmDelete = confirm("Are you sure you want to delete?");

                    if (confirmDelete) {
                        try {
                            await crudBooks.delete(bookId, token as string);
                            await allBooks(limit, currentPage);
                        } catch (error) {
                            console.error("Error deleting book:", error);
                        }
                    }
                }
            }
        }
    });

    async function allBooks(limit: number, currentPage: number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try {
            const response = await crudBooks.getAllBooks(token as string, limit, currentPage);
            const books = response.data;

            containerBooks.innerHTML = ''; // Limpiar el contenedor antes de renderizar nuevos libros
            for (const book of books) {
                cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    allBooks(limit, currentPage);
}
