const express = require('express');
const {getAdmin,getAccount} =require('../models/adminDAO');
const router = express.Router();

// Route trang dashboard admin
router.get('/admin',getAdmin);

// Route quản lý users
router.get('/admin/account',getAccount);

// Route settings admin
router.get('/settings', (req, res) => {
    res.render('admin/settings', { title: 'Admin Settings' });
});

module.exports = router;
