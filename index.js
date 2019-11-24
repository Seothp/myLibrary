let myLibrary = [];

const modalBtnShow = document.getElementById('show-modal');
const modalBtnAddBook = document.getElementById('add-book-btn');
const modalBtnHide = document.getElementById('cancel-add-book');
const modal = document.getElementById('add-book-modal');
const libraryRoot = document.getElementById('library-root');

modalBtnShow.addEventListener('click', showAddBookModal);
modalBtnHide.addEventListener('click', hideAddBookModal);
modalBtnAddBook.addEventListener('click', addBookToLibrary);

function Book(bookName, bookAuthor, readStatus) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.readStatus = readStatus;
    this.id = new Date().getTime();
}

function showAddBookModal() {
    modal.classList.add('active');
}

function hideAddBookModal() {
    modal.classList.remove('active');
}

function addBookToLibrary() {
    const bookName = document.getElementById('modal-name').value,
    bookAuthor = document.getElementById('modal-author').value,
    readStatus = document.getElementById('modal-read').value;
    let book = new Book(bookName, bookAuthor, readStatus)
    myLibrary = [
        ...myLibrary, 
        book,
    ]
    hideAddBookModal();
    render();
}

function removeBookFromLibrary(id) {
    console.log(id);
    myLibrary = myLibrary.filter(item =>{
        console.log(item);
        return item.id != id;
    })
    render();
}

function render() {
    libraryRoot.innerHTML = '';
    for (book of myLibrary) {
        renderBook(book);
    }
    
}

function renderBook({bookName, bookAuthor, readStatus, id}) {
    let book = document.createElement('div');
    book.classList = "book";
    book.setAttribute('meta-id', id);
    
    libraryRoot.append(book);

    let bookInfo = document.createElement('div');
    bookInfo.classList = 'book__info';
    bookInfo.innerHTML = `
            <h3 class="book__name">${bookName}</h3>
            <h4 class="book__author">${bookAuthor}</h4>
            <span class="book__status">${readStatus ? 'Прочитана': 'Не прочитана'}</span>
        `;
    let btnRemoveBook = document.createElement('button');
    btnRemoveBook.classList = 'book__delete';
    btnRemoveBook.textContent = 'Удалить'

    btnRemoveBook.addEventListener('click', (el) => {
        let book = el.target.closest('.book');
        removeBookFromLibrary(book.getAttribute('meta-id'));
    })
    book.append(bookInfo);
    book.append(btnRemoveBook);
}

render();

/* <button class="book__delete">Удалить</button> */