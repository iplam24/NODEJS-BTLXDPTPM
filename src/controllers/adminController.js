const upload = require('../middleware/upload');
const fs = require("fs");
const path = require("path");
const {checkUser,createUser,updateUser,deleteUser,getAllUser,get1UserUpDate} = require('../models/userDAO');
const {addCarDB,getAllCar,addMoTa, addDetail,
        getAllDetails,deleteCar,
        getOneCar,
        getOneDetails,
        updateDetail,updateCar,updateCar2
} = require('../models/productDAO');
const { render } = require('ejs');
const getAdmin =(req,res)=>{
    res.render('admin/admin')
}
//Lấy về toàn bộ user và fill dữ liệu vào
const getAccount=async(req,res)=>{
    try {
        let users = await getAllUser();
        res.render("admin/account", { listUser: users, message: null });
    } catch (err) {
        res.send("❌ Lỗi lấy danh sách tài khoản!");
    }
}

//thêm user dưới quyền admin
const postCreateNewUserAdmin = async(req,res)=>{
    let { username, password, repassword, myname, email, phone, address,quyen } = req.body;
    let role = 2; // Mặc định khách hàng
    if (quyen === "nhanvien") {
        role = 1; // Nhân viên
    }
    // Kiểm tra dữ liệu nhập vào
    if (!username || !password || !repassword) {
        return res.send(`<script>
            alert("Vui Lòng nhập đầy đủ thông tin tài khoản.");
            window.location.href = "/admin/account"; 
        </script>`);
    }

    if (password !== repassword) {
        return res.send(`<script>
            alert("Mật khẩu không trùng khớp, vui lòng thử lại!.");
            window.location.href = "/admin/account"; 
        </script>`);
    }

    try {
        // Kiểm tra username đã tồn tại chưa
        let userExists = await checkUser(username);
        if (userExists) {
            return res.send(`<script>
                alert("Tài khoản đã tồn tại, vui lòng thử tên tài khoản khác");
                window.location.href = "/admin/account"; 
            </script>`);
        }
         // Tạo người dùng mới
         await createUser(username, password, myname, email, phone, address,role);
         console.log("✅ Đăng ký thành công người dùng mới:", username);
 
         return res.send(`<script>
             alert("Thêm tài khoản thành công!");
             window.location.href = "/admin/account"; 
         </script>`);
    }catch (err) {
    console.error("⚠ Lỗi hệ thống:", err);
    return res.send(`<script>
        alert("Lỗi hệ thống! Vui lòng thử lại.");
        window.location.href = "/admin/account"; 
    </script>`);
}
}
//lấy về  dữ liệu của user 
const getUpDateUser=async(req,res)=>{
    const userName = req.params.username;
    let result = await get1UserUpDate(userName);
    console.log("result>>>>",result);
    res.render("admin/suaTK", { ListUsers: result });
    
}

const postUpDateUserAdmin=async(req,res)=>{
    let { username, password, myname, email, phone, address,quyen } = req.body;
    let role = 2; // Mặc định khách hàng
    if (quyen === "nhanvien") {
        role = 1; // Nhân viên
    }
    await updateUser(username, password, myname, email, phone, address,role);
    console.log(`Bạn vừa thực hiện sửa dữ liệu của user ${username}`);
    return res.send(`<script>
        alert("Sửa tài khoản thành công!");
        window.location.href = "/admin/account"; 
    </script>`);
}
const postDeleteUser=async(req,res)=>{
    const userName = req.params.username;
    try {
        await deleteUser(userName);
        
        console.log(`Xoá thành công user ${userName}`);
        return res.send(`<script>
            alert("✅Xóa tài khoản thành công!");
            window.location.href = "/admin/account"; 
        </script>`);
    } catch (error) {
        res.status(500).send("❌ Lỗi khi xóa tài khoản!");
    }
}

const getCar =async(req,res)=>{
    try {
        const cars = await getAllCar();
        res.render("admin/cars", { cars }); 
    } catch (error) {
        console.error("❌ Lỗi khi hiển thị danh sách xe:", error);
        res.status(500).send("Lỗi khi hiển thị danh sách xe");
    }
}



//Tìm kiếm 
const searchAccount=async(req,res)=>{
    const {timkiem} = req.body;
    let result = await getUserUpDate(timkiem);
    res.render("admin/account", { listUser: result });
    console.log("Tìm kiếm thành công user: ",timkiem);
}

const themMoTa =async(req,res)=>{
    
}

const postDetail=async(req,res)=>{
    
    const {carID,title1,ds1,title2,ds2,title3,ds3,title4,ds4,title5,ds5} = req.body;
   let result = await addDetail(carID,title1,ds1,title2,ds2,title3,ds3,title4,ds4,title5,ds5);
    console.log("Them thanh cong chi tiet san pham cho xe ma: ",carID);
    return res.send(`<script>
        alert("Thêm xe thành công!");
        window.location.href = "/admin"; 
    </script>`);

}

const getDetail=async(req,res)=>{
    let details = await getAllDetails();
    res.render("admin/details",{Listdetails:details});
}

