const Router = require('express')
const router = new Router()
const userRouter = require('./UserRouter')
const flowerRouter = require('./FlowerRouter')

router.use('/user', userRouter)
router.use('/flower', flowerRouter)

module.exports = router