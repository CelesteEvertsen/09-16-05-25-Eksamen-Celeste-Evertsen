import { getAllUsers } from "../Request/allUsersGET.js";
import { likecounter} from "./datingSite.js";
import { postAllLikedUsers} from "../Request/allUserPOST.js";
import { deleteLikedUsers} from "../Request/allUserDELETE.js";



let likedUsers = JSON.parse(localStorage.getItem("allLikedUsers")) || [];
let counter = parseInt(localStorage.getItem("likeCounter")) || 0;

const maxLike = 10;
function updateButtons() {
    const dislikeBtn = document.createElement("button");
    dislikeBtn.disabled = counter >= maxLike;
    dislikeBtn.disabled = counter <= 0;
  }
const allUsersBtn = document.getElementById("getAllBtn");
allUsersBtn.addEventListener("click", async function (e) {
    await getAllUsers();
    allUsersBtn.textContent = "Nei/Neste bruker";
    localStorage.setItem("allUserBtnClicked", "true");
})

document.addEventListener("DOMContentLoaded", async ()=> {
 const allUserBtnClicked = localStorage.getItem("allUserBtnClicked");
 const lastUser = localStorage.getItem("lastUser");
 if (allUserBtnClicked && lastUser){
    const allUser = JSON.parse(lastUser);
    displayAllUsers([allUser], "#f4c2c2");
    allUsersBtn.textContent = "Nei/Neste bruker";
    console.log("Henter bruker fra LocalStorage", allUser);
 }

});
    
const getFromLocalStorge = JSON.parse(localStorage.getItem("allLikedUsers")) || [];

 function allUsersFromLocal(localUser) {
  const allLikedContainer = document.getElementById("all-liked-container");
  allLikedContainer.innerHTML = "";

  localUser.forEach((local, index) => {
    const userCard = document.createElement("div");
    userCard.classList.add("all-user-card");

    userCard.style.border = "1px solid #ccc";
    userCard.style.padding = "1rem";
    userCard.style.marginBottom = "1rem";
    userCard.style.borderRadius = "10px";
    userCard.style.background = "lightgreen";

    userCard.innerHTML = `
            <img src="${local.picture.large}">
            <h2> ${local.name.title} ${local.name.first}, 
            ${local.name.last} </h2>
            <p>Alder: ${local.dob.age} Kjønn: ${local.gender}</p>
            <p>By: ${local.location.city}</p>
            
            `;
    const dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = "Dislike";
    dislikeBtn.style.marginTop = "10px";
    dislikeBtn.style.backgroundColor = "#f44336";
    dislikeBtn.style.color = "white";
    dislikeBtn.style.border = "none";
    dislikeBtn.style.padding = "0.5rem 1rem";
    dislikeBtn.style.borderRadius = "5px";

    dislikeBtn.addEventListener("click", () => {
      const currentData = JSON.parse(localStorage.getItem("allLikedUsers")) || [];
      currentData.splice(index, 1);
      localStorage.setItem("allLikedUsers", JSON.stringify(currentData));

      if (counter > 0) {
        counter--;
        localStorage.setItem("likeCounter", counter);
      }
      likedUsers = currentData;
      allUsersFromLocal(currentData); 
      updateButtons();
      deleteLikedUsers(local);
    });
    userCard.append(dislikeBtn);
    allLikedContainer.append(userCard);
  });
}

// Vise Kvinner

export function displayAllUsers(users) {
  const allUserContainer = document.getElementById("all-container");
  allUserContainer.innerHTML = "";

  const removeAllUsers = document.createElement("button");
  removeAllUsers.type = "button";
  removeAllUsers.classList.add("btn", "btn-danger");
  removeAllUsers.style.marginTop = "10px";
  removeAllUsers.style.marginBottom = "10px";
  removeAllUsers.textContent = "ikke vis bruker";

  users.forEach((user) => {
    const userCards = document.createElement("div");
    userCards.classList.add("allCard");

    userCards.style.border = "1px solid #ccc";
    userCards.style.padding = "1rem";
    userCards.style.marginBottom = "1rem";
    userCards.style.borderRadius = "10px";
    userCards.style.background = "lightgreen";

    userCards.innerHTML = `
        <img src="${user.picture.large}">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>Alder: ${user.dob.age}
        <p>By: ${user.location.city}</p>
        `;

    

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Ja, jeg liker deg";
    likeBtn.style.marginTop = "10px";
    likeBtn.style.backgroundColor = "white";
    likeBtn.style.border = "none";
    likeBtn.style.padding = "0.5rem 1rem";
    likeBtn.style.borderRadius = "5px";

    likeBtn.addEventListener("click", async () => {
      if (counter < maxLike) {
        counter++;
        likedUsers.push(user);

        localStorage.setItem("allLikedUsers", JSON.stringify(likedUsers));
        localStorage.setItem("likeCounter", counter);
        postAllLikedUsers(user);

        allUsersFromLocal(likedUsers); // oppdaterer liked users slik at man ikke trenger å refreshe siden.
        likecounter();
      } else if (counter === maxLike) {
        alert(`Du har ingen flere likes ${maxLike}`);
      }
      console.log("like");
      updateButtons();
    });

    userCards.appendChild(likeBtn);
    allUserContainer.appendChild(userCards);
  });
  allUserContainer.prepend(removeAllUsers); 

  removeAllUsers.addEventListener("click", () => {
    allUserContainer.innerHTML = "";
    localStorage.removeItem("allUserBtnClicked", "false");
    const allUsersBtn = document.getElementById("getAllBtn");
    allUsersBtn.textContent = "Alle";
  });
}
allUsersFromLocal(getFromLocalStorge);
updateButtons();
likecounter();