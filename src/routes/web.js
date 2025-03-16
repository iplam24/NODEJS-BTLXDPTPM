const express = require('express');
const { getSanPham, logInserver, getHomePage, postCreateNewUser, getCar, getQuenMK, 
        rePassWord, postGuiCode, postDatMK, getLienHe, postLienHe, timKiemSanPham 
} = require('../controllers/homeController');  // 🟢 Import tất cả controllers lên trước

const { getSignup, logOutUser, getLogin, getLoginUser } = require('../migration/oldData');

const router = express.Router();

router.get('/', getHomePage);

// Route đăng nhập
router.get('/dangnhap', getLogin);
router.get('/dangky', getSignup);
router.get('/user-dangnhap', getLoginUser);
router.post('/dangxuat', logOutUser);

// Route sản phẩm
router.get('/sanpham', getCar);
router.get('/sanpham/:id', getSanPham);  // 🟢 Đảm bảo route này gọi đúng hàm

// Route tìm kiếm sản phẩm
router.post('/timkiem-sanpham', timKiemSanPham);

// Các route khác
router.get('/lienhe', getLienHe);
router.post('/gui-lien-he', postLienHe);
router.get('/quenmatkhau', getQuenMK);
router.post('/quen-mat-khau', rePassWord);
router.post('/nhap-ma-xacnhan', postGuiCode);
router.post('/dat-lai-mk', postDatMK);
router.post('/dangky-taikhoan', postCreateNewUser);

module.exports = router;
