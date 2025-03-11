const express = require('express');
const {getAdmin,getAccount,postCreateNewUserAdmin,getUpDateUser,postUpDateUserAdmin,postDeleteUser} =require('../controllers/adminController');
const { checkRole } = require("../middleware/auth");
const router = express.Router();

// Route trang dashboard admin
router.get('/admin',checkRole([0]),getAdmin);

// Route quản lý users
router.get('/admin/account',checkRole([0]),getAccount);

router.get('/admin/update-user::username',checkRole([0]),getUpDateUser);
// Route settings admin
router.post('/admin/delete-user::username',checkRole([0]),postDeleteUser);
router.get('/settings', (req, res) => {
    res.render('admin/settings', { title: 'Admin Settings' });
});

router.post('/them-taikhoan',checkRole([0]),postCreateNewUserAdmin);
router.post('/sua-taikhoan',checkRole([0]),postUpDateUserAdmin);
module.exports = router;
