const path=require('path');
const express = require('express');
const session = require("express-session");
const configBody =(app)=>{
    
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cấu hình session
app.use(session({
    secret: "supersecretkey",  
    resave: false,             // Không lưu lại session nếu không có thay đổi
    saveUninitialized: true,   // Lưu session ngay cả khi chưa có dữ liệu
    cookie: { secure: false }  // Nếu dùng HTTPS, đổi thành `true`
}));
}
module.exports=configBody;