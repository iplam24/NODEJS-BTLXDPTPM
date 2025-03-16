// Khởi tạo Swiper cho carousel ô tô
var carSwiper = new Swiper(".carSwiper", {
    loop: true,
    navigation: false,
    pagination: false,
    speed: 600, // Tốc độ mượt hơn
    on: {
        slideChange: function () {
            let realIndex = carSwiper.realIndex; // Lấy index thực tế từ Swiper
            changeCar(realIndex);
            currentIndex = realIndex; // Cập nhật vị trí hiện tại
        }
    }
});

// Lưu vị trí hiện tại
let currentIndex = 0;

// Hàm chuyển slide theo icon được click
function changeCarSlide(index) {
    let totalSlides = carData.length;
    let diff = index - currentIndex;

    // Xác định hướng đi ngắn nhất
    if (Math.abs(diff) > totalSlides / 2) {
        diff = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }

    // Tạo hiệu ứng chuyển slide từng bước
    let step = diff > 0 ? 1 : -1;
    let steps = Math.abs(diff);
    let delay = 150; // Thời gian giữa mỗi bước

    function animateSlide(stepCount) {
        if (stepCount === 0) return; // Dừng khi hoàn thành

        currentIndex += step;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;

        carSwiper.slideTo(currentIndex);
        setTimeout(() => animateSlide(stepCount - 1), delay);
    }

    animateSlide(steps);
}

// Dữ liệu xe
const carData = [
    { type: "MiniCar", seats: "4 chỗ", range: "210 km", price: "299.000.000 VNĐ" },
    { type: "A-SUV", seats: "5 chỗ", range: "326,4 km", price: "529.000.000 VNĐ" },
    { type: "B-SUV", seats: "5 chỗ", range: "480 km", price: "689.000.000 VNĐ" },
    { type: "C-SUV", seats: "5 chỗ", range: "431 km", price: "790.000.000 VNĐ" },
    { type: "D-SUV", seats: "5 chỗ", range: "471 km", price: "1.019.000.000 VNĐ" },
    { type: "E-SUV", seats: "6-7 chỗ", range: "626 km", price: "1.499.000.000 VNĐ" }
];

// Khởi tạo Swiper
var carSwiper = new Swiper(".carSwiper", {
    loop: true,
    speed: 600,
    navigation: false,
    pagination: false,
    on: {
        slideChange: function () {
            let realIndex = carSwiper.realIndex;
            updateCarInfo(realIndex);
        }
    }
});

// Hàm cập nhật thông tin xe
function updateCarInfo(index) {
    if (index >= 0 && index < carData.length) {
        document.getElementById("car-type").textContent = carData[index].type;
        document.getElementById("car-seats").textContent = carData[index].seats;
        document.getElementById("car-range").textContent = carData[index].range;
        document.getElementById("car-price").textContent = carData[index].price;
    }
}

// Khi nhấn vào icon để đổi xe
function changeCar(index) {
    carSwiper.slideToLoop(index); // Chuyển slide tới xe tương ứng
    updateCarInfo(index);
}

// Cập nhật thông tin xe ban đầu
updateCarInfo(carSwiper.realIndex);




document.addEventListener("DOMContentLoaded", async () => {
    try {
        let response = await fetch("/user-dangnhap");
        let data = await response.json();

        if (data.loggedIn) {
            let btnLogin = document.querySelector(".btn-login");
            let btnSignup = document.querySelector(".btn-signup");

            btnLogin.textContent = `Xin chào, ${data.username}`;
            btnSignup.textContent = "Đăng xuất";

            // Biến nút thành một link dẫn đến trang profile
            btnLogin.style.cursor = "pointer"; 
            btnLogin.addEventListener("click", () => {
                window.location.href = "/"; // Chuyển hướng đến trang profile
            });

            // Xử lý đăng xuất
            btnSignup.addEventListener("click", async (e) => {
                e.preventDefault();
                const confirmLogout = confirm("Bạn có muốn đăng xuất không?");
                if (confirmLogout) {
                    await fetch("/dangxuat");
                    location.reload(); // Tải lại trang sau khi đăng xuất
                }
            });
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
    }
});



