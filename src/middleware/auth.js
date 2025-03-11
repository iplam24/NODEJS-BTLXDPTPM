const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.status(403).send( `<script>
         alert("❌Bạn chưa đăng nhập, vui lòng đăng nhập!");
         window.location.href = "/dangnhap"; 
        </script>`);
        }

        const userRole = req.session.user.role; // Lấy role từ session
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).send( `<script>
                alert("🚫Bạn không có quyền truy cập vào trang này !!!!");
                window.location.href = "/"; 
               </script>`);
        }

        next(); // Cho phép truy cập nếu đúng quyền
    };
};

module.exports = { checkRole };
