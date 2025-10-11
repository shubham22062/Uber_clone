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