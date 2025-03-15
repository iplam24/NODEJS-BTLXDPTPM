
//FILL dữ liệu cũ được lưu vào trong các ô textbox khi reload lại trang web
const getSignup = (req, res) => {
    if (!req.session) {
        return res.render("signup", { oldData: {}, message: "" });
    }

    // Lấy dữ liệu từ session
    const oldData = req.session.oldData || {};
    const message = req.session.message || "";

    req.session.oldData = null;
    req.session.message = null;
    
    res.render("signup", { oldData, message });
};

//Đăng xuất tài khoản khỏi server, xoá session
const logOutUser = (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({ message: "Bạn chưa đăng nhập!" });
    }

    console.log("✅ User đã đăng xuất:", req.session.user.usernameLogin);

    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Lỗi khi đăng xuất:", err);
            return res.status(500).json({ message: "Đăng xuất thất bại!" });
        }

        res.clearCookie("connect.sid"); // Xóa session cookie
        res.status(200).json({ loggedOut: true }); // Trả về JSON để client xử lý
    });
};






const getLogin =(req,res)=>{
    if (!req.session) {
        return res.render("login", { oldData: {}, message: "" });
    }

    // Lấy dữ liệu từ session
    const oldData = req.session.oldData || {};
    const message = req.session.message || "";

    req.session.oldData = null;
    req.session.message = null;
    
    res.render("login", { oldData, message });
}
const getLoginUser=(req,res)=>{
    if (req.session.user) {
        res.json({ loggedIn: true, username: req.session.user.usernameLogin });
        
    } else {
        res.json({ loggedIn: false });
    }
}

module.exports={getSignup,logOutUser,getLogin,getLoginUser}