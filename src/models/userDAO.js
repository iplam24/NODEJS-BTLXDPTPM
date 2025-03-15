require('dotenv').config();
const connectDB =require('../config/connectDB');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { hostname } = require('os');
// Hàm kiểm tra tài khoản và mật khẩu trong tbl_users
const getUserAccount = async (username, password) => {
    let pool = await connectDB();
    let result = await pool.request()
        .input('username', username)
        .input('password', password)
        .query(`SELECT UserName FROM tbl_users WHERE UserName = @username AND PassWord = @password`);
    
    return result.recordset.length > 0 ? result.recordset[0] : null;
};

//Hàm kiểm tra xem tài khoản đã tồn tại hay chưa
const checkUser = async(username)=>{
    let pool = await connectDB();
    let result = await pool.request()
    .input("UserName",username)
    .query("SELECT COUNT(*) AS count FROM tbl_users WHERE UserName = @UserName");
    return result.recordset[0].count > 0;
}

// Thêm người dùng mới vào database
const createUser= async(username, password, myname, email, phone, address,role)=>{
    let pool = await connectDB();
    let request = pool.request();
    
    await request
        .input("UserName", username)
        .input("PassWord", password)
        .input("Full_name", myname)
        .input("Email", email)
        .input("Phone", phone)
        .input("Address", address)
        .query(`
            INSERT INTO tbl_users (UserName, PassWord, Full_name, Email, Phone, Address) 
            VALUES (@UserName, @PassWord, @Full_name, @Email, @Phone, @Address)
        `);
    
    await request
        .input("UsernameRole", username)
        .input("RoleRole", role)
        .query("INSERT INTO tbl_role (UserName, Role) VALUES (@UsernameRole, @RoleRole)");
}
//Kiểm tra vai trò của tài khoản trong bảng tbl_Role
const getUserRole = async (username) => {
    let pool = await connectDB();
    let result = await pool.request()
        .input('username', username)
        .query(`SELECT Role FROM tbl_role WHERE UserName = @username`);
    
    return result.recordset.length > 0 ? result.recordset[0].Role : null;
};

const getUserUpDate = async (username) => {
    let pool = await connectDB();
    let result = await pool.request()
        .input('username', username)
        .query(`SELECT u.*, r.Role 
            FROM tbl_users u
            JOIN tbl_role r ON u.UserName = r.UserName
            WHERE u.UserName = @username`);
        return result.recordset; 
};
const updateUser = async (username, password, myname, email, phone, address, role) => {
    let pool = await connectDB();
    let request = pool.request();

    // Cập nhật thông tin trong bảng tbl_users
    await request
        .input("UserName", username)
        .input("PassWord", password)
        .input("Full_name", myname)
        .input("Email", email)
        .input("Phone", phone)
        .input("Address", address)
        .query(`
            UPDATE tbl_users 
            SET PassWord = @PassWord, Full_name = @Full_name, Email = @Email, 
                Phone = @Phone, Address = @Address
            WHERE UserName = @UserName
        `);

    // Cập nhật quyền trong bảng tbl_role
    await request
        .input("UsernameRole", username)
        .input("RoleRole", role)
        .query(`
            UPDATE tbl_role 
            SET Role = @RoleRole 
            WHERE UserName = @UsernameRole
        `);
};
const deleteUser = async (username) => {
    let pool = await connectDB(); // Kết nối database

    try {
        // Xóa quyền trong bảng tbl_role
        await pool.request()
            .input('username', username)
            .query(`DELETE FROM tbl_role WHERE UserName = @username`);

        // Xóa user trong bảng tbl_users
        await pool.request()
            .input('username', username)
            .query(`DELETE FROM tbl_users WHERE UserName = @username`);

        return { message: "✅ Xóa người dùng thành công!" };
    } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
        return { message: "⚠️ Xóa người dùng thất bại!" };
    }
};
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

const checkUserEmail = async (username, email) => {
    let pool = await connectDB();
    
    let result = await pool.request()
        .input('username', username)
        .input('email', email)
        .query(`SELECT UserName FROM tbl_users WHERE UserName = @username AND Email = @email`);

    return result.recordset.length > 0; // Trả về true nếu tìm thấy, ngược lại là false
};


const pullCode = async (username, email) => {
    let pool = await connectDB();
    // Tạo mã bí mật 6 số bất kì
    let secretCode = Math.floor(100000 + Math.random() * 900000).toString();

    
    // Lưu mã vào bảng tbl_repass
    await pool.request()
        .input('username', username)
        .input('email', email)
        .input('code', secretCode)
        .query(`INSERT INTO tbl_repass (UserName, Email, Code) VALUES (@username, @email, @code)`);
        return secretCode;
};

const guiEmail = async (email, secretCode) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.HOST_EMAIL, 
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.HOST_EMAIL,
        to: email,
        subject: "🔑 Đặt lại mật khẩu",
        text: `
        Mã xác nhận của bạn là: ${secretCode}. Vui lòng nhập mã này để đặt lại mật khẩu.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Đã gửi mã xác nhận tới email: ",email);
    } catch (error) {
        console.error("❌ Lỗi gửi email:", error);
        return { message: "⚠️ Không thể gửi email!" };
    }
};

const getRepassCode = async (email,code) => {
    let pool = await connectDB();

    let result = await pool.request()
        .input('emailRe', email)
        .input('codeRe', code)
        .query(`
            SELECT Email, Code 
            FROM tbl_repass 
            WHERE Email = @emailRe And Code = @codeRe
        `);

    return result.recordset.length > 0 ? result.recordset[0] : null;
};

const setNewPass = async (email, newPassword) => {
    let pool = await connectDB();
    try {
        await pool.request()
            .input('email', email)
            .input('newPassword', newPassword)
            .query(`
                UPDATE tbl_users 
                SET PassWord = @newPassword 
                WHERE Email = @email
            `);
        return { success: true, message: "✅ Mật khẩu đã được cập nhật thành công!" };
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật mật khẩu:", error);
        return { success: false, message: "⚠️ Cập nhật mật khẩu thất bại!" };
    }
};

module.exports={getUserAccount,checkUser,createUser,getUserRole,getUserUpDate,updateUser,deleteUser,getAllUser,getRepassCode,checkUserEmail,guiEmail,pullCode,
    setNewPass
}