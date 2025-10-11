import axios from 'axios'
import captainModel from '../models/captain.model'
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.ORS_API_KEY
export const getAddressCooridnate = async (address)=>{
    try {
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
      address
    )}`;
        const response = await axios.get(url);
        if(response.data.features && response.data.features.length>0){
            const [lng,lat] = response.data.features[0].geometry.coordinates;
            return {ltd :lat,lng:lng}
        }else{
            throw new Error("Unable to fetch coordinate");
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getDistanceTime = async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error("Origin and destination are required");
    }
    try{
        const originCoords = await getAddressCoordinate(origin);
        const destination = await getAdressCoordinate(destination);
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoords.lng},${originCoords.ltd}&end=${destinationCoords.lng},${destinationCoords.ltd}`;

        const response = await axios.get(url);

        if(response.data && response.data.routes && response.data.routes.length>0){
            const{distance ,duration} = response.data.routes[0].summary;
            return{
                distance:(distance/1000).toFixed(2)+"km",
                duration:(duration/60).toFixed(1)+"mins",
            };
        }else{
            throw new Error("unable to fetch the distance and time")
        }
    }catch(err){
        console.error(err);
        throw err;
    }
};

export const getAutoCompleteSuggestions = async (input)=>{
    if(!input){
        throw new Error("query is required");

    }

    try {
       const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(
      input
    )}`;
     const response = await axios.get(url);

     if(response.data.features && response.data.features.length>0){
        return response.data.features.map((f)=>f.properties.label);
     }else{
        throw new Error("Unable to fetch suggestion");
     }
    } catch (error) {
        console.error(err);
        throw err;
    }
};

export const getCaptainsInTheRadius = async (ltd,lng,radius)=>{
    const captains = await captainModel.find({
        location:{
            $geowithin:{
                $centerSphere:[[ltd,lng],radius/6371],
            }
        }
    });

    return captains;
};

