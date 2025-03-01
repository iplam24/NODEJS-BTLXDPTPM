const express = require('express');
const router = express.Router();

// Route trang dashboard admin
router.get('/admin', (req, res) => {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Route quản lý users
router.get('/users', (req, res) => {
    res.render('admin/users', { title: 'User Management' });
});

// Route settings admin
router.get('/settings', (req, res) => {
    res.render('admin/settings', { title: 'Admin Settings' });
});

module.exports = router;
