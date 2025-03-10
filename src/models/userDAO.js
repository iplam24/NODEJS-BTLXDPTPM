const connectDB =require('../config/connectDB');

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
const createUser= async(username, password, myname, email, phone, address)=>{
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
        .input("RoleRole", 2)
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

module.exports={getUserAccount,checkUser,createUser,getUserRole}