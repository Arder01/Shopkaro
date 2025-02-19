import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';
const JWT_SECRET = process.env.JWT_SECRET_KEY||"failsafe_secret";
const generateToken = async (userId)=>{
    try{
        const user = await User.findById(userId);
        if(!user){
            console.log("Couldn't find user");
            return null;
        }
        //console.log("User Found",user);
        const token = jwt.sign({userId: user._id,role:user.role},JWT_SECRET,
            {expiresIn: "1h",}
        );
        //console.log("generate Token",token);
        return token;
    }catch(err){
        console.error("Error generating token",err);
        return null;
    }
}

export default generateToken;