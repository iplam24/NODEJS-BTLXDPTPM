document.addEventListener("DOMContentLoaded", function() {
    const carOptions = document.querySelectorAll(".car-option");
    const carImage = document.getElementById("car-image");
    const colorOptions = document.querySelectorAll(".color-option");

    // Thay đổi xe khi click vào sidebar
    carOptions.forEach(option => {
        option.addEventListener("click", function() {
            document.querySelector(".car-option.active").classList.remove("active");
            this.classList.add("active");
            let car = this.dataset.car;
            carImage.src = `${car}-white.png`; // Mặc định là màu trắng
        });
    });

    // Chọn màu ngoại thất & đổi ảnh xe
    colorOptions.forEach(option => {
        option.addEventListener("click", function() {
            document.querySelector(".color-option.selected").classList.remove("selected");
            this.classList.add("selected");
            let color = this.dataset.color;
            let car = document.querySelector(".car-option.active").dataset.car;
            carImage.src = `${car}-${color}.png`;
        });
    });

    // Xác nhận đặt cọc
    document.getElementById("confirm").addEventListener("click", function() {
        alert("Đặt cọc thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
    });
});
