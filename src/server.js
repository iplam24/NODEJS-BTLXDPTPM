require('dotenv').config();
const express = require('express');
const path = require('path');

const configViewEngine=require('./config/viewEngine');
const configBody=require('./config/xylySession')
const webRoutes = require('./routes/web');
const adminRoutes =require('./routes/adminR');

const app = express();
const port = process.env.PORT || 3000;//port
//const hostname=process.env.HOST_NAME || 'localhost';
const hostname=process.env.HOST_NAME || '0.0.0.0';

configViewEngine(app);
configBody(app);

//web route kieu abc.com/aa
app.use('/',webRoutes);
app.use('/',adminRoutes);
app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})