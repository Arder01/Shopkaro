import express from 'express';
import User from './user.model.js';
import generateToken from '../middleware/generateToken.js';
//import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/register',async (req, res)=>{
    try{
        const{username,email,password} = req.body;
        //console.log("first step here");
        console.log(req.body);
        const user = new User({username,email,password});
        await user.save();
        res.status(201).send({message:"User registered successfully"});
    }catch(e){
    res.status(500).json({message:"Interanl Serer Error"});
    }
})

//login user endpoint
router.post('/login',async (req, res)=>{
    const{email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).send({message:'invalid password'});
        }
        const token = await generateToken(user._id);
        //console.log("User ID recieved:", user._id);
        try{res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            sameSite:'None'
        });}catch(err){
            console.log("could not patch token in cookies",err);
        }
        res.status(200).send({message:"login successful",token,user:{
            _id : user._id,
            email:user.email,
            username:user.username,
            role: user.role,
            profileImage:user.profileImage,
            bio:user.bio,
            profession:user.profession
        }});
    }catch(err){
        res.status(500).json({message:"Error Logged in user",err});
    }
});

//all users
// router.get('/users',verifyToken ,async(req,res)=>{
//     res.send({message:"Protected users"})
// })

//logout
router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).send({message:"logged out successfully"}) 
})

//delete user
router.delete('/users/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message:'User Not found'})
        }
        res.status(200).send({message:'User Deleted Succesfully'})
    }catch(err){
        console.log("Error deleting user",err);
        res.status(500).send({message:"Error deleting user",err});
    }
})

router.get('/users',async(req,res)=>{
    try{
        const users = await User.find({},'id email role').sort({createdAt: -1});
        res.status(200).send(users);
    }catch(err){
        console.log("Error fetching user",err);
        res.status(500).send({message:"Error fetching user",err});
    }
})

//update user role
router.put('/users/:id',async(req,res,)=>{
    try{
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id,{role},{new:true});
        if(!user){
            return res.status(404).send({message:'User not found'})
        }
        res.status(200).send({message:'User role updated successfully',user})
    }catch(err){
        console.log("Error Updating user role",err);
        res.status(500).send({message:"Error Updating user role",err});
    }
})

//edit or update profile
router.patch('/edit-profile',async (req,res)=>{
    try{
        const {userId,username,profileImage,bio,profession} = req.body;
        if(!userId){
            return res.status(400).send({message:'User ID is required'})
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({message:'User not found'})
        }
        //update profile
        if(username!==undefined)user.username = username;
        if(profileImage!==undefined)user.profileImage = profileImage;
        if(bio!==undefined)user.bio = bio;
        if(profession!==undefined)user.profession = profession;
        await user.save();
        res.status(200).send({message:'Profile updated successfully',user:{
            _id : user._id,
            email:user.email,
            username:user.username,
            role: user.role,
            profileImage:user.profileImage,
            bio:user.bio,
            profession:user.profession,
            role:user.role
        }})
    }catch(err){
        console.error("Error Updating user profile",err);
        res.status(500).send({message:'Error Updating user profile',err});
    }
})
export default router;