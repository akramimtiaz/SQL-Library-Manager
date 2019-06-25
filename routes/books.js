const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Book = require('../models').Book
const determineQueryType = require('./misc/determineQueryType')
const determineValidationError = require('./misc/determineValidationError')

//GET books listing
router.get('/', (req,res) => {
    Book.findAll()
    .then((books) => {
        res.render('books/index', { books, title: 'Library', search: {} })
    })
    .catch(error => res.status(500).send(error))
})

//Create a new book form
router.get('/new', (req, res) => {
    res.render('books/new-book', { book: {}, title: 'New Book' })
})

//SEARCH for a book
router.post('/search', (req, res) => {
    const search = req.body
    const where = determineQueryType(search.query, search.field)

    search.occurred = true

    Book.findAll({where})
    .then(books => res.render('books/index', { books, title: 'Search Results', search }))
    .catch(error => res.status(500).send(error))
})

//POST create a new book
router.post('/new', (req, res) => {
    Book.create(req.body)
    .then(() => res.redirect('/books/'))
    .catch(error => {
        if(error.name === 'SequelizeValidationError'){
            const err = determineValidationError(error)
            res.render('books/new-book', { book: Book.build(req.body), errors: err, title: 'New Book'})
        } else {
            throw error
        }
    })
    .catch(error => res.status(500).send(error))
})

//GET an individual book
router.get('/:id', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => {
        if(book){
            res.render('books/update-book', { book, title: 'Update Book' })
        }else {
            res.status(404).render('books/error')
        }
    })
    .catch(error => res.status(500).send(error))
})

//UPDATE an individual book
router.post('/:id', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => {
        if(book) {
            return book.update(req.body)
        }else{
            res.status(404).send({error: 'Not Found'})
        }
    })
    .then(() => res.redirect('/books/'))
    .catch(error => {
        if(error.name === 'SequelizeValidationError'){
            const err = determineValidationError(error)
            const book = Book.build(req.body)
            book.id = id
            res.render('books/update-book', {book, errors: err, title: 'Update Book'})
        } else {
            throw error
        }
    })
    .catch(error => res.status(500).send(error))
})

//DELETE an individual book
router.post('/:id/delete', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => {
        if(book){
            return book.destroy()
        } else {
            res.status(404).send({error: 'Not Found'})
        }
    })
    .then(() => res.redirect('/books/'))
    .catch(error => res.status(500).send(error))
})

module.exports = router