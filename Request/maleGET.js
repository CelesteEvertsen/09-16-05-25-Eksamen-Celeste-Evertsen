import { maleUrl } from "./data.js";
import { displayMaleUsers } from "../Js/datingMale.js"

// Henter Menn
const maleBtn = document.getElementById("getMaleBtn");

let maleUser = [];

maleBtn.addEventListener("click", async function(e){
    e.preventDefault()
    
    try{
        const response = await axios.get(maleUrl);
            const data = await response.data.results; 
            maleUser = maleUser.concat(data); 
            console.log("Henter Mann", data);
            displayMaleUsers(data, "lightblue") 
           
           
    }catch(error){
        console.error("Ikke mulig å hente MEnn",error)
    }
    maleBtn.textContent = "Neste Mann";
});
