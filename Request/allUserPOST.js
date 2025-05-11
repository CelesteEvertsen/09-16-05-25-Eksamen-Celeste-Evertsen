import {allLikedToCRUD} from "./data.js";

export async function postAllLikedUsers(request){
    try{
        const response = await axios.post(allLikedToCRUD, request)
        const data = await response.data
        const currentUser = JSON.parse(localStorage.getItem("allLikedUsers")) || [];
        const updatedUser = {
            ...request,
            _id: data._id,
        };
        currentUser.push(updatedUser);
        localStorage.setItem("allLikedUsers", JSON.stringify(currentUser));
        console.log("Postet likte brukere fra Local til CRUD",response.status)
        return data
    }catch(error){
        console.error("Error posting data", error.message.status);
    }
}