//Chuyển hướng trang khi chia các vai trò 
const switchRed = async(role,usernameLogin,res)=>{
    let redirectURL; 
    switch(role){
        case 0://trường hợp là admin
            redirectURL="/admin";
            console.log("✅ Chuyển hướng đến:", redirectURL);
            return res.send(`<script>
                alert("Đăng nhập thành công! Bạn là admin");
                window.location.href = "${redirectURL}";
            </script>`);
        case 1://Nhân viên
            redirectURL="/staff";
            console.log("✅ Chuyển hướng đến:", redirectURL);
            return res.send(`<script>
                alert("Đăng nhập thành công! Bạn là nhân viên ${usernameLogin}");
                window.location.href = "${redirectURL}";
            </script>`);
        case 2://Khách hàng hoặc vai trò khác
            redirectURL="/";
            console.log("✅ Chuyển hướng đến:", redirectURL);
            return res.send(`<script>
                alert("Đăng nhập thành công! Xin chào ${usernameLogin}");
                window.location.href = "${redirectURL}";
            </script>`);
        default:
            redirectURL = "/dangnhap"; 
            return res.send(`<script>
            alert("Đăng nhập không thành công vui lòng kiểm tra lại tài khoản và mật khẩu!");
            window.location.href = "${redirectURL}";
        </script>`);
    }
}
module.exports={switchRed}