const deleteCaradmin = async (req, res) => {
    try {
        let carid = req.params.carid;
        let uploadPath = path.join(__dirname, "../public/upload");

        // Lấy danh sách file trong thư mục upload
        fs.readdir(uploadPath, (err, files) => {
            if (err) {
                console.error("Lỗi đọc thư mục upload:", err);
                return;
            }

            // Lọc các file có chứa carid
            files.forEach((file) => {
                if (file.includes(carid)) {
                    let filePath = path.join(uploadPath, file);
                    
                    // Xóa file
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Lỗi xóa file ${file}:`, err);
                        } else {
                            console.log(`Đã xóa ảnh: ${file}`);
                        }
                    });
                }
            });
        });

        // Xoá xe khỏi database
        await deleteCar(carid);
        
        // Lấy danh sách xe mới
        const cars = await getAllCar();
        
        console.log("Xoá thành công xe:", carid);
        res.render("admin/cars", { cars });

    } catch (error) {
        console.error("❌ Lỗi khi xoá xe:", error);
        res.status(500).send("Lỗi xoá xe");
    }
};

const getUpDateCar = async (req, res) => {
    try {
        let carid = req.params.carid;
        console.log("check carid:", carid);

        let car = await getOneCar(carid);
        let detail = await getOneDetails(carid);


        
        if (!detail) {
            detail = { Car_ID: "", Other_Field: "" };
        }

        const engineOptions = [
            { id: 1, name: "Động cơ xăng" },
            { id: 2, name: "Động cơ điện" },
            { id: 3, name: "Loại khác" }
        ];

        res.render("admin/updateCar", { car, detail, engineOptions });
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi server!");
    }
};
const postUpDateDetail=async(req,res)=>{
    const {carID,title1,ds1,title2,ds2,title3,ds3,title4,ds4,title5,ds5} = req.body;
    let result = await updateDetail(carID,title1,ds1,title2,ds2,title3,ds3,title4,ds4,title5,ds5)
    console.log("Cập nhật thành công!",carID);
    return res.send(`<script>
        alert("Cập nhật thành công !");
        window.location.href = "/admin"; 
    </script>`);
}

const handleImagePaths = (files) => {
    // Xử lý đường dẫn ảnh chung cho cả 2 hàm
    if (!files || !Array.isArray(files) || files.length === 0) {
        throw new Error("Không có ảnh nào được tải lên!");
    }
    
    return files.map(file => {
        let relativePath = file.path.replace(/\\/g, "/");
        relativePath = relativePath.replace(/^.*\/public\//, "/");
        return relativePath;
    });
};

const postUpDateCar = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi upload ảnh!", error: err.message });
        }

        let imagePaths = [];
        try {
            imagePaths = handleImagePaths(req.files); // Xử lý ảnh
        } catch (error) {
            console.error("❌ Lỗi khi xử lý đường dẫn ảnh:", error);
            return res.status(500).json({ message: "Lỗi xử lý ảnh!", error: error.message });
        }

        const { carID, model, version, price, color, engine, capkw, torquenm, accel, rangekm, fastcharge, drivertrain } = req.body;

        let dongco;
        if (engine === "xang") {
            dongco = 1;
        } else if (engine === "dien") {
            dongco = 2;
        } else if (engine === "khac") {
            dongco = 3;
        }

        try {
            if (imagePaths && imagePaths.length > 0) {
                await updateCar(carID, model, version, price, color, dongco, capkw, torquenm, accel, rangekm, fastcharge, drivertrain, imagePaths);
            } else {
                await updateCar2(carID, model, version, price, color, dongco, capkw, torquenm, accel, rangekm, fastcharge, drivertrain);
            }

            return res.send(`<script>
                alert("Cập nhật xe thành công!");
                window.location.href = "/admin"; 
            </script>`);
        } catch (dbError) {
            console.error("❌ Lỗi khi cập nhật dữ liệu vào database:", dbError);
            return res.status(500).json({ message: "Lỗi khi cập nhật dữ liệu vào database!", error: dbError.message });
        }
    });
};

const addCar = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi upload ảnh!", error: err.message });
        }

        let imagePaths = [];
        try {
            imagePaths = handleImagePaths(req.files); // Xử lý ảnh
        } catch (error) {
            console.error("❌ Lỗi khi xử lý đường dẫn ảnh:", error);
            return res.status(500).json({ message: "Lỗi xử lý ảnh!", error: error.message });
        }

        const { carID, model, version, price, color, engine, capkw, torquenm, accel, rangekm, fastcharge, drivertrain } = req.body;
        
        let dongco;
        if (engine === "xang") {
            dongco = 1;
        } else if (engine === "dien") {
            dongco = 2;
        } else if (engine === "khac") {
            dongco = 3;
        }

        try {
            await addCarDB(carID, model, version, price, color, dongco, capkw, torquenm, accel, rangekm, fastcharge, drivertrain, imagePaths);
            return res.send(`<script>
                alert("Thêm xe thành công!");
                window.location.href = "/admin"; 
            </script>`);
        } catch (dbError) {
            console.error("❌ Lỗi khi lưu vào database:", dbError);
            return res.status(500).json({ message: "Lỗi khi lưu dữ liệu vào database!", error: dbError.message });
        }
    });
};

module.exports ={getAdmin,getAccount,postCreateNewUserAdmin,getUpDateUser,postUpDateUserAdmin,postDeleteUser,getCar,addCar,searchAccount,
    postDetail,getDetail,deleteCaradmin,getUpDateCar,postUpDateDetail,postUpDateCar
}