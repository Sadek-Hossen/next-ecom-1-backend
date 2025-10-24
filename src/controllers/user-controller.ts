import { Request,Response } from "express"
import User from "../models/user-model";
import jwtToken from "jsonwebtoken"

const JWT_TOKEN = process.env.JWT_TOKEN || "sadfe23nknfasjkl3t4fqr5wwllfjfsdaew"
export const signIn = async (req:Request,res:Response)=>{
    try {
        const {name,email,password}= req.body;

        if(!name || !email || !password){
          return  res.send("all feild required")
        }

          const user = await User.create({
                name,
                email,
                password
            })

          
    
            const token = jwtToken.sign
            ({id:user._id.toString(),email:user?.email},JWT_TOKEN,{
              expiresIn:"7d"
            })
            res.cookie("token",token,{
              httpOnly:false,
              secure:false,
              sameSite:'lax',
              maxAge:7*24*60*60*1000,

            })


            res.status(200).json({
                message:"User create succesfully",
                user,
                token
            })

            
    } catch (error) {
      res.status(401).json({
        message:"Internal server error from sign in controller",
        error
      })
    }
}
export const loginUser = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchUser = user.password === password;
    if (!matchUser) {
      return res.status(401).json({ message: "Incorrect password" });
    }


    
            const token = jwtToken.sign
            ({id:user._id.toString(),email:user?.email},JWT_TOKEN,{
              expiresIn:"7d"
            })
            res.cookie("token",token,{
              httpOnly:false,
              secure:false,
              sameSite:'lax',
              maxAge:7*24*60*60*1000,

            })

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token

    });

    console.log("User logged in:", user.email);

  } catch (error) {
    // 5️⃣ Catch any server error
    res.status(500).json({
      message: "Login failed",
      error
    });
  }
};
export const getUser = async ( req:Request,res:Response)=>{
try {
  const email = (req as any).user?.email;
  console.log(email)
  if(!email){
    return res.send( "user feild required")
  }

    const user  = await User.findOne({email})



    res.status(200).json({
      message:"user get succesfully",
      user
    })
  }
catch (error) {
    return  res.status(400).json({
      message:"user get faild from get controller"
    })
}

}


export const logout = async (req:Request,res:Response)=>{
  res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:"none"
  });

  return res.status(200).json({message:"user logout succesfully"})
}

