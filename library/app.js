const myLibrary = [];

// DOM ELements

const tableEl = document.querySelector('table');
const closeModalEl = document.querySelector('.close');
const modalEl = document.querySelector('.modal');
const addBookBtn = document.querySelector('.add-book');
const bookSubmitBtn = document.querySelector('.book-submit');
const formEl = modalEl.querySelectorAll('.book-info');

// Function

const hideModal = function () {
  tableEl.classList.remove('hidden');
  modalEl.classList.add('hidden');
};

const showModal = function () {
  tableEl.classList.add('hidden');
  modalEl.classList.remove('hidden');
};

const clearFormValues = function () {
  formEl.forEach((el) => (el.value = ''));
};

const addBookToLibrary = function (book) {
  myLibrary.push(book);
};

const createMarkup = function () {
  let html = ``;
  myLibrary.forEach((el, i) => {
    html += `<tr data-index=${i}>
      <td>${i + 1}</td>
      <td>${el.title}</td>
      <td>${el.author}</td>
      <td>${el.numPages}</td>
      <td>${el.isRead ? 'Yes' : 'No'}</td>
      <td><i class="fa-solid fa-trash"></i></td>
    </tr>`;
  });

  return html;
};

const renderMarkup = function (markup) {
  const tbody = tableEl.querySelector('tbody');
  tbody.innerHTML = '';
  tbody.insertAdjacentHTML('afterbegin', markup);
};

const Book = function (title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numPages}`;
};

const book1 = new Book(
  'Harry Portter & the Philosopher Stone',
  'JK Rowling',
  295,
  true
);
addBookToLibrary(book1);
const book2 = new Book('Atomic Habit', 'James Clear', 288, false);
addBookToLibrary(book2);

tableEl.addEventListener('click', function (e) {
  if (e.target.localName === 'i') {
    const tableRow = e.target.closest('tr');
    const index = tableRow.dataset.index;
    myLibrary.splice(index, 1);
    renderMarkup(createMarkup());
  }
});

let markup = createMarkup();
renderMarkup(markup);

closeModalEl.addEventListener('click', hideModal);

addBookBtn.addEventListener('click', showModal);

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const values = [];
  formEl.forEach((el) => values.push(el.value));
  const book = new Book(...values);
  addBookToLibrary(book);
  clearFormValues();
  hideModal();
  renderMarkup(createMarkup());
});
