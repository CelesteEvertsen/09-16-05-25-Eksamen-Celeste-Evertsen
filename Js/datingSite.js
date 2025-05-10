import { putEditUser } from "../Request/PUT.js";
import {postLikedUsers} from "../Request/POST.js"


document.addEventListener("DOMContentLoaded", () => {
    
    showUserInHeader();
    femaleFromLocal(getFromLocalStorge);
});

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
   



let counterText;
let likedUsers = JSON.parse(localStorage.getItem("likedUsers")) || [];
let counter = parseInt(localStorage.getItem("likeCounter")) || 0;

const maxLike = 10;


// tillegg funkjsonalitet
function updateButtons() {
const likeBtn = document.createElement("button");
  const removeLikes = document.createElement("button");
  likeBtn.disabled = counter >= maxLike;
  removeLikes.disabled = counter <= 0;
  if (counterText) {
    counterText.textContent = `${counter}/${maxLike} likes brukt`;
  }
}

const getFromLocalStorge = JSON.parse(localStorage.getItem("likedUsers")) || [];

export function femaleFromLocal(localUser) {
  const likeContainer = document.getElementById("liked-container");
  likeContainer.innerHTML = "";

  localUser.forEach((local, index) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.style.border = "1px solid #ccc";
    userCard.style.padding = "1rem";
    userCard.style.marginBottom = "1rem";
    userCard.style.borderRadius = "10px";
    userCard.style.background = "white";

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
      const currentData = JSON.parse(localStorage.getItem("likedUsers")) || [];
      currentData.splice(index, 1);
      localStorage.setItem("likedUsers", JSON.stringify(currentData));

      if (counter > 0) {
        counter--;
        localStorage.setItem("likeCounter", counter);
      }
      likedUsers = currentData;
      femaleFromLocal(currentData);
      updateButtons();
      
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
  removeFemale.classList.add("btn","btn-danger")
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
        `;

    const likeBtn = document.createElement("button");
      likeBtn.textContent = "Ja, jeg liker deg";
      likeBtn.style.marginTop = "10px";
      likeBtn.style.backgroundColor = "white";
      likeBtn.style.border = "none";
      likeBtn.style.padding = "0.5rem 1rem";
      likeBtn.style.borderRadius = "5px";

      likeBtn.addEventListener("click", async() => {
        if (counter < maxLike) {
          counter++;
          likedUsers.push(user);

          localStorage.setItem("likedUsers", JSON.stringify(likedUsers)); 
          localStorage.setItem("likeCounter", counter);
          postLikedUsers(user)

          femaleFromLocal(likedUsers); // oppdaterer liked users slik at man ikke trenger å refreshe siden.

        }else if (counter === maxLike){
            alert(`Du har ingen flere likes ${maxLike}`)
        }
        console.log("like");
        updateButtons();
      });

      userCards.appendChild(likeBtn);
      femaleContainer.appendChild(userCards);
    });
    femaleContainer.prepend(removeFemale); // prepend legger det til øverst, istedet for nederst

    removeFemale.addEventListener("click", () => {
      femaleContainer.innerHTML = "";
      localStorage.removeItem("femaleBtnClicked", "false");
      const femaleBtn = document.getElementById("getFemaleBtn");
      femaleBtn.textContent = "Kvinne";

    });
  };

