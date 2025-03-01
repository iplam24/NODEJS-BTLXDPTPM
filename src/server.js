require('dotenv').config();
const express = require('express');
const path = require('path');

const configViewEngine=require('./config/viewEngine');
const configBody=require('./config/xylySession')
const webRoutes = require('./routes/web');

const app = express();
const port = process.env.PORT || 3000;//port
const hostname=process.env.HOST_NAME || 'localhost';


configViewEngine(app);
configBody(app);

//web route kieu abc.com/aa
app.use('/',webRoutes);

app.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})