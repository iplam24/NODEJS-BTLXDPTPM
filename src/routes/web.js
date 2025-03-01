const express=require('express');
const {getHomePage}=require('../controllers/homeController');
const {logInserver,postCreateNewUser}=require('../models/userDAO');
const {getSignup,logOutUser,getLogin} =require('../routes/authRoute');
const getLoginUser =require('../routes/userRoute');
const router =express.Router();


router.get('/',getHomePage);


//route dang nhap
router.get('/dangnhap',getLogin);

router.get('/dangky',getSignup);

router.get('/user-dangnhap',getLoginUser);

router.get('/dangxuat',logOutUser);

router.post('/dangnhap-user',logInserver);

router.post('/dangky-taikhoan',postCreateNewUser);
module.exports = router