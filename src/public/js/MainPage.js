   // Khởi tạo Swiper cho carousel ô tô
   var carSwiper = new Swiper(".carSwiper", {
    loop: true,
    navigation: false,
    pagination: false
});

// Hàm chuyển slide theo icon được click
function changeCarSlide(index) {
    carSwiper.slideTo(index);
}
//----------------------------Dữ liệu test, sau lấy từ DB------------------------------
const carData = [
{ type: "D-SUV", seats: "5 chỗ", range: "471 km", price: "970.000.000 VNĐ" },
{ type: "Hatchback", seats: "4 chỗ", range: "400 km", price: "600.000.000 VNĐ" },
{ type: "Sedan", seats: "5 chỗ", range: "450 km", price: "750.000.000 VNĐ" },
{ type: "Crossover", seats: "5 chỗ", range: "500 km", price: "800.000.000 VNĐ" },
{ type: "SUV", seats: "7 chỗ", range: "550 km", price: "1.200.000.000 VNĐ" },
{ type: "Luxury SUV", seats: "7 chỗ", range: "600 km", price: "1.500.000.000 VNĐ" }
];

//Hàm chuyển TT xe
function changeCar(index) {
document.getElementById("car-type").textContent = carData[index].type;
document.getElementById("car-seats").textContent = carData[index].seats;
document.getElementById("car-range").textContent = carData[index].range;
document.getElementById("car-price").textContent = carData[index].price;
}


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
                window.location.href = "/abc"; // Chuyển hướng đến trang profile
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

