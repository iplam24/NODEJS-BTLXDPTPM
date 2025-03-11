const  {getAllUser} = require('../models/adminDAO');
const {checkUser,createUser,getUserUpDate,updateUser,deleteUser} = require('../models/userDAO');
const getAdmin =(req,res)=>{
    res.render('admin/admin')
}

const getAccount=async(req,res)=>{
    try {
        let users = await getAllUser();
        res.render("admin/account", { listUser: users, message: null });
    } catch (err) {
        res.send("❌ Lỗi lấy danh sách tài khoản!");
    }
}
const postCreateNewUserAdmin = async(req,res)=>{
    let { username, password, repassword, myname, email, phone, address,quyen } = req.body;
    let role = 2; // Mặc định khách hàng
    if (quyen === "nhanvien") {
        role = 1; // Nhân viên
    }
    // Kiểm tra dữ liệu nhập vào
    if (!username || !password || !repassword) {
        return res.send(`<script>
            alert("Vui Lòng nhập đầy đủ thông tin tài khoản.");
            window.location.href = "/admin/account"; 
        </script>`);
    }

    if (password !== repassword) {
        return res.send(`<script>
            alert("Mật khẩu không trùng khớp, vui lòng thử lại!.");
            window.location.href = "/admin/account"; 
        </script>`);
    }

    try {
        // Kiểm tra username đã tồn tại chưa
        let userExists = await checkUser(username);
        if (userExists) {
            return res.send(`<script>
                alert("Tài khoản đã tồn tại, vui lòng thử tên tài khoản khác");
                window.location.href = "/admin/account"; 
            </script>`);
        }
         // Tạo người dùng mới
         await createUser(username, password, myname, email, phone, address,role);
         console.log("✅ Đăng ký thành công người dùng mới:", username);
 
         return res.send(`<script>
             alert("Thêm tài khoản thành công!");
             window.location.href = "/admin/account"; 
         </script>`);
    }catch (err) {
    console.error("⚠ Lỗi hệ thống:", err);
    return res.send(`<script>
        alert("Lỗi hệ thống! Vui lòng thử lại.");
        window.location.href = "/admin/account"; 
    </script>`);
}
}
const getUpDateUser=async(req,res)=>{
    const userName = req.params.username;
    let result = await getUserUpDate(userName);
    res.render("admin/suaTK", { userEdit: result });
}

const postUpDateUserAdmin=async(req,res)=>{
    let { username, password, myname, email, phone, address,quyen } = req.body;
    let role = 2; // Mặc định khách hàng
    if (quyen === "nhanvien") {
        role = 1; // Nhân viên
    }
    await updateUser(username, password, myname, email, phone, address,role);
    console.log(`Bạn vừa thực hiện sửa dữ liệu của user ${username}`);
    return res.send(`<script>
        alert("Sửa tài khoản thành công!");
        window.location.href = "/admin/account"; 
    </script>`);
}
const postDeleteUser=async(req,res)=>{
    const userName = req.params.username;
    try {
        await deleteUser(userName);
        
        console.log(`Xoá thành công user ${userName}`);
        return res.send(`<script>
            alert("✅Xóa tài khoản thành công!");
            window.location.href = "/admin/account"; 
        </script>`);
    } catch (error) {
        res.status(500).send("❌ Lỗi khi xóa tài khoản!");
    }
}
module.exports ={getAdmin,getAccount,postCreateNewUserAdmin,getUpDateUser,postUpDateUserAdmin,postDeleteUser}