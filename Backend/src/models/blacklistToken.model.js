import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        reuired:true,
        unique:true,
    },
    expireAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
    
},{timestamps:true});


const BlacklistToken = mongoose.model('BlacklistToken',blacklistTokenSchema);

export default BlacklistToken;