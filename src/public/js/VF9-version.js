document.addEventListener("DOMContentLoaded", function () {
    const versions = document.querySelectorAll(".VF9-icon");
    const infoContainer = document.querySelector(".vf9-in4-2");
    const carImage = document.getElementById("carImagee");

    const versionData = {
        "VF9 ECO(7 chỗ)": {
            title: "VF9 ECO",
            specs: [
                "Động cơ: 2.0 Turbo",
                "Công suất cực đại: 227 HP",
                "Mô men xoắn cực đại: 380 Nm",
                "Hộp số: 9AT",
                "Cỡ lốp: 245/40R19",
                "Kích thước (DxRxC): 4.884 x 1.889 x 1.447 mm",
                "Trọng lượng (không tải): 1.650 Kg",
            ],
            image: "/src/public/image/VF9-Img.png"
        },
        "VF9 Plus(tuỳ chọn 7 chỗ)": {
            title: "VF9 Plus (7 chỗ)",
            specs: [
                "Động cơ: 2.5 Turbo",
                "Công suất cực đại: 300 HP",
                "Mô men xoắn cực đại: 420 Nm",
                "Hộp số: 10AT",
                "Cỡ lốp: 255/45R20",
                "Kích thước (DxRxC): 5.100 x 2.000 x 1.500 mm",
                "Trọng lượng (không tải): 1.750 Kg",
            ],
            image: "/src/public/image/VF9-img-black.png"
        },
        "VF9 Plus(ghế cơ trưởng)": {
            title: "VF9 Plus (ghế cơ trưởng)",
            specs: [
                "Động cơ: 3.0 Turbo",
                "Công suất cực đại: 350 HP",
                "Mô men xoắn cực đại: 500 Nm",
                "Hộp số: 10AT",
                "Cỡ lốp: 265/45R21",
                "Kích thước (DxRxC): 5.300 x 2.050 x 1.550 mm",
                "Trọng lượng (không tải): 1.850 Kg",
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
