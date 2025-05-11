import { allUsersURL } from "./data.js";
import { displayAllUsers } from "../Js/allUsers.js";


export async function getAllUsers() {
    try {
        const response = await axios.get(allUsersURL);
        const data = await response.data.results;
        
        console.log("Henter alle brukere", data);
        displayAllUsers(data);
        localStorage.setItem("lastUser",JSON.stringify(data[0]))
       
    } catch (error) {
        console.error("Ikke mulig å hente alle brukere", error);
    }
}
