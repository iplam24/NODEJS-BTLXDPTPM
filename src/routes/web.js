const express=require('express');
const {logInserver,getHomePage,postCreateNewUser}=require('../controllers/homeController');
const {getSignup,logOutUser,getLogin,getLoginUser} =require('../migration/oldData');
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