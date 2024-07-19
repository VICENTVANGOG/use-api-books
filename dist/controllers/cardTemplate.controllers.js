export class cardTemplateController {
    constructor(containerBooks) {
        this.containerBooks = containerBooks;
    }
    render(id, title, author, description, summary, publicationDate) {
        const figure = document.createElement("figure");
        figure.classList.add("card", "col-4");
        const h2 = document.createElement("h2");
        h2.classList.add("card-title", "tex-center");
        h2.textContent = title;
        figure.appendChild(h2);
        const h4 = document.createElement("h4");
        h4.classList.add("card-subtitle", "text-center");
        h4.textContent = author;
        figure.appendChild(h4);
        const figcaption = document.createElement("figcation");
        figcaption.classList.add("card-body", "bg-light", "text-dark");
        figure.appendChild(figcaption);
        const h5 = document.createElement("h5");
        h5.classList.add("card-title", "tex-center");
        h5.textContent = "Description";
        figcaption.appendChild(h5);
        const p = document.createElement("p");
        p.classList.add("card-text", "text-center");
        p.textContent = summary;
        figcaption.appendChild(p);
        const h6 = document.createElement("h6");
        h6.classList.add("card-subtitle", "text-center");
        h6.textContent = publicationDate;
        figcaption.appendChild(h6);
        const div = document.createElement("div");
        div.classList.add("d-flex");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.textContent = "edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.textContent = "delete";
        btnDelete.type = "button";
        btnDelete.dataset.id = id;
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
    }
}
