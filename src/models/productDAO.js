
const connectDB = require('../config/connectDB');
const sql = require('mssql'); // Import sql để sử dụng sql.Decimal
const addCarDB = async (CarID, Model, Version, Price, Color, Engine, Cap_KW, Torque_NM, Accel, Range_km, FastCharge, Drivertrain, imagePaths) => {
    try {
        let pool = await connectDB();

        // 🟢 Ép kiểu số để tránh lỗi dữ liệu
        Price = parseFloat(Price) || 0;
        Cap_KW = parseFloat(Cap_KW) || 0;
        Torque_NM = parseFloat(Torque_NM) || 0;
        Accel = parseFloat(Accel) || 0;
        Range_km = parseFloat(Range_km) || 0;
        FastCharge = parseFloat(FastCharge) || 0;

        const imagePathsFormatted = imagePaths.map(img => `/upload/${img.split('/').pop()}`);

        // 🟢 Chuyển danh sách ảnh thành JSON để lưu vào CSDL
        const imageFolderString = JSON.stringify(imagePathsFormatted);

        // 🟢 Thêm xe vào bảng Cars
        const result = await pool.request()
            .input('CarID', sql.NVarChar(10), CarID)
            .input('Model', sql.NVarChar(50), Model)
            .input('Version', sql.NVarChar(20), Version)
            .input('Price', sql.Decimal(15,2), Price)
            .input('Color', sql.NVarChar(50), Color)
            .input('Engine', sql.NVarChar(100), Engine)
            .input('Cap_KW', sql.Decimal(10,2), Cap_KW)
            .input('Torque_NM', sql.Decimal(10,2), Torque_NM)
            .input('Accel', sql.Decimal(5,2), Accel)
            .input('Range_km', sql.Decimal(10,2), Range_km)
            .input('FastCharge', sql.Decimal(5,2), FastCharge)
            .input('Drivertrain', sql.NVarChar(50), Drivertrain)
            .input('ImageFolder', sql.NVarChar(255), imageFolderString)
            .query(`
                INSERT INTO tbl_cars (Car_ID, Model, Version, Price, Color, Engine, Cap_KW, Torque_NM, Accel, Range_KM, FastCharge, Drivertrain, ImageFolder) 
                OUTPUT INSERTED.Car_ID
                VALUES (@CarID, @Model, @Version, @Price, @Color, @Engine, @Cap_KW, @Torque_NM, @Accel, @Range_km, @FastCharge, @Drivertrain, @ImageFolder)
            `);

        const insertedCarID = result.recordset[0].Car_ID;

        // 🟢 Thêm ảnh vào bảng CarImages
        for (let imgPath of imagePaths) {
            await pool.request()
                .input('CarID', sql.NVarChar(10), insertedCarID)
                .input('ImagePath', sql.NVarChar(255), imgPath)
                .query(`INSERT INTO tbl_carimages (Car_ID, ImagePath) VALUES (@CarID, @ImagePath)`);
        }

        return { success: true, message: "Thêm xe thành công!", CarID: insertedCarID };

    } catch (error) {
        console.error("❌ Lỗi khi thêm xe vào database:", error);
        return { success: false, message: "Lỗi khi lưu vào CSDL", error };
    }
};

const getAllCar = async () => {
    try {
        let pool = await connectDB();
        let result = await pool.request().query(`
            SELECT c.*, 
                   (SELECT STRING_AGG(ci.ImagePath, ',') FROM tbl_carimages ci WHERE ci.Car_ID = c.Car_ID) AS ImagePaths
            FROM tbl_cars c
        `);

        // 🟢 Xử lý ảnh thành mảng thay vì chuỗi
        const cars = result.recordset.map(car => {
            return {
                ...car,
                ImagePaths: car.ImagePaths ? car.ImagePaths.split(',') : []  // Chuyển chuỗi ảnh thành mảng
            };
        });

        return cars;
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách xe:", error);
        return [];
    }
};


module.exports = { addCarDB,getAllCar };