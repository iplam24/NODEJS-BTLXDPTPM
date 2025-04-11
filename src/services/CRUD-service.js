const connectDB = require('../config/connectDB');
const sql = require('mssql');

const getAllOrder = async() =>{
    try {
        let pool = await connectDB();
        let result = await pool.request().query(`
           SELECT * from tbl_orders
        `);

        //Xử lý ảnh thành mảng thay vì chuỗi
        return result.recordset;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách xe:", error);
        return [];
    }
}

module.exports =  {getAllOrder}