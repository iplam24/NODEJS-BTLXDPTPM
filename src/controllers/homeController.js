const {switchRed} = require('../migration/userRole');
const {getUserAccount,checkUser,createUser,getUserRole} = require('../models/userDAO');
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
    try{
        let user = await getUserAccount(usernameLogin,passwordLogin);
        if(!user){
            return res.render("login",{
                message:"Tài khoản hoặc mật khẩu không chính xác!",
                oldData:{usernameLogin}
            });
        }

        //lấy về role của userLogin
        let role = await getUserRole(usernameLogin);
        if(role==null){
            return render("login",{
                message:"Không tìm thấy vai trò của tài khoản này!",
                oldData:{usernameLogin}
            });
        }

        //Thông báo về server
        console.log(`User "${usernameLogin}" đăng nhập với vai trò - ${role}`);

        //lưu session
        req.session.user={usernameLogin,role};
        
        switchRed(role,usernameLogin,res);
        
        } catch (err) {
            console.error("⚠ Lỗi hệ thống:", err);
            return res.send(`<script>
                alert("Lỗi hệ thống! Vui lòng thử lại.");
                window.location.href = "/dangnhap";
            </script>`);
        };
    }

 
 const postCreateNewUser = async(req,res)=>{
    let { username, password, repassword, myname, email, phone, address } = req.body;
    // Kiểm tra dữ liệu nhập vào
    if (!username || !password || !repassword) {
        return res.render("signup", { 
            message: "Vui lòng điền đầy đủ thông tin!", 
            oldData: { username, myname, email, phone, address } 
        });
    }

    if (password !== repassword) {
        return res.render("signup", { 
            message: "Mật khẩu không trùng khớp!", 
            oldData: { username, myname, email, phone, address } 
        });
    }

    try {
        // Kiểm tra username đã tồn tại chưa
        let userExists = await checkUser(username);
        if (userExists) {
            return res.render("signup", { 
                message: "Tài khoản đã tồn tại, vui lòng sử dụng tài khoản khác!", 
                oldData: { username, myname, email, phone, address } 
            });
        }
         // Tạo người dùng mới
         await createUser(username, password, myname, email, phone, address);
         console.log("✅ Đăng ký thành công người dùng mới:", username);
 
         return res.send(`<script>
             alert("Đăng ký tài khoản thành công! Đang chuyển hướng đến trang đăng nhập");
             window.location.href = "/dangnhap"; 
         </script>`);
    }catch (err) {
    console.error("⚠ Lỗi hệ thống:", err);
    return res.send(`<script>
        alert("Lỗi hệ thống! Vui lòng thử lại.");
        window.location.href = "/dangky"; 
    </script>`);
}
}
module.exports={logInserver,getHomePage,postCreateNewUser}