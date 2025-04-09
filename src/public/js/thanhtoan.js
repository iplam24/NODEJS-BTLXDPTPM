// Danh sách xe mẫu
let cart = [
    { name: "VinFast Lux A2.0", price: 1200000000, quantity: 1 },
    { name: "VinFast VF e34", price: 690000000, quantity: 1 }
    
];

// Hiển thị danh sách xe trong giỏ hàng
function renderCart() {
    let cartItems = document.getElementById("cart-items");
    let totalPrice = 0;
    cartItems.innerHTML = "";

    cart.forEach((car, index) => {
        let row = document.createElement("tr");
        let totalCarPrice = car.price * car.quantity;
        totalPrice += totalCarPrice;

        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.price.toLocaleString()} VNĐ</td>
            <td>
                <button onclick="updateQuantity(${index}, -1)">-</button>
                ${car.quantity}
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>${totalCarPrice.toLocaleString()} VNĐ</td>
            <td><button onclick="removeItem(${index})">❌</button></td>
        `;

        cartItems.appendChild(row);
    });

    document.getElementById("total-price").textContent = totalPrice.toLocaleString();
}

// Cập nhật số lượng xe
function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
}

// Xóa xe khỏi giỏ hàng
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Xử lý khi bấm "Xác nhận thanh toán"
document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    let totalAmount = document.getElementById("total-price").textContent;

    alert(`
        ✅ Đơn hàng của bạn đã được xác nhận!
        - Khách hàng: ${name}
        - Số điện thoại: ${phone}
        - Email: ${email}
        - Địa chỉ: ${address}
        - Phương thức thanh toán: ${paymentMethod}
        - Tổng tiền: ${totalAmount} VNĐ
    `);
});

// Gọi hàm để hiển thị giỏ hàng ban đầu
renderCart();

function thanhToanZaloPay() {
    fetch('/payment', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.payUrl) {
                window.open(data.payUrl, '_blank'); // Mở trang thanh toán ZaloPay trong tab mới
            } else {
                alert("Lỗi khi tạo thanh toán!");
            }
        })
        .catch(error => console.error("Lỗi:", error));
}