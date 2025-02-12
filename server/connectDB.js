import mongoose from "mongoose";


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGDB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(err){
        console.log(`Data Base Connection Error: ${err.message}`)
        process.exit(1);
    }
}


export default connectDB;