import { allUsersURL } from "./data.js";
import { settAllUsers, showUser } from "../Js/allUsers.js";


export async function getAllUsers() {
    try {
        const response = await axios.get(allUsersURL);
        const data = await response.data.results;

        settAllUsers(data);
        
        console.log("Henter alle brukere", data);

        showUser(data)
        return data;
    } catch (error) {
        console.error("Ikke mulig å hente alle brukere", error);
    }
}
