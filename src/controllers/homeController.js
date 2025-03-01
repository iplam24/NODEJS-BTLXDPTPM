const connectDB = require('../config/connectDB');
//lay ve trang chu
const getHomePage =async (req,res)=>{
    // try {
    //     let pool = await connectDB();
    //     let result = await pool.request().query('SELECT * FROM tbl_users');
    //     console.log('✅ Dữ liệu từ database:', result.recordset);
    //     res.send(result.recordsets);
    // } catch (err) {
    //     res.send('Lỗi kết nối database');
    // }
    res.render('MainPage');
}

module.exports={
    getHomePage}