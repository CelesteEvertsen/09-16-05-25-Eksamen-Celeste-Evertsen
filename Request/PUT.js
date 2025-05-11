
import{signUpsUrl} from "./data.js"

export async function putEditUser(_id, updateUser){
    try{
        const url = `${signUpsUrl}/${_id}`;

        const editData = {
            userName : updateUser.userName,
            password : updateUser.password
        }

        const response = await axios.put(url, editData)
        console.log("Bruker er nå redigert", response.data);
        console.log("Statuskode:", response.status);
    }catch(error){
        console.error("Feil ved redigering:",error);
        console.log("Statuskode:",  error.message.status);
    }
}
