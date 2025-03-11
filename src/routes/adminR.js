const express = require('express');
const {getAdmin,
    getAccount,
    postCreateNewUserAdmin,
    getUpDateUser,
    postUpDateUserAdmin,
    postDeleteUser,
    getCar,
    addCar} =require('../controllers/adminController');
const { checkRole } = require("../middleware/auth");
const router = express.Router();

// Áp dụng checkRole([0]) cho tất cả các route bắt đầu bằng '/admin'
router.use('/admin', checkRole([0]));
// Route trang dashboard admin
router.get('/admin',getAdmin);

// Route quản lý users
router.get('/admin/account',getAccount);
router.get('/admin/update-user::username',getUpDateUser);
router.post('/admin/delete-user::username',postDeleteUser);
router.post('/admin/them-taikhoan',postCreateNewUserAdmin);
router.post('/admin/sua-taikhoan',postUpDateUserAdmin);

// route quản lý cars

router.get('/admin/car',getCar);


router.post('/admin/addcar',addCar);
module.exports = router;
