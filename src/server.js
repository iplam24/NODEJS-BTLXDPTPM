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

const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment

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

//------------------------------------phan thanh toan ------------------------------------------------------------------


app.use (express.json());
app.use (express.urlencoded({extended: true}));

const config = {
    app_id: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};


app.post("/payment", async (req, res) => {
    const embed_data = { redirecturl: "http://localhost:1432" };
    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
        app_user: "user123",// 
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: 50000,// gia tien 
        description: `Payment for order #${transID}`,
        bank_code: "",
    };

    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    try {
        const result = await axios.post(config.endpoint, null, { params: order });
        res.json({ payUrl: result.data.order_url }); // Trả về URL thanh toán ZaloPay
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//---------------------------------------------------------------------------------------------------