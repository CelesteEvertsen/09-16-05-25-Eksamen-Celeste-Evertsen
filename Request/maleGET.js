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

            console.log("Henter Mann",response.status);

            displayMaleUsers(data, "lightblue") 
           localStorage.setItem("lastMaleUser",JSON.stringify(data[0]));
           
    }catch(error){
        console.error("Ikke mulig å hente MEnn", error.message.status);
    }
    maleBtn.textContent = "Nei/Neste Mann";
    localStorage.setItem("maleBtnClicked", "true")
});

document.addEventListener("DOMContentLoaded", async ()=> {
 const btnMaleClicked = localStorage.getItem("maleBtnClicked");
 const lastMaleUser = localStorage.getItem("lastMaleUser");
 if (btnMaleClicked && lastMaleUser){
    const maleUser = JSON.parse(lastMaleUser);
    displayMaleUsers([maleUser], "lightblue");
    maleBtn.textContent = "Nei/Neste Menn";
    console.log("Henter Menn fra LocalStorage", maleUser);
 }

});
