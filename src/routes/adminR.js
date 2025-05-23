const express = require('express');
const {getAdmin,
    getAccount,
    postCreateNewUserAdmin,
    getUpDateUser,
    postUpDateUserAdmin,
    postDeleteUser,
    getCar,
    addCar,
    searchAccount,
    postDetail,
    getDetail,
    deleteCaradmin,
    getUpDateCar,
    postUpDateDetail,postUpDateCar,getOrder
    ,postOrder,deleteOrderDB} =require('../controllers/adminController');
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
router.post('/admin/search-account',searchAccount);
// route quản lý cars

router.post('/admin/addDetail',postDetail);

router.get('/admin/car',getCar);
router.get('/admin/detail',getDetail);
router.post('/admin/update-detail',postUpDateDetail);


router.post('/admin/addcar',addCar);
router.post('/admin/updateCar',postUpDateCar);
router.post('/admin/delete-car::carid',deleteCaradmin);

router.get('/admin/update-car::carid',getUpDateCar);
router.get('/admin/order',getOrder);
router.post('/admin/addorder',postOrder);
router.post('/admin/delete/:id',deleteOrderDB);
module.exports = router;
