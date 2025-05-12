import { LikedFemaleToCRUD } from "./data.js";

export async function deleteFemaleLikedUsers(user) {
    try {
      const url = `${LikedFemaleToCRUD}/${user._id}`;
      const response = await axios.delete(url);
  
      console.log("Slettet fra CRUDCrud", response.status);
    } catch (error) {
      console.error("Feil ved sletting:",  error.message.status);
    }
  }