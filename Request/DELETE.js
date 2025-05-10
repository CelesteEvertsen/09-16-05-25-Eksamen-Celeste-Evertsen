import { LikedUsersToCRUD } from "./data.js";

export async function deleteLikedUsers(user) {
  if(!user._id){
    console.log("Ingen ID funnet, kan ikke slette");
    return;
  }
    try {
      const url = `${LikedUsersToCRUD}/${user._id}`;
      const response = await axios.delete(url);
  
      console.log("Slettet fra CRUDCrud", response.data);
    } catch (error) {
      console.error("Feil ved sletting:", error);
    }
  }