document.addEventListener("DOMContentLoaded", function () {
    const versions = document.querySelectorAll(".VF9-icon");
    const infoContainer = document.querySelector(".vf9-in4-2");
    const carImage = document.getElementById("carImagee");

    const versionData = {
        "VF9 ECO(7 chỗ)": {
            title: "VF9 ECO",
            specs: [
                "Động cơ: Điện",
                "Công suất cực đại: 402 HP",
                "Mô men xoắn cực đại: 620 Nm",
                "Dẫn động: AWD",
                "Kích thước (DxRxC): 5.118 x 2.254 x 1.696mm",
                "Trọng lượng (không tải): 2.719 Kg",
                "Quãng đường di chuyển/lần sạc đầy: 423Km - 580Km",
                "Thời gian sạc nhanh 20%-80%: ~30 phút",
                "Dung lượng pin (kWh): 92 hoặc 123",
                "Thời gian tăng tốc từ 0-100Km/h: ~6,5 giây",
            ],
            image: "/src/public/image/VF9-img-red.png"
        },
        "VF9 Plus(tuỳ chọn 7 chỗ)": {
            title: "VF9 Plus (7 chỗ)",
            specs: [
                "Động cơ: Điện",
                "Công suất cực đại: 408 HP",
                "Mô men xoắn cực đại: 620 Nm",
                "Dẫn động: AWD",
                "Kích thước (DxRxC): 5.118 x 2.254 x 1.696mm",
                "Trọng lượng (không tải): 2.799 Kg",
                "Quãng đường di chuyển/lần sạc đầy: 423Km - 580Km",
                "Thời gian sạc nhanh 20%-80%: ~30 phút",
                "Dung lượng pin (kWh): 92 hoặc 123",
                "Thời gian tăng tốc từ 0-100Km/h: ~6,5 giây",
            ],
            image: "/src/public/image/VF9-img-black.png"
        },
        "VF9 Plus(ghế cơ trưởng)": {
            title: "VF9 Plus (ghế cơ trưởng)",
            specs: [
                "Động cơ: Điện",
                "Công suất cực đại: 408 HP",
                "Mô men xoắn cực đại: 620 Nm",
                "Dẫn động: AWD",
                "Kích thước (DxRxC): 5.118 x 2.254 x 1.696mm",
                "Trọng lượng (không tải): 2.799 Kg",
                "Quãng đường di chuyển/lần sạc đầy: 626 Km",
                "Thời gian sạc nhanh 20%-80%: ~30 phút",
                "Dung lượng pin (kWh): 123 Kwh",
                "Thời gian tăng tốc từ 0-100Km/h: ~6,5 giây",
            ],
            image: "/src/public/image/VF9-Img.png"
            
        }
    };

    versions.forEach((version) => {
        version.addEventListener("click", function () {
            const name = this.querySelector(".nameee").textContent.trim();
            const data = versionData[name];

            if (data) {
                // Reset animation bằng cách xóa class và ép trình duyệt reflow
                infoContainer.classList.remove("fade-in", "fade-out");
                carImage.classList.remove("fade-in", "fade-out");

                // Ép trình duyệt reflow để đảm bảo animation chạy lại
                void infoContainer.offsetWidth;
                void carImage.offsetWidth;

                // Thêm hiệu ứng fade-out
                infoContainer.classList.add("fade-out");
                carImage.classList.add("fade-out");

                setTimeout(() => {
                    // Cập nhật thông tin
                    infoContainer.innerHTML = `
                        <h2>${data.title}</h2>
                        <ul>
                            ${data.specs.map((spec) => `<li><b>${spec.split(":")[0]}:</b> ${spec.split(":")[1]}</li>`).join("")}
                        </ul>
                    `;

                    // Cập nhật hình ảnh xe
                    carImage.src = data.image;

                    // Reset lại class để chạy lại animation
                    infoContainer.classList.remove("fade-out");
                    carImage.classList.remove("fade-out");

                    // Thêm hiệu ứng fade-in sau khi thay đổi nội dung
                    infoContainer.classList.add("fade-in");
                    carImage.classList.add("fade-in");

                    // Xóa class active trên tất cả các phiên bản
                    versions.forEach((v) => v.classList.remove("active"));
                    // Thêm class active cho phiên bản đang được chọn
                    version.classList.add("active");
                }, 300); // Đợi 300ms cho hiệu ứng fade-out trước khi cập nhật
            }
        });
    });
});
