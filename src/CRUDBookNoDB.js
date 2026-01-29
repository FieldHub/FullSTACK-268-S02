require ("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Book1",
        author: "Author1",
    },
    {
        id: 2,
        title: "Book2",
        author: "Author2",
    },
    {
        id: 3,
        title: "Book3",
        author: "Author3",
    }
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        const updatedBook = req.body;
        books = books.map(b => b.id === bookId ? updatedBook : b);
        res.json(updatedBook);
    } else {
        res.status(404).send("Book not found");
    }
});

app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);    
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send("Book deleted");
    } else {
        res.status(404).send("Book not found");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});