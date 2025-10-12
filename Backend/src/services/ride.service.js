import { populate } from "dotenv";
import rideModel from "../models/ride.model";
import * as mapService from "./maps.service.js";
import bcrypt from "bcrypt"
import crypto from "crypto"

export async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');

    }

    const distanceTime = await mapService.getDistanceTime(pickup,destination)

    const baseFare = {
        auot:30,
        car:50,
        moto:20,
    };

    const perKmRate = {
        auto:10,
        car:15,
        moto:8,

    };

    const perMinuteRate = {
        auto:2,
        car:3,
        moto:1.5,
    };


    const fare ={
        auot:Math.round(
            baseFare.auto+(distanceTime.distance.value/1000)*perKmRate.auto+
            (distanceTime.duartion.value/60)*perMinuteRate.auto
        ),

        car:Math.round(
            baseFare.car+
            (distanceTime.distance.value/1000)*perKmRate.car+
            (distanceTime.duartion.value/60)*perMinuteRate.car
        ),

        moto:Math.round(
            baseFare.moto+
            (distanceTime.distance.value/1000)*perKmRate.moto+
            (distanceTime.duartion.value/60)*perMinuteRate.moto
        ),
    };

    return fare;
    

}

function getOtp(num){
    function generateOtp(num){
        const otp = crypto
        .randomInt(Math.pow(10, num-1),Math.pow(10,num))
        .toString();
        return otp;
    }
    return generateOtp(num);
}


export async function createRide({user,pickup,destination,vehicleType}){
    if(!user||!pickup||!destination||!vehicleType){
        throw new Error("All field are required");
    }
    const fare = await getFare(pickup,destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(4);
        fare:fare[vehicleType]
    });


    return ride;
}


export async function confirmRide({rideId,captain}){
    if(!rideId){
        throw new Error("Ride id is required")
    }


    await rideModel.findOneAndUpdate(
        {_id:rideId},
        {
            status:"accepted",
            captain:captain._id,
        }
    );


    const ride = await rideModel
    .findOne({_id: rideId})
    .populate('user')
    .populate("captain")
    .select('+otp');


    if(!ride){
        throw new Error("Ride not Found")
    }

    return ride;
}

export async function startRide({rideId, otp, captain}){
    if(!rideId || !otp){
        throw new Error("Ride id and OTP are required");
    }


    const ride = await rideModel
    .findOne({_id : rideId})
    .populate("user")
    .populate('captain')
    .select("+otp")


    if(!ride){
        throw new Error("Ride not found");
    }

    if(ride.status!=="accepted"){
        throw new Error("Ride not accepted");
    }

    if(ride.otp!==otp){
        throw new Error ("Invalid OTP")
    }

    await rideModel.findOneAndUpdate({_id:rideId},{status:"ongoing"});
    return ride;
}


export async function endRide({rideId,captain}){
    if(!rideId){
        throw new Error ("Ride id is required");
    }


    const ride = await rideModel
    .findOne({_id:rideId})
    .populate("user")
    .populate('captain')
    .select("otp");


    if(!ride){
        throw new Error("Ride not found");
    }

    if(ride.status!=="ongoing"){
        throw new Error("Ride not ongoing")
    }

    await rideModel.findOneAndUpdate({_id:rideId},{status:"completed"});

    return ride;
}