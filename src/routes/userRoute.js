const getLoginUser=(req,res)=>{
    if (req.session.user) {
        res.json({ loggedIn: true, username: req.session.user.usernameLogin });
        
    } else {
        res.json({ loggedIn: false });
    }
}
module.exports=getLoginUser;