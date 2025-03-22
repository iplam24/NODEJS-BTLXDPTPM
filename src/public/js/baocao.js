document.addEventListener("DOMContentLoaded", function () {
    // Dữ liệu mẫu
    let salesData = [
        { model: "VinFast VF8", sold: 120, revenue: 240000000000 },
        { model: "VinFast VF9", sold: 90, revenue: 180000000000 },
        { model: "VinFast Lux A2.0", sold: 150, revenue: 225000000000 },
        { model: "VinFast Fadil", sold: 200, revenue: 160000000000 },
        { model: "VinFast President", sold: 50, revenue: 75000000000 }
    ];

    // Tính toán tổng doanh thu và số xe đã bán
    let totalRevenue = salesData.reduce((sum, car) => sum + car.revenue, 0);
    let totalCarsSold = salesData.reduce((sum, car) => sum + car.sold, 0);
    let totalProfit = totalRevenue * 0.1; // Giả sử lợi nhuận 10%

    // Hiển thị thông tin tổng quan
    document.getElementById("totalRevenue").innerText = totalRevenue.toLocaleString() + " VND";
    document.getElementById("totalCarsSold").innerText = totalCarsSold;
    document.getElementById("totalProfit").innerText = totalProfit.toLocaleString() + " VND";

    // Hiển thị danh sách xe bán chạy
    let bestSellingTable = document.getElementById("bestSellingCars");
    salesData.sort((a, b) => b.sold - a.sold).forEach((car, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${car.model}</td>
            <td>${car.sold}</td>
        `;
        bestSellingTable.appendChild(row);
    });

    // Dữ liệu cho biểu đồ
    let ctx = document.getElementById("revenueChart").getContext("2d");
    let chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: salesData.map(car => car.model),
            datasets: [{
                label: "Doanh thu (VND)",
                data: salesData.map(car => car.revenue),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
