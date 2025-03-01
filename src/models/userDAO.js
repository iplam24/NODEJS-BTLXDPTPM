const connectDB =require('../config/connectDB');

const logInserver=async(req,res)=>{
    let usernameLogin = req.body.usernameLogin;
    let passwordLogin = req.body.passwordLogin;
 
     //Kiểm tra xem tài khoản và mật khẩu có để trống hay không
    if (!usernameLogin || !passwordLogin) {
     return res.send(`<script>
         alert("Vui lòng nhập đầy đủ thông tin!");
         window.location.href = "/dangnhap"; 
     </script>`);
 }
 
 //Connect database và thực hiện câu lệnh truy vấn tìm ra tài khoản và mật khẩu
 try {
     let pool = await connectDB();
     let result = await pool.request()
         .input('username', usernameLogin)
         .input('password', passwordLogin)
         .query(`
             SELECT UserName, PassWord, Role 
             FROM tbl_users 
             WHERE UserName = @username AND PassWord = @password
         `); // Thêm cột Role vào SELECT
 
     if (result.recordset.length > 0) {
         let user = result.recordset[0]; // Lấy thông tin user
         let role = user.Role; // Lấy Role từ database
 
         console.log("User đang đăng nhập:", usernameLogin, "- Role:", role);
         req.session.user = { 
             usernameLogin, 
             role  // Lưu role vào session để dùng sau này
         };
 
         if (role == 0) {
             return res.send(`<script>
                 alert("Đăng nhập thành công! Bạn là Admin.");
                 window.location.href = "/admin"; // Chuyển đến trang admin
             </script>`);
         } else {
             return res.send(`<script>
                 alert("Đăng nhập thành công!");
                 window.location.href = "/"; // Quay lại trang chủ nếu không phải admin
             </script>`);
         }
     } else {
         return res.render("login", { 
             message: "Tài khoản hoặc mật khẩu không chính xác!", 
             oldData: { usernameLogin, passwordLogin } 
         });
     }
 } catch (err) {
     console.error("⚠ Lỗi kết nối database:", err);
     res.status(500).send("Lỗi kết nối database");
 }
 }

 const postCreateNewUser=async(req,res)=>
    {
        let username =req.body.username;
        let password =req.body.password;
        let re_pass =req.body.repassword;
        let myname=req.body.myname;
        let email=req.body.email;
        let phone=req.body.phone;
        let address=req.body.address;
    
        
        if(username == "" || password =="" || re_pass=="" ){
            return res.render("signup", { 
                message: "Vui lòng điền đầy đủ thông tin!", 
                oldData: { username,myname,email,address } 
            });
        }
        else
        {
        if (password !== re_pass) {
            return res.render("signup", { 
                message: "Mật khẩu không trùng khớp!", 
                oldData: { username, myname, email, phone, address } 
            });
        }
        else
        {
            try {
                let pool = await connectDB();
                let request = pool.request();
        
                // Kiểm tra xem username đã tồn tại chưa
                let checkUser = await request.input('UserName', username)
                    .query(`SELECT COUNT(*) AS count FROM tbl_users WHERE UserName = @UserName`);
                
                if (checkUser.recordset[0].count > 0) {
                    return res.render("signup", { 
                        message: "Tài khoản đã tồn tại, vui lòng sử dụng tài khoản khác!", 
                        oldData: { username, myname, email, phone, address } 
                    });
                }
        
                // Nếu không trùng, tiến hành INSERT
                await request
                    .input('PassWord', password)
                    .input('Full_name', myname)
                    .input('Email', email)
                    .input('Phone', phone)
                    .input('Address', address)
                    .input('Role', 1) // Mặc định là user
                    .query(`
                        INSERT INTO tbl_users (UserName, PassWord, Full_name, Email, Phone, Address, Role) 
                        VALUES (@UserName, @PassWord, @Full_name, @Email, @Phone, @Address, @Role)
                    `);
        
                console.log("✅ Đăng ký thành công người dùng mới:", username);
        
                return res.send(`<script>
                    alert("Đăng ký tài khoản thành công! Đang chuyển hướng đến trang đăng nhập");
                    window.location.href = "/dangnhap"; // Chuyển hướng về trang đăng nhập
                </script>`);
            } catch (err) {
                console.error("Lỗi kết nối database:", err);
                return res.send(`<script>
                    alert("Lỗi hệ thống! Vui lòng thử lại.");
                    window.location.href = "/dangky"; // Quay lại trang đăng ký
                </script>`);
            }
        }
    }
    }

    module.exports={logInserver,postCreateNewUser}