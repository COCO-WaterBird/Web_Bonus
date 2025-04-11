document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('books');
    const createBookForm = document.getElementById('new-book-form');
    const editBookForm = document.getElementById('edit-book-form-element');
    const createBookDiv = document.getElementById('create-book-form');
    const editBookDiv = document.getElementById('edit-book-form');
    const bookDetailsDiv = document.getElementById('book-details');
    const bookInfo = document.getElementById('book-info');
    const bookListDiv = document.getElementById('book-list');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const createBookBtn = document.getElementById('create-book-btn');

    let books = []; // Array to store books

    // Fetch books from API
    async function fetchBooks() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        books = await response.json();
        renderBooks();
    }

    // Render books in the list
    function renderBooks() {
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="book-title" data-id="${book.id}">${book.title}</span>
                <button class="edit-btn" data-id="${book.id}">Edit</button>
                <button class="delete-btn" data-id="${book.id}">Delete</button>
            `;
            bookList.appendChild(li);
        });
    }

    // Show book details
    bookList.addEventListener('click', (e) => {
        if (e.target.classList.contains('book-title')) {
            const bookId = e.target.dataset.id;
            const book = books.find(b => b.id == bookId);
            if (book) {
                bookInfo.innerHTML = `
                    <p><strong>Title:</strong> ${book.title}</p>
                    <p><strong>Author:</strong> ${book.author || 'N/A'}</p>
                    <p><strong>Editorial:</strong> ${book.editorial || 'N/A'}</p>
                    <p><strong>Edition:</strong> ${book.edition || 'N/A'}</p>
                    <p><strong>Pages:</strong> ${book.pages || 'N/A'}</p>
                    <p><strong>Topics:</strong> ${book.topics || 'N/A'}</p>
                `;
                bookDetailsDiv.style.display = 'block';
                bookListDiv.style.display = 'none';
            }
        }
    });

    // Back to book list
    backToListBtn.addEventListener('click', () => {
        bookDetailsDiv.style.display = 'none';
        bookListDiv.style.display = 'block';
    });

    // Show create book form
    createBookBtn.addEventListener('click', () => {
        createBookDiv.style.display = 'block';
        bookListDiv.style.display = 'none';
    });

    // Create a new book
    createBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newBook = {
            title: createBookForm.title.value,
            author: createBookForm.author.value,
            editorial: createBookForm.editorial.value,
            edition: createBookForm.edition.value,
            pages: createBookForm.pages.value,
            topics: createBookForm.topics.value,
        };
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });
        const createdBook = await response.json();
        books.push(createdBook);
        renderBooks();
        createBookDiv.style.display = 'none';
        bookListDiv.style.display = 'block';
    });

    // Edit a book
    bookList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const bookId = e.target.dataset.id;
            const book = books.find(b => b.id == bookId);
            if (book) {
                editBookForm.title.value = book.title;
                editBookForm.author.value = book.author;
                editBookForm.editorial.value = book.editorial;
                editBookForm.edition.value = book.edition;
                editBookForm.pages.value = book.pages;
                editBookForm.topics.value = book.topics;
                editBookForm.dataset.id = bookId;
                editBookDiv.style.display = 'block';
                bookListDiv.style.display = 'none';
            }
        }
    });

    editBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const bookId = editBookForm.dataset.id;
        const updatedBook = {
            title: editBookForm.title.value,
            author: editBookForm.author.value,
            editorial: editBookForm.editorial.value,
            edition: editBookForm.edition.value,
            pages: editBookForm.pages.value,
            topics: editBookForm.topics.value,
        };
        await fetch(`https://jsonplaceholder.typicode.com/posts/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook),
        });
        books = books.map(b => (b.id == bookId ? { ...b, ...updatedBook } : b));
        renderBooks();
        editBookDiv.style.display = 'none';
        bookListDiv.style.display = 'block';
    });

    // Delete a book
    bookList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const bookId = e.target.dataset.id;
            await fetch(`https://jsonplaceholder.typicode.com/posts/${bookId}`, {
                method: 'DELETE',
            });
            books = books.filter(b => b.id != bookId);
            renderBooks();
        }
    });

    fetchBooks();
});

document.addEventListener('DOMContentLoaded', () => {
    const bookListDiv = document.getElementById('book-list');
    const createBookDiv = document.getElementById('create-book-form');
    const editBookDiv = document.getElementById('edit-book-form');
    const backToMainFromCreate = document.getElementById('back-to-main-from-create');
    const backToMainFromEdit = document.getElementById('back-to-main-from-edit');

    // Handle "Back to Main" from Create Book Form
    backToMainFromCreate.addEventListener('click', () => {
        createBookDiv.style.display = 'none';
        bookListDiv.style.display = 'block';
    });

    // Handle "Back to Main" from Edit Book Form
    backToMainFromEdit.addEventListener('click', () => {
        editBookDiv.style.display = 'none';
        bookListDiv.style.display = 'block';
    });
});