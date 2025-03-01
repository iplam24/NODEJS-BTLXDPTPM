const sql = require('mssql');

const config = {
    user: 'sa',
    password: '',
    server: 'localhost',
    database: 'thunghiem',
    port: 1433,  // Đảm bảo đúng cổng
    options: {
        encrypt: false, // Không mã hóa (nếu chưa cấu hình SSL)
        trustServerCertificate: true
    }
};

async function testConnection() {
    try {
        const pool = await sql.connect(config);
        console.log("✅ Kết nối thành công!");
        pool.close();
    } catch (err) {
        console.error("❌ Lỗi kết nối:", err);
    }
}

testConnection();
