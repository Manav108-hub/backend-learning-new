import mongoose from "mongoose"
import {DB_NAME} from"../constants.js"

const connectDB = async ()=>{
    try {
        const dbInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        // console.log(dbInstance)
        console.log(`Mongo connected !! , mongo port : ${dbInstance.connection.host}`)
    } catch (error) {
        console.log("ERROR : " , error);
        process.exit(1);        
    }
}

export default connectDB


//  this is for learning 
// (async function connectDD(){
//     try{
//        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
//        app.on("ERROR" , (error) => {
//         console.log("error : " , error);
//         throw error
//        })

//        app.listen(PORT , ()=>{
//             console.log("server is listening on : " , PORT);
            
//        })
//     }catch(error){
//         console.log("ERROR : " , error);
//         throw err
//     }
// })()