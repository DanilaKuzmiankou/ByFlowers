const Router = require('express')
const router = new Router()
const basketController = require('../controllers/BasketController')

router.post('/product', basketController.addProduct)
router.get('/count', basketController.getBasketProductCount)
router.get('/products', basketController.getBasketProducts)
router.delete('/product', basketController.deleteProduct)
router.post('/order', basketController.completeOrder)

module.exports = router
