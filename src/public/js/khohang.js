// Danh sách xe trong kho (sẽ lấy từ localStorage nếu có)
let inventory = JSON.parse(localStorage.getItem("inventory")) || [
    { id: "X001", name: "VinFast Lux A2.0", price: 1200000000, stock: 5 },
    { id: "X002", name: "VinFast VF 8", price: 1300000000, stock: 3 },
];

// Hàm hiển thị danh sách xe trong kho
function renderInventory() {
    let inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    inventory.forEach((car, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.name}</td>
            <td>${car.price.toLocaleString()} VNĐ</td>
            <td>
                <input type="number" min="0" value="${car.stock}" onchange="updateStock(${index}, this.value)">
            </td>
            <td>
                <button class="edit-btn" onclick="editCar(${index})">Sửa</button>
                <button class="delete-btn" onclick="deleteCar(${index})">Xóa</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });

    // Lưu danh sách kho vào localStorage
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Hàm thêm xe mới vào kho
function addCar() {
    let name = document.getElementById("carName").value.trim();
    let price = parseInt(document.getElementById("carPrice").value);
    let stock = parseInt(document.getElementById("carStock").value);

    if (name === "" || isNaN(price) || isNaN(stock) || stock < 0 || price <= 0) {
        alert("Vui lòng nhập thông tin hợp lệ!");
        return;
    }

    let newCar = {
        id: "X" + (inventory.length + 1).toString().padStart(3, "0"),
        name: name,
        price: price,
        stock: stock
    };

    inventory.push(newCar);
    renderInventory();

    // Xóa nội dung trong ô input
    document.getElementById("carName").value = "";
    document.getElementById("carPrice").value = "";
    document.getElementById("carStock").value = "";
}

// Hàm cập nhật số lượng xe trong kho
function updateStock(index, newStock) {
    if (isNaN(newStock) || newStock < 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }
    inventory[index].stock = parseInt(newStock);
    renderInventory();
}

// Hàm sửa thông tin xe trong kho
function editCar(index) {
    let car = inventory[index];

    // nhập thong tin mới
    let newName = prompt("Nhập tên xe", car.name);
    let newPrice = prompt("Nhập giá xe", car.price);
    let newStock = prompt("Nhập số lượng", car.stock);

    // kiem tra du lieu hop le
    if (newName === null || newPrice === null || newStock === null) {
        return; // Hủy nếu người dùng nhấn Cancel
    }
    if (newName === "" || isNaN(newPrice) || isNaN(newStock) || newStock < 0 || newPrice <= 0) {
        alert("Thông tin không hợp lệ!");
        return;
    }

    //cập nhật thông tin mới    
    inventory[index].name = newName.trim();
    inventory[index].price = parseInt(newPrice);
    inventory[index].stock = parseInt(newStock);

    renderInventory();
}

// Hàm xóa xe khỏi kho
function deleteCar(index) {
    if (confirm("Bạn có chắc muốn xóa xe này khỏi kho?")) {
        inventory.splice(index, 1);
        renderInventory();
    }
}

// Gọi hàm để hiển thị danh sách xe ban đầu
renderInventory();
