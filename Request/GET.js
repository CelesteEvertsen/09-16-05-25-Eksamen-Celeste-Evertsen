import { signUpsUrl } from "./data.js";

export async function getSignInData(request){
    try{
        const response = await axios.get(signUpsUrl);
        const data = await response.data
        console.log("Alle brukere er hentet",data);
        return data; // for å kunne bruke det senere

    }catch(error){
        console.error("Ingen data å hente", error)
        return []; // returnere tom liste
    }
};
