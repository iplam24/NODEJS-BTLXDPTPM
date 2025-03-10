
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
const logOutUser= (req, res) => {
    console.log("User đã đăng xuất:",req.session.user.usernameLogin);
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Đăng xuất thất bại" });
        }
        
        res.clearCookie("connect.sid"); // Xóa cookie session (quan trọng)
        res.json({ loggedOut: true });
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