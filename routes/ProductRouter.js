const Router = require('express')
const router = new Router()
const productController = require('../controllers/ProductController')

router.get('/products', productController.getProductsWithType)
router.post('/product', productController.createProduct)
router.get('/recommended', productController.getRecommendationProducts)
router.get('/newest', productController.getNewestProducts)
router.get('/product', productController.getProductById)
router.get('/types', productController.getProductsTypes)

module.exports = router
