import { randomFemale} from "./data.js";
import {displayFemaleUsers} from "../Js/datingSite.js"


// Henter Kvinner fra RandomApi

 let femaleUsers = [];

const femaleBtn = document.getElementById("getFemaleBtn");
femaleBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const response = await axios.get(randomFemale);
    const data = await response.data.results; 
    femaleUsers = femaleUsers.concat(data); 
    
    displayFemaleUsers(data, "#f4c2c2");
    localStorage.setItem("lastFemaleUser",JSON.stringify(data[0]))

    console.log("Henter Kvinner", response.status);
    } catch (error) {
    console.error("Error getting data",  error.message.status);
  }
  femaleBtn.textContent = "Nei/Neste kvinne";
  localStorage.setItem("femaleBtnClicked", "true")
 
});

document.addEventListener("DOMContentLoaded", async ()=> {
 const btnFemaleClicked = localStorage.getItem("femaleBtnClicked");
 const lastFemaleUser = localStorage.getItem("lastFemaleUser");
 if (btnFemaleClicked && lastFemaleUser){
    const femaleUser = JSON.parse(lastFemaleUser);
    displayFemaleUsers([femaleUser], "#f4c2c2");
    femaleBtn.textContent = "Nei/Neste kvinne";
    console.log("Henter Kvinner fra LocalStorage", femaleUser);
 }

});

