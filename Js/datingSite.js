import { putEditUser } from "../Request/PUT.js";
import { postFemaleLikedUsers } from "../Request/POST.js";
import { deleteFemaleLikedUsers } from "../Request/DELETE.js";
document.addEventListener("DOMContentLoaded", () => {
  showUserInHeader();
  femaleFromLocal(getFromLocalStorge);
  showTimeAndDate()
  toggleDarkLightMode()
});

//Tillegs funksjonalitet, logget ut
const logOutBtn = document.getElementById("logOut");
logOutBtn.onclick = logout;

function logout() {
window.location.href ="/signIn.html"
};

//Bruker navnet i Header
function showUserInHeader() {
  const welcomeUserName = document.getElementById("welcome-user");
  const useInfo = JSON.parse(localStorage.getItem("Username"));
  const yourName = document.createElement("p");

  if (useInfo && useInfo.userName) {
    yourName.textContent = `Velkommen til Profilen din ${useInfo.userName}`;
    welcomeUserName.prepend(yourName);
  }

  const editBtn = document.getElementById("edit");
  editBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = useInfo.userName;

    const editPassword = document.createElement("input");
    editPassword.type = "text";
    editPassword.value = useInfo.password;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Lagre";

    saveBtn.addEventListener("click", async () => {
      const updateName = input.value.trim();
      yourName.textContent = `Velkommen til Profilen din ${updateName}`;
      useInfo.userName = updateName;
      const updatePassword = editPassword.value.trim();
      useInfo.password = updatePassword;

      localStorage.setItem("Username", JSON.stringify(useInfo));

      const udatedUser = {
        userName: updateName,
        password: updatePassword,
      };

      await putEditUser(useInfo._id, udatedUser);
      alert("Informasjonen din er oppdater");
      input.remove();
      editPassword.remove();
      saveBtn.remove();
    });
    welcomeUserName.append(input, editPassword, saveBtn);
  });
}


let likedUsers = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];
let counter = parseInt(localStorage.getItem("likeCounter")) || 0;

const maxLike = 10;

// tillegg funkjsonalitet, teller antall likes
export function updateButtons() {
  const likeBtn = document.createElement("button");
  const removeLikes = document.createElement("button");
  likeBtn.disabled = counter >= maxLike;
  removeLikes.disabled = counter <= 0;
  
}

const getFromLocalStorge = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];

 function femaleFromLocal(localUser) {
  const likeContainer = document.getElementById("female-liked-container");
  likeContainer.innerHTML = "";

  localUser.forEach((local, index) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.style.border = "1px solid #ccc";
    userCard.style.padding = "1rem";
    userCard.style.marginBottom = "1rem";
    userCard.style.borderRadius = "10px";
    userCard.style.background = "lightpink";

    userCard.innerHTML = `
            <img src="${local.picture.large}">
            <h2> ${local.name.title} ${local.name.first}, 
            ${local.name.last} </h2>
            <p>Alder: ${local.dob.age} Kjønn: ${local.gender}</p>
            <p>By: ${local.location.city}</p>
            <p>Land: ${local.location.country}</p>
            
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
      const currentData = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];
      currentData.splice(index, 1);
      localStorage.setItem("likedUsersFemale", JSON.stringify(currentData));

      if (counter > 0) {
        counter--;
        localStorage.setItem("likeCounter", counter);
      }
      likedUsers = currentData;
      femaleFromLocal(currentData); 
      updateButtons();
      deleteFemaleLikedUsers(local);
    });
    userCard.append(dislikeBtn);
    likeContainer.append(userCard);
  });
}

// Vise Kvinner

export function displayFemaleUsers(users) {
  const femaleContainer = document.getElementById("female-container");
  femaleContainer.innerHTML = "";

  const removeFemale = document.createElement("button");
  removeFemale.type = "button";
  removeFemale.classList.add("btn", "btn-danger");
  removeFemale.style.marginTop = "10px";
  removeFemale.style.marginBottom = "10px";
  removeFemale.textContent = "ikke vis kvinner";

  users.forEach((user) => {
    const userCards = document.createElement("div");
    userCards.classList.add("femaleCard");

    userCards.style.border = "1px solid #ccc";
    userCards.style.padding = "1rem";
    userCards.style.marginBottom = "1rem";
    userCards.style.borderRadius = "10px";
    userCards.style.background = "lightpink";

    userCards.innerHTML = `
        <img src="${user.picture.large}">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>Alder: ${user.dob.age}
        <p>By: ${user.location.city}</p>
        <p>Land: ${user.location.country}</p>
        `;

    

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Ja, jeg liker deg";
    likeBtn.style.marginTop = "10px";
    likeBtn.style.backgroundColor = "lightgreen";
    likeBtn.style.border = "none";
    likeBtn.style.padding = "0.5rem 1rem";
    likeBtn.style.borderRadius = "5px";

    likeBtn.addEventListener("click", async () => {
      if (counter < maxLike) {
        counter++;

        const saveUser = await postFemaleLikedUsers(user);
        likedUsers.push(saveUser);
        localStorage.setItem("likedUsersFemale", JSON.stringify(likedUsers));
        localStorage.setItem("likeCounter", counter);

        femaleFromLocal(likedUsers); 
        likecounter();
      } else if (counter === maxLike) {
        alert(`Du har ingen flere likes ${maxLike}`);
      }
      updateButtons();
    });

    userCards.appendChild(likeBtn);
    femaleContainer.appendChild(userCards);
  });
  femaleContainer.prepend(removeFemale); 

  removeFemale.addEventListener("click", () => {
    femaleContainer.innerHTML = "";
    localStorage.removeItem("femaleBtnClicked", "false");
    const femaleBtn = document.getElementById("getFemaleBtn");
    femaleBtn.textContent = "Kvinne";
  });
}

export function likecounter(){
const likeCounteContainer = document.getElementById("like-counter-container");
likeCounteContainer.innerHTML = ""; 
const likeCounterText = document.createElement("h3");
likeCounterText.textContent = `Du har ${counter} av ${maxLike} likes igjen`;
likeCounteContainer.appendChild(likeCounterText);
} 

// Dato og tid tillegg funkjsonalitet
function showTimeAndDate(){
  const date = new Date();
  const timeDateContainer = document.getElementById("date-time");
  const timeOptions = date.toLocaleString("no-NO",{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  timeDateContainer.textContent = `Dato: ${timeOptions}`;
  setTimeout(showTimeAndDate, 1000); // oppdaterer hvert sekund
}

// Mørk og lys modus tilleggsfunksjonalitet
function toggleDarkLightMode(){
  const body = document.body;
  const themeBtn = document.getElementById("dark-light-toggle");

  const saveTheme = localStorage.getItem("theme");
  if(saveTheme === "dark"){
    body.classList.add("dark-mode");
    themeBtn.textContent = "☀️"; // https://emojipedia.org/
  }

  themeBtn.addEventListener("click", ()=>{
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    if(isDark){
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "☀️";
      themeBtn.style.border = "1px solid white";
    }else{
      localStorage.setItem("theme", "light");
      themeBtn.textContent = "🌑";
      themeBtn.style.border = "1px solid black";
    };
  });
};