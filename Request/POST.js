 import { signUpsUrl,LikedFemaleToCRUD } from "./data.js"; 

// Poster Nye registreinger

export async function postSignUpData(request){
    try{
        const response = await axios.post(signUpsUrl, request );
        const data = await response.data;
        console.log("Ny bruker er nå Postet", response.status);

    }catch(error){
        console.error("Ikke mulig å poste ny bruker", error.status)
    }
}

// Poster Kvinner
export async function postFemaleLikedUsers(request){
    try{
        const response = await axios.post(LikedFemaleToCRUD, request)
        const data = await response.data
        const currentUser = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];
        const updatedUser = {
            ...request,
            _id: data._id,
        };
        currentUser.push(updatedUser);
        localStorage.setItem("likedUsersFemale", JSON.stringify(currentUser));
        console.log("Postet likte brukere fra Local til CRUD", response.status)
        return data
    }catch(error){
        console.error("Error posting data",  error.message.status);
    }
}
// spred operator gjør koden kortere, vet at ..request 
// henter all info jeg vil post å bruker _id for å legge til slik at jeg kan bruke det senere i local
// å bruke det for å  slette senere.