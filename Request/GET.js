import { randomFemale} from "./data.js";
import {displayFemaleUsers} from "../Js/datingSite.js"


// Henter Kvinner fra RandomApi

 let femaleUsers = [];
// counter tekst er for å vise i browseren hvor mange like/dislike brukeren har tatt.
const femaleBtn = document.getElementById("getFemaleBtn");
femaleBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const response = await axios.get(randomFemale);
    const data = await response.data.results; // her la jeg til en .results på slutten, Grunne til det, er at det ble lagret i localS inne i Results, så fikk ikke displaye det i displayFromLocalStorage.. Da kunne jeg kalle på const getfromlocal, som argument.
    femaleUsers = femaleUsers.concat(data); // brukes til å sette sammen to eller flere strings eller arrays. Å den returnerer en ny string eller ny array
    
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

