const express=require('express');
const path=require('path');

const adminController=require('../controllers/admin');
const isAuth=require('../middleware/is-auth');
const router=express.Router();


// admin/add-product=get
router.get('/add-product',isAuth,adminController.getAddProduct);
// admin/add-product=POST
router.post('/add-product',isAuth,adminController.postAddProduct)

// admin/products=get
router.get('/products',isAuth,adminController.getProducts);

router.get('/edit-Product/:prodId',isAuth,adminController.getEditProduct);

router.post('/edit-product',isAuth,adminController.postEditProduct)

router.post('/delete-product',isAuth,adminController.postDeleteProduct)


module.exports=router;