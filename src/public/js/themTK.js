// Lấy phần tử modal và các nút
const modal = document.getElementById("modalForm");
const openBtn = document.querySelector(".openModal");
const closeBtn = document.querySelector(".close");

// Khi nhấn vào nút "Thêm Tài Khoản", mở modal
openBtn.onclick = function() {
    modal.style.display = "block";
}

// Khi nhấn vào nút đóng (X), đóng modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Khi nhấn bên ngoài modal, cũng đóng
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Xử lý khi nhấn "Lưu"
document.getElementById("accountForm").onsubmit = function(event) {
    event.preventDefault(); // Ngăn form reload trang

    // Lấy dữ liệu nhập
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Hiển thị dữ liệu (có thể thay bằng API lưu vào database)
    alert(`Tên đăng nhập: ${username}\nEmail: ${email}\nMật khẩu: ${password}`);

    // Đóng modal sau khi lưu
    modal.style.display = "none";

    // Reset form
    document.getElementById("accountForm").reset();
};
