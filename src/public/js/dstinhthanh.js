        // Load danh sách tỉnh/thành
        async function loadProvinces() {
            let response = await fetch("https://provinces.open-api.vn/api/?depth=1");
            let provinces = await response.json();

            let provinceSelect = document.getElementById("province");
            provinceSelect.innerHTML = `<option value="" disabled selected>Chọn tỉnh/thành</option>`;

            provinces.forEach(province => {
                let option = document.createElement("option");
                option.value = province.code;
                option.textContent = province.name;
                provinceSelect.appendChild(option);
            });
        }

        // Load danh sách huyện khi chọn tỉnh
        async function loadDistricts() {
            let provinceCode = document.getElementById("province").value;
            let response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            let provinceData = await response.json();

            let districtSelect = document.getElementById("district");
            districtSelect.innerHTML = `<option value="" disabled selected>Chọn huyện/thị xã</option>`;
            districtSelect.disabled = false;

            provinceData.districts.forEach(district => {
                let option = document.createElement("option");
                option.value = district.code;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            });

            // Reset dropdown xã/phường
            document.getElementById("ward").innerHTML = `<option value="" disabled selected>Chọn xã/phường</option>`;
            document.getElementById("ward").disabled = true;
        }

        // Load danh sách xã khi chọn huyện
        async function loadWards() {
            let districtCode = document.getElementById("district").value;
            let response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            let districtData = await response.json();

            let wardSelect = document.getElementById("ward");
            wardSelect.innerHTML = `<option value="" disabled selected>Chọn xã/phường</option>`;
            wardSelect.disabled = false;

            districtData.wards.forEach(ward => {
                let option = document.createElement("option");
                option.value = ward.code;
                option.textContent = ward.name;
                wardSelect.appendChild(option);
            });
        }

        // Gọi hàm load tỉnh/thành khi trang web tải xong
        document.addEventListener("DOMContentLoaded", loadProvinces);