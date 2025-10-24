import mongoose from "mongoose"


export const connectDb = async (url:string)=>{

    try {
        mongoose.connect(url)
        console.log("database connected")
    } catch (error) {
        console.log("database connection faild", error)
        
    }

}