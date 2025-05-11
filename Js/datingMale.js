import { likecounter } from "./datingSite.js";
import {postLikedMaleUsers} from "../Request/malePOST.js";
import { deleteLikedMale } from "../Request/maleDELETE.js";

let likedUsers = JSON.parse(localStorage.getItem("likedUsersMale")) || [];
let counter = parseInt(localStorage.getItem("likeCounter")) || 0;

const maxLikes = 10; // makst tilgjengelige likes

const maleLikeBtn = document.createElement("button");

function updateButtons() {
  const maleDislikes = document.createElement("button");
  maleLikeBtn.disabled = counter >= maxLikes;
  maleDislikes.disabled = counter <= 0;
}

// Funksjon displaye fra localStorage til Browser.
const getFromStorage = JSON.parse(localStorage.getItem("likedUsersMale")) || [];

function displayFromLocalStorage(maleFromLocal) {
  const likedContainer = document.getElementById("male-liked-container");
  likedContainer.innerHTML = "";

  maleFromLocal.forEach((maleUsers, index) => {
    const maleCard = document.createElement("div");
    maleCard.classList.add("male-user-card");

    maleCard.style.border = "1px solid #ccc";
    maleCard.style.padding = "1rem";
    maleCard.style.marginBottom = "1rem";
    maleCard.style.borderRadius = "10px";
    maleCard.style.background = "lightgrey";

    maleCard.innerHTML = `
      <img src="${maleUsers.picture.large}">
        <h2> ${maleUsers.name.title} ${maleUsers.name.first}, 
        ${maleUsers.name.last} </h2>
        <p>Alder: ${maleUsers.dob.age} Kjønn: ${maleUsers.gender}</p>
        <p>By: ${maleUsers.location.city}</p>
        <p>Land: ${maleUsers.location.country}</p>
    `;

    const maledislikeBtn = document.createElement("button");
    maledislikeBtn.textContent = "Dislike";
    maledislikeBtn.style.marginTop = "10px";
    maledislikeBtn.style.backgroundColor = "#f44336";
    maledislikeBtn.style.color = "white";
    maledislikeBtn.style.border = "none";
    maledislikeBtn.style.padding = "0.5rem 1rem";
    maledislikeBtn.style.borderRadius = "5px";

    maledislikeBtn.addEventListener("click", () => {
      const currentData =
        JSON.parse(localStorage.getItem("likedUsersMale")) || [];
      currentData.splice(index, 1);
      localStorage.setItem("likedUsersMale", JSON.stringify(currentData));

      if (counter > 0) {
        counter--;
        localStorage.setItem("likeCounter", counter);
      }
      likedUsers = currentData; 
      displayFromLocalStorage(currentData);
      updateButtons();
      deleteLikedMale(maleUsers);
    });
    maleCard.append(maledislikeBtn);
    likedContainer.append(maleCard);
  });
}

// Lager en Funksjon som viser MaleUser i NettLeseren
export function displayMaleUsers(users, bgColor) {
  const maleContainer = document.getElementById("male-container");
  maleContainer.innerHTML = ""; 

  const removeMale = document.createElement("button");
  removeMale.type = "button";
  removeMale.classList.add("btn", "btn-danger");
  removeMale.style.marginTop = "10px";
  removeMale.style.marginBottom = "10px";
  removeMale.textContent = "ikke vis Menn";

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.style.border = "1px solid #ccc";
    userCard.style.padding = "1rem";
    userCard.style.marginBottom = "1rem";
    userCard.style.borderRadius = "10px";
    userCard.style.background = bgColor; 

    userCard.innerHTML = `
          <img src="${user.picture.large}">
          <h2> ${user.name.title} ${user.name.first}, ${user.name.last} </h2>
          <p>Alder: ${user.dob.age} Kjønn: ${user.gender}</p>
          <p>By: ${user.location.city}</p>
          <p>Land: ${user.location.country}</p>
          `;

    const maleLikeBtn = document.createElement("button");
    maleLikeBtn.textContent = "Ja, jeg liker deg";
    maleLikeBtn.style.marginTop = "10px";
    maleLikeBtn.style.backgroundColor = "white";
    maleLikeBtn.style.border = "none";
    maleLikeBtn.style.padding = "0.5rem 1rem";
    maleLikeBtn.style.borderRadius = "5px";

    maleLikeBtn.addEventListener("click", async() => {
      if (counter < maxLikes) {
        counter++;
       // likedUsers.push(user);
         const saveUser = await postLikedMaleUsers(user);;
         likedUsers.push(saveUser);
        localStorage.setItem("likedUsersMale", JSON.stringify(likedUsers));
        localStorage.setItem("likeCounter", counter);
        postLikedMaleUsers(user);
       
        displayFromLocalStorage(likedUsers);
        location.reload()
        
      } else if (counter === maxLikes) {
        alert("Du har brukt alle dinne Manne likes");
      }

      console.log("Like menn");
      updateButtons();
    });
    userCard.append(maleLikeBtn);
    maleContainer.append(userCard);
  });
  maleContainer.prepend(removeMale);

  removeMale.addEventListener("click", () => {
    maleContainer.innerHTML = "";
    localStorage.removeItem("lastMaleUser","false");
    const MaleBtn = document.getElementById("getMaleBtn");
    MaleBtn.textContent = "Menn";
  });
   
}

displayFromLocalStorage(getFromStorage);
updateButtons();
likecounter();