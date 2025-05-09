 import { signUpsUrl } from "./data.js"; 

// Poster Nye registreinger

export async function postSignUpData(request){
    try{
        const response = await axios.post(signUpsUrl, request );
        const data = await response.data;
        console.log("Ny bruker er nå Postet", data)

    }catch(error){
        console.error("Ikke mulig å poste ny bruker", error)
    }
}