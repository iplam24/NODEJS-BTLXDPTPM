document.addEventListener("DOMContentLoaded", function () {
    const orders = [
        { id: 1, customer: "Nguyễn Văn A", car: "Vinfast VF8", total: 900000000, status: "Chưa thanh toán", paymentMethod: "" },
        { id: 2, customer: "Trần Thị B", car: "Vinfast VF9", total: 1200000000, status: "Đã thanh toán", paymentMethod: "Chuyển khoản" }
    ];

    function renderOrders() {
        const orderList = document.getElementById("order-list");
        orderList.innerHTML = "";

        orders.forEach(order => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.car}</td>
                <td>${order.total.toLocaleString()} VNĐ</td>
                <td class="status">${order.status}</td>
                <td class="payment-method">
                    ${order.paymentMethod ? order.paymentMethod : "Chưa chọn"}
                </td>
                <td>
                    <button class="delete-btn" data-id="${order.id}">Xóa</button>
                </td>
                <td>
                    ${order.status === "Chưa thanh toán" 
                        ? `<button class="confirm-payment" data-id="${order.id}">Xác nhận</button>` 
                        : `<span class="paid">✔ Đã thanh toán</span>`
                    }
                </td>
            `;

            orderList.appendChild(row);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll(".confirm-payment").forEach(button => {
            button.addEventListener("click", function () {
                const orderId = this.getAttribute("data-id");
                const order = orders.find(o => o.id == orderId);
                
                if (order) {
                    const paymentMethod = prompt("Nhập phương thức thanh toán (Tiền mặt / Chuyển khoản):");
                    
                    if (paymentMethod && (paymentMethod.toLowerCase() === "tiền mặt" || paymentMethod.toLowerCase() === "chuyển khoản")) {
                        order.status = "Đã thanh toán";
                        order.paymentMethod = paymentMethod;
                        renderOrders();
                        alert(`✅ Đơn hàng #${orderId} đã được xác nhận thanh toán bằng ${paymentMethod}!`);
                    } else {
                        alert("⚠️ Phương thức thanh toán không hợp lệ! Vui lòng nhập 'Tiền mặt' hoặc 'Chuyển khoản'.");
                    }
                }
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const orderId = this.getAttribute("data-id");
                const index = orders.findIndex(o => o.id == orderId);
                if (index !== -1) {
                    orders.splice(index, 1);
                    renderOrders();
                    alert(`🗑 Đơn hàng #${orderId} đã bị xóa.`);
                }
            });
        });
    }

    renderOrders();
});
/*
// Thêm sự kiện cho nút "Thêm đơn hàng"
document.querySelector("#add-order-btn").addEventListener("click", function () {
    const order = {
        id: orders.length + 1,
        customer: prompt("Nhập tên khách hàng:"),
        car: prompt("Nhập tên xe:"),
        total: parseFloat(prompt("Nhập tổng tiền (VNĐ):")),
        status: "Chưa thanh toán",
        paymentMethod: ""
    };
    if (order.customer && order.car && !isNaN(order.total)) {
        orders.push(order);
        renderOrders();
        alert(`✅ Đơn hàng mới đã được thêm!`);
    } else {
        alert("⚠️ Vui lòng nhập đầy đủ thông tin hợp lệ!");
    }
});
*/