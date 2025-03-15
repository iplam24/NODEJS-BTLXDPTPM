function confirmLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        fetch('/dangxuat', { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.href = "/dangnhap";
            } else {
                alert("Đăng xuất thất bại!");
            }
        })
        .catch(error => console.error("Lỗi khi đăng xuất:", error));
    }
}