const session = require('express-session');
const {switchRed} = require('../migration/userRole');
const { addCarDB,getAllCar,searchCar,getOneDetails,getOneCar } = require('../models/productDAO');


const {getUserAccount,checkUser,createUser,getUserRole
    ,checkUserEmail,getRepassCode,guiEmail,pullCode,
    setNewPass} = require('../models/userDAO');
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

//api dung de dang nhap
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
        
        req.session.save(() => {
            switchRed(role, usernameLogin, res);
        });

       

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
         await createUser(username, password, myname, email, phone, address,2);
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
const getCar=async(req,res)=>{
    try {
        const cars = await getAllCar();
        res.render("sanpham", { cars });  // 🟢 Truyền dữ liệu xe vào view
    } catch (error) {
        console.error("❌ Lỗi khi hiển thị danh sách xe:", error);
        res.status(500).send("Lỗi khi hiển thị danh sách xe");
    }
}
const getQuenMK =(req,res)=>{
    res.render("quenmk", { message: null });
}
const rePassWord =async(req,res)=>{
    const {usernameRepass,emailRepass} = req.body;
    let result=await checkUserEmail(usernameRepass,emailRepass);
    if(!result){
        console.log("❌ Tài khoản hoặc email không chính xác!");
        return res.render("quenmk", { message: "⚠️ Tài khoản hoặc email không chính xác!" });
    }
    // Tạo mã xác nhận và gửi email
    let secretCode = await pullCode(usernameRepass, emailRepass);
    let emailResult = await guiEmail(emailRepass, secretCode);
    
    res.render("nhapcode", { emailRepass,message:null});
}

const postGuiCode =async(req,res)=>{
    const  {emailRepass,code} = req.body;
    let result = await getRepassCode(emailRepass,code);
    if(!result){
        res.render("nhapcode",{ emailRepass,message: "⚠️ Mã xác nhận không chính xác!" })
    }
    res.render("datlaiMK",{emailRepass,message:null});

}
const postDatMK=async(req,res)=>{
    const {emailRepass,password,repassword} = req.body;
    if(password=="" || repassword==""){
        res.render("datlaimk",{emailRepass,message:"⚠️ Không được để trống mật khẩu!"});
    }else if(repassword != password){
        res.render("datlaimk",{emailRepass,message:"⚠️ 2 mật khẩu chưa giống nhau!"});
    }else if(password==repassword){
        await setNewPass(emailRepass,password);
        console.log(`Đổi mật khẩu email ${emailRepass} thành ${password} thành công!` );
        return res.send(`<script>
            alert("Đổi mật khẩu thành công!");
            window.location.href = "/dangnhap"; 
        </script>`);
    }


}

const getLienHe=(req,res)=>{
    res.render("lienhe");
}

const postLienHe=(req,res)=>{
    const {name,email,message}=req.body;
    console.log("check>>>>",req.body);
}

const timKiemSanPham = async(req, res) => {
    const tenSP = req.body.tenSP;
    const cars = await searchCar(tenSP);
  
    res.render("timkiem", { cars }); 
};


const getChiTietSanPham = async (req, res) => {
    let carid = req.params.carid;
    
    // Loại bỏ dấu `:` nếu có
    if (carid.startsWith(":")) {
        carid = carid.substring(1);
    }

    console.log("🔍 carid sau khi xử lý:", carid); // Debug

    let detail = await getOneDetails(carid);
    let car = await getOneCar(carid);
    
    console.log("Thông tin chi tiết sản xe mã: ",carid);
    res.render("chitietsp", { detail, car });
};



module.exports = { 
    logInserver, 
    getHomePage, 
    postCreateNewUser, 
    getCar, 
    getQuenMK, 
    rePassWord, 
    postGuiCode, 
    postDatMK, 
    getLienHe, 
    postLienHe, 
    timKiemSanPham,
    getChiTietSanPham
};
