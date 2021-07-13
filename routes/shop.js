const express=require('express');
const path=require('path');

const shopController=require('../controllers/shop');

const router=express.Router();


router.get('/',shopController.getIndex);

router.get('/products',shopController.getProduct);

router.get('/products/:productId',shopController.getSingleProduct);

router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart-delete-item',shopController.postCartDeleteProduct)
router.get('/orders',shopController.getOrders);
router.get('/checkout',shopController.getCheckout);
router.post('/create-order',shopController.postOrders)



module.exports = router;