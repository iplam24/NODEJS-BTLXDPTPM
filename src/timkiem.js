const express = require('express');
const path = require('path');
const app = express();

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route động để render file EJS
app.get('/:page', (req, res) => {
    const { page } = req.params;
    const allowedPages = ['VF3', 'VF5', 'VF6', 'VF7', 'VF8', 'VF9'];

    if (allowedPages.includes(page)) {
        res.render(page); // Render file EJS trong thư mục views
    } else {
        res.status(404).send('Trang không tồn tại!');
    }
});

// Khởi động server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server riêng đang chạy tại http://localhost:${PORT}`);
});
