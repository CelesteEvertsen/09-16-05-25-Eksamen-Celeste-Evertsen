import { getAllUsers } from "../Request/allUsersGET.js";

export let allUsers = [];
let currentIndex = 0;

let filteredUserList = [];
let isFiltered = false;
let currentFilteredIndex = 0;

export function settAllUsers(data) {
  // settes i en funksjon, for når en Let exporteres så vlir den til en COSNT
  allUsers = data;
  currentIndex = 0;
  isFiltered = false;
  filteredUserList = [];
}

export function getAllUsersList() {
  return allUsers;
}

const getAllBtn = document.getElementById("getAllBtn");
getAllBtn.addEventListener("click", async () => {
  await getAllUsers();
  showUser();
});


export function showUser(data) {
   
    const container = document.getElementById("all-container");
    container.innerHTML = "";

    let user;
    if (isFiltered) {
        user = filteredUserList[currentFilteredIndex];
    } else {
        user = allUsers[currentIndex];
    }


    if (!user) {
        container.innerHTML = "<p>Ingen flere brukere</p>";
        return;
    }

    const card = document.createElement("div");
    card.classList.add("allUsersCard");
    card.innerHTML = `
        <img src="${user.picture.large}">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>Alder: ${user.dob.age} Kjønn: ${user.gender}</p>
        <p>By: ${user.location.city}</p>
        <p>Land: ${user.location.country}</p>
    `;
    container.appendChild(card);
}

// Neste knapp:
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
if(isFiltered){
    if (currentFilteredIndex < filteredUserList.length - 1) {
        currentFilteredIndex++;
        showUser();
    }else{
        alert("Du har sett alle filtrerte brukere!");
       
    }
}else{
    if (currentIndex < allUsers.length - 1) {
        currentIndex++;
        showUser();
    } else {
        alert("Du har sett alle brukerne!");
    }
}

   
});


const filterBtn = document.getElementById("filterBtn");
filterBtn.addEventListener("click", async () => {
  const ageInput = document.getElementById("ageInput").value;
  const genderSelection = document.getElementById("genderSelection").value;

  filteredUserList = getAllUsersList();
  if(ageInput !== "") {
    const age = parseInt(ageInput);
    filteredUserList = filteredUserList.filter((user) => user.dob.age === age);
}

if(genderSelection !== "") {
    filteredUserList = filteredUserList.filter((user) => user.gender.toLowerCase() === genderSelection.toLowerCase());
}

console.log("Filtered user list:", filteredUserList);

if (filteredUserList.length === 0){
    alert("Ingenbruker funnet med det filteret");
    return;
}
isFiltered = true;
  currentFilteredIndex = 0;
  
  showUser();
});
