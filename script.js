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
    clearInputFields();
}

//Book classes and functions
function Book(title, author, pages, read, bookId) {
    this.title = title;
    this.author = author;
    this.page = Number(pages);
    this.read = read;
    this.bookId = bookId;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

const library =[];

function addBookToLibrary(title, author, pages, read, bookId) {
    library.push(new Book(title, author, pages, read, bookId))
}

function createBookEntry(event) {
    event.preventDefault();
    let title = document.getElementById('title-input').value;
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('num-pages-input').value;
    let read = document.getElementById('read-input').checked;
    let bookId = library.length;

    if (validateInputs(title, author, pages)) {
        if (!checkIfBookExists(title, author)){
            addBookToLibrary(title, author, pages, read, bookId);
            exitAddBookMenu(event);
            generateBookWidget(title, author, pages, read, bookId);
            clearInputFields();
        } else {
            alert('Book entry exists!')
        }
    }
}

function removeBookEntry(event) {
    const id = event.target.id;
    const correspondingWidget = document.getElementById(`book-id-${id}`)
    correspondingWidget.remove()
    library[id] = null;
}

function checkIfBookExists(title, author) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title.toLowerCase() === title.toLowerCase() &&
            library[i].author.toLowerCase() === author.toLowerCase()) {
                return true
            }
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

function toggleIsRead(id) {
    if (library[id].read === true) {
        library[id].read = false;
    } else {
        library[id].read = true;
    }
}

function clearInputFields() {
    document.getElementById('title-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('num-pages-input').value = '';
    document.getElementById('read-input').checked = false;
}

function generateBookWidget(title, author, pages, read, id) {
    const attArr = [title, author, pages];
    const attName = ['', 'by ', 'Pages: '];
    const bookWidget = document.createElement('div');
    bookWidget.setAttribute('class', 'book-widget');
    bookWidget.setAttribute('id', `book-id-${id}`);
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
            toggleIsRead(id);
        } else {
            isReadButton.innerText = 'Read';
            isReadButton.setAttribute('style', 'background-color: rgb(87, 184, 87);')
            toggleIsRead(id);
        }
    });
    bookWidget.append(isReadButton);

    //remove book button
    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('class', 'remove-book-btn');
    removeBookButton.innerText = 'Remove';
    removeBookButton.setAttribute('id', `${id}`)
    bookWidget.append(removeBookButton);
    removeBookButton.addEventListener('click', removeBookEntry)

    displayBookWidget(bookWidget);
}

function displayBookWidget(widget) {
    addBookBtns[1].remove();
    bookContainer.appendChild(widget);
    bookContainer.appendChild(addBookBtns[1])
}