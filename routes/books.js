const express = require('express')
const router = express.Router()

const books = [
    {
        id: 1,
        title: 'Book 1',
        author: 'author 1',
        genre: 'crime',
        year: 2000 
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'author 2',
        genre: 'fiction',
        year: 2005
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'author 3',
        genre: 'non-fiction',
        year: 2010
    },
    {
        id: 4,
        title: 'Book 4',
        author: 'author 4',
        genre: 'action',
        year: 2015
    }
]

router.get('/', (req,res) => {
    res.render('books/index', { books })
})

router.get('/new', (req, res) => {

})

//CREATE →	
router.post('/new', (req, res) => {

})

//READ 
router.get('/:id', (req, res) => {
    
})

//UPDATE
router.post('/:id', (req, res) => {

})

//DELETE
router.post('/:id/delete', (req, res) => {

})



module.exports = router