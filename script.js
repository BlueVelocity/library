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