const upload = require('../middleware/upload');
const {checkUser,createUser,updateUser,deleteUser,getAllUser,get1UserUpDate} = require('../models/userDAO');
const {addCarDB,getAllCar,addMoTa, addDetail,
        getAllDetails
} = require('../models/productDAO');
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

const addCar = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi upload ảnh!", error: err.message });
        }

        // 🟢 Kiểm tra `req.files`
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.send(`<script>
                alert("Không có ảnh nào được tải lên!");
                window.location.href = "/admin/car"; 
            </script>`);
        }

        const { carID, model, version, price, color, engine, capkw, torquenm, accel, rangekm, fastcharge, drivertrain } = req.body;
       
        let dongco;
        if (engine === "xang") {
            dongco = 1; 
        }else if(engine==="dien"){
            dongco=2;
        }else if(engine==="khac"){
            dongco=3
        }
        // 🟢 Chỉnh sửa đường dẫn ảnh (chỉ giữ `/upload/...`)
        let imagePaths;
        try {
            imagePaths = req.files.map(file => {
                let relativePath = file.path.replace(/\\/g, "/"); // Chuyển dấu `\` thành `/`
                relativePath = relativePath.replace(/^.*\/public\//, "/"); // Bỏ đi phần `/public/`
                return relativePath; // Kết quả chỉ còn `/upload/...`
            });

            if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
                throw new Error("imagePaths không phải là mảng hợp lệ!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi xử lý đường dẫn ảnh:", error);
            return res.status(500).json({ message: "Lỗi xử lý ảnh!", error: error.message });
        }

        console.log("✅ Ảnh được lưu vào CSDL với đường dẫn:", imagePaths);

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
module.exports ={getAdmin,getAccount,postCreateNewUserAdmin,getUpDateUser,postUpDateUserAdmin,postDeleteUser,getCar,addCar,searchAccount,
    postDetail,getDetail
}