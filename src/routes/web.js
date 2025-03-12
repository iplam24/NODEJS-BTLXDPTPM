const express=require('express');
const {logInserver,getHomePage,postCreateNewUser,getCar,getQuenMK,rePassWord,
    postGuiCode,postDatMK,
    getLienHe}=require('../controllers/homeController');
const {getSignup,logOutUser,getLogin,getLoginUser} =require('../migration/oldData');
const router =express.Router();


router.get('/',getHomePage);


//route dang nhap
router.get('/dangnhap',getLogin);

router.get('/dangky',getSignup);

router.get('/user-dangnhap',getLoginUser);

router.get('/dangxuat',logOutUser);

router.get('/sanpham',getCar);

router.get('/lienhe',getLienHe);

router.post('/dangnhap-user',logInserver);
router.post('/nhap-ma-xacnhan',postGuiCode);
router.get('/quenmatkhau',getQuenMK);
router.post('/quen-mat-khau',rePassWord);



//dat lai mk
router.post('/dat-lai-mk',postDatMK);
router.post('/dangky-taikhoan',postCreateNewUser);
module.exports = router