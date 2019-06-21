const express = require('express')
const router = express.Router()
const Book = require('../models').Book

router.get('/', (req,res) => {
    Book.findAll()
    .then((books) => res.render('books/index', { books, title: 'Book Library' }))
})

router.get('/new', (req, res) => {
    res.render('books/new-book', { book: {}, title: 'New Book' })
})

//CREATE →	
router.post('/new', (req, res) => {
    Book.create(req.body)
    .then(() => res.redirect('/books/'))
})

//READ 
router.get('/:id', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => res.render('books/update-book', { book, title: 'Update Book' }))
})

//UPDATE
router.post('/:id', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => book.update(req.body))
    .then(() => res.redirect('/books/'))
})

//DELETE
router.post('/:id/delete', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => book.destroy())
    .then(() => res.redirect('/books/'))
})

module.exports = router