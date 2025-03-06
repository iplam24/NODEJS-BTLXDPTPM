document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Kiểm tra tính hợp lệ của dữ liệu nhập
        if (name === "" || email === "" || message === "") {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // Hiển thị thông báo thành công
        alert("Cảm ơn bạn đã liên hệ với chúng tôi, " + name + "!");

        // Xóa dữ liệu trong biểu mẫu
        form.reset();
    });
});