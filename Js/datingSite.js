
import { putEditUser } from "../Request/PUT.js";

function showUserInHeader() {
  const welcomeUserName = document.getElementById("welcome-user");
  const useInfo = JSON.parse(localStorage.getItem("Username"));
  const yourName = document.createElement("h1");
  if (useInfo && useInfo.userName) {
    yourName.textContent = `Velkommen til Profilen din ${useInfo.userName}`;
    welcomeUserName.appendChild(yourName);
  }

  const editBtn = document.getElementById("edit-your-info");

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
showUserInHeader();

// Vise Kvinner

export function displayFemaleUsers(users) {
  const femaleContainer = document.getElementById("female-container");
  femaleContainer.innerHTML = "";

 const getFemalebtn = document.getElementById("getFemaleBtn");

 const removeFemale = document.createElement("button");
    removeFemale.type = "button";
    removeFemale.textContent ="X";
 

 getFemalebtn.addEventListener("click",()=>{
    users.forEach((user) => {
        const userCards = document.createElement("div");
        userCards.classList.add("femaleCard");
    
        userCards.innerHTML = `
        <img src="${user.picture.large}">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>Alder:${user.dob.age}
        <p>${user.location.city}</p>
        `;
    
        const likeBtn = document.createElement("button");
        likeBtn.textContent = "Like";
        
        userCards.appendChild(likeBtn);
        femaleContainer.appendChild(userCards)
      });
      femaleContainer.prepend(removeFemale)// prepend legger det til øverst, istedet for nederst

      removeFemale.addEventListener("click",()=>{
       femaleContainer.innerHTML = "";
        
      })
      
 })
 

}
