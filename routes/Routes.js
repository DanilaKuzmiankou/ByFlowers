const Router = require('express')
const router = new Router()
const userRouter = require('./UserRouter')
const productRouter = require('./ProductRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)

module.exports = router