
// Danh sách đơn hàng mẫu (lấy từ localStorage nếu có)
let orders = JSON.parse(localStorage.getItem("orders")) || [
    { id: "DH001", customer: "Nguyễn Văn A", car: "VinFast Lux A2.0", total: 1200000000, status: "pending" },
    { id: "DH002", customer: "Trần Thị B", car: "VinFast VF 8", total: 1300000000, status: "shipping" },
];

// Hàm hiển thị danh sách đơn hàng
function renderOrders() {
    let orderList = document.getElementById("order-list");
    orderList.innerHTML = "";

    orders.forEach((order, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.car}</td>
            <td>${order.total.toLocaleString()} VNĐ</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="pending" ${order.status === "pending" ? "selected" : ""}>Chờ duyệt</option>
                    <option value="shipping" ${order.status === "shipping" ? "selected" : ""}>Đang giao</option>
                    <option value="completed" ${order.status === "completed" ? "selected" : ""}>Hoàn thành</option>
                </select>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteOrder(${index})">Xóa</button>
            </td>
        `;
        orderList.appendChild(row);
    });

    // Lưu danh sách đơn hàng vào localStorage
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Hàm cập nhật trạng thái đơn hàng
function updateStatus(index, newStatus) {
    orders[index].status = newStatus;
    renderOrders();
}

// Hàm xóa đơn hàng
function deleteOrder(index) {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
        orders.splice(index, 1);
        renderOrders();
    }
}

// Gọi hàm để hiển thị danh sách ban đầu
renderOrders();
