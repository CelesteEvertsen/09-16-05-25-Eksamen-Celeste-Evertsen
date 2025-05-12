import { signUpsUrl } from "./data.js";

export async function getSignInData(){
    try{
        const response = await axios.get(signUpsUrl);
        const data = await response.data 
        console.log("Alle brukere er hentet",response.status);
        return data; 

    }catch(error){
        console.error("Ingen data å hente",  error.message.status);
        return [];
    }
};

