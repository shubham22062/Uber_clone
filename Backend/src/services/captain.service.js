import captainModel from "../models/captain.model"

export  const createCaptain = async({firstname,lastname,email,password,color,plate,capacity,vehicalType})=>{
    if(!firstname || !email || !passwords || !color || !plate || !capacity || !vehicalType){
        throw new Error('All field are required');
    }

    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehical:{
            color,
            plate,
            capacity,
            vehicalType
        }

    })
    return captain;
}