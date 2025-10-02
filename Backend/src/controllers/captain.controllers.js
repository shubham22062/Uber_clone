import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }

    const {fullname,email,password,vehical }= req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message:'Captain already exists'});
    }

    const hashedPassword = await captainModel.hashedPassword(password);

    const captain = await createCaptain({
        fullname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehical.color,
        plate:vehical.plate,
        vehicalType:vehical.vehicalType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});

}

export const loginCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }

    const {email,password}= req.body;
    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});

    }

    const token = captain.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({token , captain});
}


export const getCaptainProfile = async (req,res,next)=>{
    res.status(200).json({captain:req.captain});
}

export const logoutCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({token});
    res.clearCookie('token');

    res.status(200).json({message:'Logout sucessfully'});
}

