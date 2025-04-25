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

const addOrder = async (orderid, cusid, orderdate, soluong, price, trangthai, diachi, thanhtoan) => {
    let pool = await connectDB();
    let request = pool.request();

    await request
        .input("OrderID", sql.Int, parseInt(orderid))              
        .input("CusID", sql.Int, parseInt(cusid))                  
        .input("OrderDate", sql.DateTime, new Date(orderdate))     
        .input("SoLuong", sql.Int, parseInt(soluong))              
        .input("Price", sql.Int, parseInt(price))                  
        .input("Status", sql.NVarChar, trangthai)                  
        .input("Address", sql.NVarChar, diachi)                    
        .input("Payment", sql.NVarChar, thanhtoan)                 
        .query(`
            INSERT INTO tbl_orders 
            (Order_ID, Customer_ID, OrderDate, TotalAmount, Price, Status, ShippingAddress, PaymentMethod) 
            VALUES (@OrderID, @CusID, @OrderDate, @SoLuong, @Price, @Status, @Address, @Payment)
        `);
}


const updateOrder = async (orderid, cusid, orderdate, soluong, trangthai, diachi, thanhtoan) => {
    let pool = await connectDB();
    let request = pool.request();

    await request
        .input("OrderID", sql.Int, parseInt(orderid))
        .input("CusID", sql.Int, parseInt(cusid))
        .input("OrderDate", sql.DateTime, new Date(orderdate))
        .input("SoLuong", sql.Int, parseInt(soluong))
        .input("Status", sql.NVarChar, trangthai)
        .input("Address", sql.NVarChar, diachi)
        .input("Payment", sql.NVarChar, thanhtoan)
        .query(`
            UPDATE tbl_orders
            SET 
                Customer_ID = @CusID,
                OrderDate = @OrderDate,
                TotalAmount = @SoLuong,
                Status = @Status,
                ShippingAddress = @Address,
                PaymentMethod = @Payment
            WHERE Order_ID = @OrderID
        `);
};
const deleteOrder = async (orderid) => {
    let pool = await connectDB();
    let request = pool.request();

    await request
        .input("OrderID", sql.Int, parseInt(orderid))
        .query(`
            DELETE FROM tbl_orders
            WHERE Order_ID = @OrderID
        `);
};


const addContact = async(name, email, message)=>{
    let pool = await connectDB();
    let request = pool.request();

    await request
    .input("Contact_id", sql.Int, parseInt(orderid))
    .input("CusID", sql.Int, parseInt(cusid))
    .input("OrderDate", sql.DateTime, new Date(orderdate))
}
module.exports =  {getAllOrder,addOrder,updateOrder,deleteOrder,addContact}