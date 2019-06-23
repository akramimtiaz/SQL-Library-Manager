const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Book = require('../models').Book
const determineQueryType = require('./misc/determineQueryType')

router.get('/', (req,res) => {
    Book.findAll()
    .then((books) => res.render('books/index', { books, title: 'Book Library', search: {} }))
    .catch(error => res.send(500, error))
})

router.get('/new', (req, res) => {
    res.render('books/new-book', { book: {}, title: 'New Book' })
})

//SEARCH
router.post('/search', (req, res) => {
    const search = req.body
    const where = determineQueryType(search.query, search.field)

    search.occurred = true

    Book.findAll({where})
    .then(books => {
        res.render('books/index', { books, title: 'Search Results', search })
    })
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
    .catch(error => res.send(500, error))
})

//UPDATE
router.post('/:id', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => book.update(req.body))
    .then(() => res.redirect('/books/'))
    .catch(error => res.send(500, error))
})

//DELETE
router.post('/:id/delete', (req, res) => {
    const id = req.params.id
    Book.findByPk(id)
    .then(book => book.destroy())
    .then(() => res.redirect('/books/'))
    .catch(error => res.send(500, error))
})

module.exports = router