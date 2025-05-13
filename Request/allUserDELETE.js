import {allLikedToCRUD} from "./data.js";
export async function deleteLikedUsers(user) {
    try {
      const url = `${allLikedToCRUD}/${user._id}`;
      const response = await axios.delete(url);
  
      console.log("Sletter fra CRUDCRUD Statuskode:", response.status);
    } catch (error) {

      console.error("Feil ved sletting:", error.message.status);
      
    }
  }