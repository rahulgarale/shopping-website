const express=require('express');
const path=require('path');

const adminController=require('../controllers/admin');

const router=express.Router();


// admin/add-product=get
router.get('/add-product',adminController.getAddProduct);
// admin/add-product=POST
router.post('/add-product',adminController.postAddProduct)

// admin/products=get
router.get('/products',adminController.getProducts);

router.get('/edit-Product/:prodId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct)

router.post('/delete-product',adminController.postDeleteProduct)


module.exports=router;