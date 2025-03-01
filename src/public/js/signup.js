document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const togglePassword = document.querySelector(".togglePassword");
    const signUpButton = document.querySelector(".button-submit");

    // Hiển thị/ẩn mật khẩu
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.style.opacity = 0.6;
        } else {
            passwordInput.type = "password";
            togglePassword.style.opacity = 1;
        }
    });

    // Xác thực dữ liệu khi nhấn Sign Up
    // signUpButton.addEventListener("click", function (e) {
    //     e.preventDefault();

    //     const name = document.querySelector('.input[type="text"]').value.trim();
    //     const email = document.querySelectorAll('.input[type="text"]')[1].value.trim();
    //     const password = passwordInput.value.trim();
    //     const confirmPassword = confirmPasswordInput.value.trim();
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     if (!name) {
    //         alert("Vui lòng nhập họ và tên!");
    //         return;
    //     }
    //     if (!emailPattern.test(email)) {
    //         alert("Email không hợp lệ!");
    //         return;
    //     }
    //     if (password.length < 6) {
    //         alert("Mật khẩu phải có ít nhất 6 ký tự!");
    //         return;
    //     }
    //     if (password !== confirmPassword) {
    //         alert("Mật khẩu xác nhận không khớp!");
    //         return;
    //     }

    //     alert("Đăng ký thành công!");
    // });
});
