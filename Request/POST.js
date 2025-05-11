 import { signUpsUrl,LikedUsersToCRUD } from "./data.js"; 

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

export async function postLikedUsers(request){
    try{
        const response = await axios.post(LikedUsersToCRUD, request)
        const data = await response.data
        const currentUser = JSON.parse(localStorage.getItem("likedUsers")) || [];
        const updatedUser = {
            ...request,
            _id: data._id,
        };
        currentUser.push(updatedUser);
        localStorage.setItem("likedUsers", JSON.stringify(currentUser));
        console.log("Postet likte brukere fra Local til CRUD", data)
        return data
    }catch(error){
        console.error("Error posting data", error);
    }
}