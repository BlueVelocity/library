//DOM capture
const bodyElement = document.getElementsByTagName('body');
const addBookBtns = document.querySelectorAll('#add-book-btn');
const addBookMenu = document.getElementById('add-book-menu');
const exitAddBookBtn = document.getElementById('add-book-exit-button');

//Event listeners
addBookBtns.forEach((btn) => {btn.addEventListener('click', displayAddBookMenu)});

exitAddBookBtn.addEventListener('click', exitAddBookMenu, false);

//DOM objects

//DOM manipulation functions
function displayAddBookMenu() {
    addBookMenu.setAttribute('style', 'visibility: visible;')
}

function exitAddBookMenu(event) {
    addBookMenu.setAttribute('style', 'visibility: hidden;')
    event.preventDefault();
}

//Book classes and functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.page = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const library =[];

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read))
}

function displayBooks() {
    library.forEach((part) => {

    });
}

