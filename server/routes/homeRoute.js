const { Router } = require('express')

const router = Router()
router.get('/', (req, res) => {
    res.send("hello!!!!")
})
router.get('/users', (req, res) => {
    console.log('w are hear')
    res.json({ mes: "success" })
})

module.exports = router

