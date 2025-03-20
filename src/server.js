require('dotenv').config();
const express = require('express');
const path = require('path');

const configViewEngine=require('./config/viewEngine');
const configBody=require('./config/xylySession')
const webRoutes = require('./routes/web');
const adminRoutes =require('./routes/adminR');

const app = express();
const port = process.env.PORT || 3000;//port
const hostname=process.env.HOST_NAME || 'localhost';


configViewEngine(app);
configBody(app);

//web route kieu abc.com/aa
app.use('/',webRoutes);
app.use('/',adminRoutes);
app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})

//Phần tìm kiếm t viết :)
// Thêm route tìm kiếm
app.get('/:page', (req, res) => {
    const { page } = req.params;
    const allowedPages = ['VF3', 'VF5', 'VF6', 'VF7', 'VF8', 'VF9'];

    if (allowedPages.includes(page)) {
        res.render(page);
    } else {
        res.status(404).send('Trang không tồn tại!');
    }
});

app.use('/', webRoutes);
app.use('/', adminRoutes);
