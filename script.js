//DOM capture
const bodyElement = document.getElementsByTagName('body');
const addBookBtns = document.querySelectorAll('#add-book-btn');
const addBookMenu = document.getElementById('add-book-menu');
const addBookEnterBtn = document.getElementById('add-book-enter-button');
const exitAddBookBtn = document.getElementById('add-book-exit-button');
const bookContainer = document.getElementById('book-container')

//Event listeners
addBookBtns.forEach((btn) => {btn.addEventListener('click', displayAddBookMenu)});
addBookEnterBtn.addEventListener('click', createBookEntry);
exitAddBookBtn.addEventListener('click', exitAddBookMenu, false);

//DOM objects

//DOM manipulation functions
function displayAddBookMenu() {
    addBookMenu.setAttribute('style', 'visibility: visible;');
}

function exitAddBookMenu(event) {
    addBookMenu.setAttribute('style', 'visibility: hidden;');
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

function createBookEntry(event) {
    event.preventDefault();
    title = document.getElementById('title-input').value;
    author = document.getElementById('author-input').value;
    pages = document.getElementById('num-pages-input').value;
    read = document.getElementById('read-input').checked;

    if (validateInputs(title, author, pages)) {
        addBookToLibrary(title, author, pages, read);
        exitAddBookMenu(event);
    
        generateBookWidget(title, author, pages, read, `book-id-${library.length}`);
    }
}

function validateInputs(title, author, pages) {
    if (title === '' || author === '' || pages === '') {
        alert('Please ensure the input fields are not empty');
        return false;
    } else if (!/^[^0-9]+$/.test(author)) {
        return false;
    } else {
        return true;
    }
}

function generateBookWidget(title, author, pages, read, id) {
    const attArr = [title, author, pages];
    const attName = ['', 'by ', 'Pages: '];
    const bookWidget = document.createElement('div');
    bookWidget.setAttribute('class', 'book-widget');
    bookWidget.setAttribute('id', `${id}`);
    attArr.forEach((att, index) => {
        let info = document.createElement('p');
        info.innerText = attName[index] + att;
        bookWidget.appendChild(info)
    });

    //creates toggleable isRead button
    const isReadButton = document.createElement('button');
    if (read === false) {
        isReadButton.innerText = 'Not read';
        isReadButton.setAttribute('style', 'background-color: rgb(228, 110, 139);')
    } else {
        isReadButton.innerText = 'Read';
        isReadButton.setAttribute('style', 'background-color: rgb(87, 184, 87);')
    }
    isReadButton.addEventListener('click', function() {
        const buttonColor = isReadButton.getAttribute('style');
        if (buttonColor === 'background-color: rgb(87, 184, 87);') {
            isReadButton.innerText = 'Not read';
            isReadButton.setAttribute('style', 'background-color: rgb(228, 110, 139);')
        } else {
            isReadButton.innerText = 'Read';
            isReadButton.setAttribute('style', 'background-color: rgb(87, 184, 87);')
        }
    });
    bookWidget.append(isReadButton);

    displayBookWidget(bookWidget);
}

function displayBookWidget(widget) {
    addBookBtns[1].remove();
    bookContainer.appendChild(widget);
    bookContainer.appendChild(addBookBtns[1])
}