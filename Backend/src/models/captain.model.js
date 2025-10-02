import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'fullname must be atleast 3 character long'],
        },
        lastname:{
            type:String,
            minlength:[3,'Lastname must be at least 3 character long'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be atleast 3 character long'],

        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be atleast 3 charcter long'],


        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be atleast 1'],
        },
        vehicalTypes:{
            type:String,
            required:true,
            enum:['car', 'motorcycle','auto'],
        }
    },
    location:{
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
},{timestamps:true})



captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);

}

const captainModel = mongoose.model('captailModel',captainSchema);

export default captainModel;