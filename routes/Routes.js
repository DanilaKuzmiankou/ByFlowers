const Router = require('express')
const router = new Router()
const userRouter = require('./UserRouter')
const productRouter = require('./ProductRouter')
const basketRouter = require('./BasketRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)

module.exports = router
