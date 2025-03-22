const express=require('express');
const {logInserver,getHomePage,postCreateNewUser,getCar,getQuenMK,rePassWord,
    postGuiCode,postDatMK,
    getLienHe,postLienHe,
    timKiemSanPham,
    getChiTietSanPham}=require('../controllers/homeController');
const {getSignup,logOutUser,getLogin,getLoginUser} =require('../migration/oldData');
const router =express.Router();


router.get('/',getHomePage);


//route dang nhap
router.get('/dangnhap',getLogin);

router.get('/dangky',getSignup);

router.get('/user-dangnhap',getLoginUser);

router.post('/dangxuat',logOutUser);

router.get('/sanpham',getCar);

router.get('/lienhe',getLienHe);

router.post('/dangnhap-user',logInserver);

router.post('/nhap-ma-xacnhan',postGuiCode);

router.get('/quenmatkhau',getQuenMK);

router.post('/quen-mat-khau',rePassWord);

router.post('/gui-lien-he',postLienHe);

//dat lai mk
router.post('/dat-lai-mk',postDatMK);
router.post('/dangky-taikhoan',postCreateNewUser);

router.get('/chitietsanpham',getChiTietSanPham);
router.post('/timkiem-sanpham',timKiemSanPham);
module.exports = router