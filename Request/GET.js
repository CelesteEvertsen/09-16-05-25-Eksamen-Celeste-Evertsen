import { signUpsUrl, randomFemale } from "./data.js";
import {displayFemaleUsers} from "../Js/datingSite.js"
export async function getSignInData(){
    try{
        const response = await axios.get(signUpsUrl);
        const data = await response.data
        console.log("Alle brukere er hentet",data);
        return data; 

    }catch(error){
        console.error("Ingen data å hente", error)
        return [];
    }
};

// Henter Kvinner fra RandomApi
export async function getFemaleData(request){
    try{
        const response = await axios.get(randomFemale);
        const data = await response.data.results
        console.log("Kvinne hentet",data);
        displayFemaleUsers(data)
        return data;
    }catch(error){
        console.error("Ingen data å hente", error)
    }
};
getFemaleData();