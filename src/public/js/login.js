document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector('.input[type="text"]');
    const passwordInput = document.querySelector('.input[type="password"]');
    const eyeIcon = document.querySelector('.inputForm svg:last-child');
    const signInButton = document.querySelector('.button-submit');

    // Ẩn/hiện mật khẩu
    eyeIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.style.opacity = 0.6;
        } else {
            passwordInput.type = "password";
            eyeIcon.style.opacity = 1;
        }
    });

    // Xác thực email và mật khẩu khi nhấn nút Sign In
    // signInButton.addEventListener("click", function (e) {
    //     e.preventDefault(); // Ngăn chặn form submit mặc định

    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value.trim();
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     if (!email) {
    //         alert("Vui lòng nhập Tài khoản!");
    //         return;
    //     }
    //     // if (!emailPattern.test(email)) {
    //     //     alert("Email không hợp lệ!");
    //     //     return;
    //     //}
    //     if (!password) {
    //         alert("Vui lòng nhập mật khẩu!");
    //         return;
    //     }
    //     if (password.length < 6) {
    //         alert("Mật khẩu phải có ít nhất 6 ký tự!");
    //         return;
    //     }

    //     alert("Đăng nhập thành công!");
    // });
});
