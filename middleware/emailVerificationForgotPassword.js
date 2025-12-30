const User = require('../models/user');

const verifyEmail = async (req,res,next)=>{
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user)next();
        else{
            return res.status(404).json({message:"User not registered"});
        }
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
} 

module.exports=verifyEmail;