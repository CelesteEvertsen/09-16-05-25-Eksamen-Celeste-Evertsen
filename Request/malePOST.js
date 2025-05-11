
import{LikedMaleToCRUD} from "./data.js"
export async function postLikedMaleUsers(request){
    try{
        const response = await axios.post(LikedMaleToCRUD, request)
        const data = await response.data
        const currentUser = JSON.parse(localStorage.getItem("likedUsersMale")) || [];
        const updatedUser = {
            ...request,
            _id: data._id,
        };
        currentUser.push(updatedUser);
        localStorage.setItem("likedUsersMale", JSON.stringify(currentUser));
        console.log("Postet likte brukere fra Local til CRUD", data)
        return data
    }catch(error){
        console.error("Error posting data", error);
    }
}