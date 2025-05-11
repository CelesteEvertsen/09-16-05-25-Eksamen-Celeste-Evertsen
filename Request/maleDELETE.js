import { LikedMaleToCRUD } from "./data.js";

export async function deleteLikedMale(user) {
    try {
      const url = `${LikedMaleToCRUD}/${user._id}`;
      const response = await axios.delete(url);
  
      console.log("Slettet fra CRUDCrud", response.data);
    } catch (error) {
      console.error("Feil ved sletting:", error);
    }
  }