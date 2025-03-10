const connectDB = require('../config/connectDB');

const getAllUser = async () => {
    try {
        let pool = await connectDB(); // Kết nối DB

        //Lay ve toan bo cua tbl user và role của tbl_role
        const query = "SELECT u.*, r.Role FROM tbl_users u LEFT JOIN tbl_role r ON u.UserName = r.UserName";

        let result = await pool.request().query(query);
        console.log("✅ Lấy danh sách user thành công!");
        return result.recordset; // Chỉ trả về danh sách user 
    } catch (err) {
        console.error("❌ Lỗi lấy danh sách user:", err);
        throw err; 
    }
};

module.exports = { getAllUser };
