


const modalBtnShow = document.getElementById('show-modal');
const modalBtnAddBook = document.getElementById('add-book-btn');
const modalBtnHide = document.getElementById('cancel-add-book');
const modal = document.getElementById('add-book-modal');
const libraryRoot = document.getElementById('library-root');

const Library = () => {
    let myLibrary = localStorage.library ? JSON.parse(localStorage.library) : [];

    const addBookToLibrary = () => {
        let bookName = document.getElementById('modal-name'),
        bookAuthor = document.getElementById('modal-author'),
        readStatus = document.getElementById('modal-read');
        let book = new Book(bookName.value, bookAuthor.value, readStatus.value);
        myLibrary = [
            ...myLibrary, 
            book,
        ]
        hideAddBookModal();
        render();
        localStorage.library = JSON.stringify(myLibrary);
        bookName.value = '';
        bookAuthor.value = '';
        readStatus.value = '';
    };

    const removeBookFromLibrary = (id) => {
        console.log(id);
        myLibrary = myLibrary.filter(item =>{
            console.log(item);
            return item.id != id;
        })
        render();
        localStorage.library = JSON.stringify(myLibrary);
    };
    const getLibrary = () => {
        return myLibrary;
    };
    return {
        removeBookFromLibrary,
        addBookToLibrary,
        getLibrary,
    }
}
myLibrary = Library();
modalBtnShow.addEventListener('click', showAddBookModal);
modalBtnHide.addEventListener('click', hideAddBookModal);
modalBtnAddBook.addEventListener('click', myLibrary.addBookToLibrary);

function Book(bookName, bookAuthor, readStatus) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.readStatus = readStatus === '+' ? true : false ;
    this.id = new Date().getTime();
}

function showAddBookModal() {
    modal.classList.add('active');
}

function hideAddBookModal() {
    modal.classList.remove('active');
}

function render() {
    libraryRoot.innerHTML = '';
    for (book of myLibrary.getLibrary()) {
        renderBook(book);
    }
    
}

function renderBook({bookName, bookAuthor, readStatus, id}) {
    let book = document.createElement('div');
    book.classList = "book";
    book.setAttribute('meta-id', id);

    let bookInfo = document.createElement('div');
    bookInfo.classList = 'book__info';
    bookInfo.innerHTML = `
            <h3 class="book__name">${bookName}</h3>
            <h4 class="book__author">${bookAuthor}</h4>
            <span class="book__status">${readStatus ? 'Прочитана': 'Не прочитана'}</span>
        `;
    let btnRemoveBook = document.createElement('button');
    btnRemoveBook.classList = 'book__delete';
    btnRemoveBook.textContent = 'Удалить';

    btnRemoveBook.addEventListener('click', (el) => {
        let book = el.target.closest('.book');
        myLibrary.removeBookFromLibrary(book.getAttribute('meta-id'));
    });
    

    libraryRoot.append(book);
    book.append(bookInfo);
    book.append(btnRemoveBook);
}

render();

