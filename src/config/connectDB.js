require('dotenv').config();

const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD|| '',
    server: process.env.DB_SERVER|| 'localhost',
    database: process.env.DB_DATABASE,
    port:Number(process.env.DB_PORT),  // Đảm bảo đúng cổng
    options: {
        encrypt: false, // Không mã hóa (nếu chưa cấu hình SSL)
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('✅ Kết nối SQL Server thành công!');
        return pool;
    } catch (err) {
        console.error('❌ Lỗi kết nối SQL Server:', err);
        throw err;
    }
};



module.exports = connectDB;