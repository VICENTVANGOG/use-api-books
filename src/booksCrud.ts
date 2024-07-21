// Importación de controladores
import { CardTemplateController } from "./controllers/cardTemplate.controller.js";
import { BooksController } from "./controllers/books.controller.js";

// Definición de la URL del servidor de libros
const URL_BOOKS: string = "http://190.147.64.47:5155";

// Obtención del botón de logout del DOM
const btnLogout = document.getElementById("btn-logout") as HTMLButtonElement;

// Obtención de elementos del DOM para navegación entre páginas
const prevPage = document.getElementById("prev-page") as HTMLButtonElement;
const nextPage = document.getElementById("next-page") as HTMLButtonElement;

// Obtención del token de autenticación almacenado localmente
const token = localStorage.getItem("authToken");

// Inicialización de la página actual y límite de libros por página
let currentPage: number = 1;
const limit: number = 10;

// Evento click en el botón de logout
btnLogout.addEventListener("click", (e:Event) => {
    localStorage.removeItem("authToken"); // Remover token de localStorage al hacer logout
    window.location.href = "index.html"; // Redireccionar a la página de inicio de sesión
});

// Verificar si hay un token de autenticación presente
if(!token){
    alert("Authentication token is missing. Please log in."); // Alerta si falta el token de autenticación
    window.location.href = "index.html"; // Redireccionar a la página de inicio de sesión si falta el token
}else{
    // Obtención de elementos del DOM para el formulario de libros
    const containerBooks = document.querySelector(".container-books") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title = document.getElementById("title") as HTMLInputElement;
    const author = document.getElementById("author") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    const summary = document.getElementById("summary") as HTMLInputElement;
    const publicationDate = document.getElementById("publication-date") as HTMLInputElement;
    let idCatche: undefined | string; // Variable para almacenar el ID del libro seleccionado

    // Instancia del controlador para la plantilla de tarjeta de libros
    const cardTemplate = new CardTemplateController(containerBooks);

    // Evento click en el botón de página anterior
    prevPage.addEventListener("click", async (e:Event) =>  {
        if (currentPage >= 1){
            currentPage--
            await allBooks(limit, currentPage); // Llamar a la función para obtener y renderizar libros
        }
    });

    // Evento click en el botón de página siguiente
    nextPage.addEventListener("click", async (e:Event) =>  {
        if (currentPage >= 1){
            currentPage++
            await allBooks(limit, currentPage); // Llamar a la función para obtener y renderizar libros
        }
    });

    // Evento submit del formulario de libros
    form.addEventListener("submit", async (e:Event)=>{
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const crudBooks = new BooksController(URL_BOOKS); // Instancia del controlador de libros

        if(idCatche === undefined){
            await crudBooks.create(title, author, description, summary, publicationDate, token as string); // Crear un nuevo libro
        }else{
            await crudBooks.update(idCatche, title, author, description, summary, publicationDate, token as string); // Actualizar un libro existente
            idCatche = undefined; // Limpiar el ID almacenado
        }
        form.reset(); // Reiniciar el formulario
        await allBooks(limit, currentPage); // Actualizar la lista de libros después de la operación
    });

    // Evento click en el contenedor de libros para editar o eliminar libros
    containerBooks.addEventListener("click", async (e:Event)=>{
        if(e.target instanceof HTMLButtonElement){
            const crudBooks = new BooksController(URL_BOOKS); // Instancia del controlador de libros

            if(e.target.classList.contains("btn-warning")){
                idCatche = e.target.dataset.id; // Obtener el ID del libro seleccionado para edición

                if(idCatche){
                    const book = await crudBooks.getById(idCatche, token as string); // Obtener los detalles del libro
                    title.value = book.data.title; // Llenar el formulario con los detalles del libro
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            } else if (e.target.classList.contains("btn-danger")){
                let bookId = e.target.dataset.id; // Obtener el ID del libro seleccionado para eliminación

                if(bookId){
                    const confirmDelete = confirm("Are you sure you want to delete?"); // Confirmar la eliminación
                    if(confirmDelete){
                        await crudBooks.delete(bookId, token as string); // Eliminar el libro
                        idCatche = undefined; // Limpiar el ID almacenado
                        await allBooks(limit, currentPage); // Actualizar la lista de libros después de la operación
                    }
                }
            }
        }
    });

    // Función asincrónica para obtener y renderizar todos los libros
    async function allBooks(limit: number, currentPage: number){
        const crudBooks = new BooksController(URL_BOOKS); // Instancia del controlador de libros
        try{
            const response = await crudBooks.allBooks(token as string, limit, currentPage); // Obtener todos los libros
            console.log(`Respuesta de allBooks ${response}`); // Imprimir la respuesta en la consola
            const books = response.data; // Obtener los datos de los libros

            containerBooks.innerHTML = ''; // Limpiar el contenedor de libros

            for (const book of books){
                cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate); // Renderizar cada libro en la plantilla de tarjeta
            }

        } catch (error) {
            console.error("Error fetching books:", error); // Manejar errores en la obtención de libros
        }
    }

    allBooks(limit, currentPage); // Llamar a la función para obtener y renderizar libros al cargar la página
}
