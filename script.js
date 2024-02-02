//DOM capture
const bodyElement = document.getElementsByTagName("body");
const addBookBtns = document.querySelectorAll("#add-book-btn");
const addBookMenu = document.getElementById("add-book-menu");
const addBookEnterBtn = document.getElementById("add-book-enter-button");
const exitAddBookBtn = document.getElementById("add-book-exit-button");
const bookContainer = document.getElementById("book-container");

const title = document.getElementById("title-input");
const titleError = document.getElementById("title-error");
const author = document.getElementById("author-input");
const authorError = document.getElementById("author-error");
const pages = document.getElementById("num-pages-input");
const pagesError = document.getElementById("num-pages-error");

//Event listeners
addBookBtns.forEach((btn) => {
  btn.addEventListener("click", displayAddBookMenu);
});
exitAddBookBtn.addEventListener("click", exitAddBookMenu, false);

title.addEventListener("input", (event) => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.classList = "error";
  } else {
    showInputError();
  }
});

author.addEventListener("input", (event) => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.classList = "error";
  } else {
    showInputError();
  }
});

pages.addEventListener("input", (event) => {
  if (pages.validity.valid) {
    pagesError.textContent = "";
    pagesError.classList = "error";
  } else {
    showInputError();
  }
});

addBookEnterBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    !title.validity.valid ||
    !author.validity.valid ||
    !pages.validity.valid
  ) {
    showInputError();
  } else if (checkIfBookExists(title.value, author.value)) {
    showInputError();
  } else {
    createBookEntry(event);
    exitAddBookMenu(event);
  }
});

//DOM manipulation functions
function displayAddBookMenu() {
  addBookMenu.setAttribute("style", "visibility: visible;");
}

function exitAddBookMenu(event) {
  event.preventDefault();
  addBookMenu.setAttribute("style", "visibility: hidden;");
  clearInputFields();
  clearErrors();
}

//Book classes and functions
class Book {
  constructor(title, author, pages, read, bookId) {
    this.title = title;
    this.author = author;
    this.page = Number(pages);
    this.read = read;
    this.bookId = bookId;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

const library = [];

function addBookToLibrary(title, author, pages, read, bookId) {
  library.push(new Book(title, author, pages, read, bookId));
}

function createBookEntry(event) {
  event.preventDefault();

  let read = document.getElementById("read-input").checked;
  let bookId = library.length;

  addBookToLibrary(title.value, author.value, pages.value, read, bookId);
  generateBookWidget(title.value, author.value, pages.value, read, bookId);
}

function removeBookEntry(event) {
  const id = event.target.id;
  const correspondingWidget = document.getElementById(`book-id-${id}`);
  correspondingWidget.remove();
  library[id] = null;
}

function checkIfBookExists(title, author) {
  for (let i = 0; i < library.length; i++) {
    if (library[i] === null) {
      continue;
    } else if (
      library[i].title.toLowerCase() === title.toLowerCase() &&
      library[i].author.toLowerCase() === author.toLowerCase()
    ) {
      return true;
    }
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
  title.value = "";
  author.value = "";
  pages.value = "";
  document.getElementById("read-input").checked = false;
}

function clearErrors() {
  titleError.textContent = "";
  titleError.classList = "error";
  authorError.textContent = "";
  authorError.classList = "error";
  pagesError.textContent = "";
  pagesError.classList = "error";
}

function generateBookWidget(title, author, pages, read, id) {
  const attArr = [title, author, pages];
  const attName = ["", "by ", "Pages: "];
  const bookWidget = document.createElement("div");
  bookWidget.setAttribute("class", "book-widget");
  bookWidget.setAttribute("id", `book-id-${id}`);
  attArr.forEach((att, index) => {
    let info = document.createElement("p");
    info.innerText = attName[index] + att;
    bookWidget.appendChild(info);
  });

  //creates toggleable isRead button
  const isReadButton = document.createElement("button");
  if (read === false) {
    isReadButton.innerText = "Not read";
    isReadButton.setAttribute("style", "background-color: rgb(228, 110, 139);");
  } else {
    isReadButton.innerText = "Read";
    isReadButton.setAttribute("style", "background-color: rgb(87, 184, 87);");
  }
  isReadButton.addEventListener("click", function () {
    const buttonColor = isReadButton.getAttribute("style");
    if (buttonColor === "background-color: rgb(87, 184, 87);") {
      isReadButton.innerText = "Not read";
      isReadButton.setAttribute(
        "style",
        "background-color: rgb(228, 110, 139);"
      );
      toggleIsRead(id);
    } else {
      isReadButton.innerText = "Read";
      isReadButton.setAttribute("style", "background-color: rgb(87, 184, 87);");
      toggleIsRead(id);
    }
  });
  bookWidget.append(isReadButton);

  //remove book button
  const removeBookButton = document.createElement("button");
  removeBookButton.setAttribute("class", "remove-book-btn");
  removeBookButton.innerText = "Remove";
  removeBookButton.setAttribute("id", `${id}`);
  bookWidget.append(removeBookButton);
  removeBookButton.addEventListener("click", removeBookEntry);

  displayBookWidget(bookWidget);
}

function displayBookWidget(widget) {
  addBookBtns[1].remove();
  bookContainer.appendChild(widget);
  bookContainer.appendChild(addBookBtns[1]);
}

function showInputError() {
  titleError.textContent = "";
  titleError.classList = "error";
  authorError.textContent = "";
  authorError.classList = "error";
  pagesError.textContent = "";
  pagesError.classList = "error";

  if (title.validity.valueMissing) {
    titleError.textContent = "Please enter a title";
    titleError.classList = "error active";
  } else if (checkIfBookExists(title.value, author.value)) {
    titleError.textContent = "Book exists";
    titleError.classList = "error active";
  }

  if (author.validity.valueMissing) {
    authorError.textContent = "Please enter an author";
    authorError.classList = "error active";
  }

  if (pages.validity.valueMissing) {
    pagesError.textContent = "Please enter page quantity";
    pagesError.classList = "error active";
  }
}
