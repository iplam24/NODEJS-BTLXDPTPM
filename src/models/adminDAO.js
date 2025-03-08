const connectDB =require('../config/connectDB');
const getAdmin=async(req,res)=>{
    //    
    res.render("admin/admin");
    }

const getAccount=async(req,res)=>{
//    
res.render("admin/account");
}

module.exports={getAdmin,getAccount}