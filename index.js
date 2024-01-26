"use strict";
const submitBtn = document.querySelector('#formSubmitBtn');
const deleteBtn = document.querySelector('.book-delete-btn');

submitBtn.addEventListener('click', () => {
    getNewBook();
});

deleteBtn.addEventListener('click', (event) => {
    removeBookFromLibrary(event);
});


let library = [
    {
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        pages: 423,
        status: "Read",
    },
];

function getNewBook() {
    const bookName = document.querySelector('#bookName');
    const authorName = document.querySelector('#authorName');
    const pages = document.querySelector('#pages');
    const bookStatus = document.querySelector('#bookStatus');
    if (bookName.value.trim() && authorName.value.trim() && pages.value.trim()) {
        library.push(new Book(bookName.value, authorName.value, pages.value, bookStatus.value));
        displayBooks();
        updateLibraryInfo();
        resetInputs(bookName, authorName, pages);
    } else {
        alert('Please fill in all inputs');
    }
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.status = status;
}

function displayBooks() {
    const tableBody = document.querySelector('tbody');
    resetTableBody(tableBody);
    for (let i = 0; i < library.length; i++) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute("data-book-num", `${i}`);
        const dataName = document.createElement('td');
        dataName.textContent = library[i].title;
        const dataAuthor = document.createElement('td');
        dataAuthor.textContent = library[i].author;
        const dataPages = document.createElement('td');
        dataPages.textContent = library[i].pages;
        const dataStatus = document.createElement('td');
        dataStatus.textContent = library[i].status;
        const dataButtonContainer = document.createElement('td');
        const dataDeleteBtn = document.createElement('button');
        dataDeleteBtn.textContent = "Delete";
        dataDeleteBtn.setAttribute("class", "book-delete-btn");
        dataDeleteBtn.addEventListener('click', (event) => {
            removeBookFromLibrary(event);
        });
        tableRow.appendChild(dataName);
        tableRow.appendChild(dataAuthor);
        tableRow.appendChild(dataPages);
        tableRow.appendChild(dataStatus);
        dataButtonContainer.appendChild(dataDeleteBtn);
        tableRow.appendChild(dataButtonContainer);
        tableBody.appendChild(tableRow);
    }
}

function resetTableBody(tableBody) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function updateLibraryInfo() {
    const totalBooksElement = document.querySelector('#totalBooks');
    const completedBooksElement = document.querySelector('#completedBooks');
    const totalPagesElement = document.querySelector('#totalPages');
    let totalBooks = library.length;
    let completedBooks = 0;
    let totalPages = 0;
    for (let i = 0; i < library.length; i++) {
        if (library[i].status === 'Read') {
            completedBooks++;
        }
        totalPages += library[i].pages;
    }
    totalBooksElement.textContent = totalBooks;
    completedBooksElement.textContent = completedBooks;
    totalPagesElement.textContent = totalPages;
}

function resetInputs(bookName, bookPages, bookAuthor) {
    bookName.value = '';
    bookPages.value = '';
    bookAuthor.value = '';
}

function removeBookFromLibrary(event) {
    const trElement = event.target.parentElement.parentElement;
    const firstTdElement= trElement.querySelector('td')
    if (confirm(`Are you sure you want to delete ${firstTdElement.textContent}`)) {
        const deletedBookNum = Number(trElement.getAttribute('data-book-num'));
        library.splice(deletedBookNum, 1);
        displayBooks();
        updateLibraryInfo();
    }
}

updateLibraryInfo();