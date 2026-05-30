import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../Models/model.js"



const genratetoken = (userId)=>
    jwt.sign({userId}, process.env.ACCESS_TOKEN,{expiresIn:"1m"}
)

const freshtoken = ()=>
    jwt.sign({userId},process.env.REFRESH_TOKEN, {expiresIn:"7d"})


export const register = async(req, resp)=>{
try {
const {email, password} = req.body;


const user = await User.findOne({email});
if(user){
    return resp.status(400).json({message:"User Exists!!!"})
}

const hashedpass = await bcrypt.hash(password,10);
await User.create({
    email, password:hashedpass,
});

resp.status(201).json({message:"User Registered successfuly"})
} catch (error) {
    console.log(error);
    resp.status(500).json({message:error.message})
    
}

}


export const login = async(req, resp)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email})

    if(!user){
        return resp.status(400).json({message:"user not found!!!"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
     
    if(!isMatch){
        return resp.status(400).json({message:"invalid email or password"})
    }

    const accesstoken = genratetoken(user._id);
    const refreshtoken = freshtoken(user._id)
    user.refreshtoken = refreshtoken;

    await user.save();

    resp.json({accesstoken,refreshtoken})
}

 export const refreshtoken = async (req, resp)=>{
    const {refreshtoken}= req.body;
    const user = await User.findOne({
        refreshtoken,
    })

    if(!user){
        return resp.status(403).json({message:"invalid token"})
    }

    
    jwt.verify(
        refreshtoken, process.env.REFRESH_TOKEN
)

const accesstoken = genratetoken(user._id);
resp.json({accesstoken})
}