import { postSignUpData } from "../Request/POST.js";
const userNameInput = document.getElementById("username")
const passwordInput = document.getElementById("pwd")
const registerBtn = document.getElementById("register");

registerBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const userName = userNameInput.value.trim();
    const password = passwordInput.value.trim();
    const registerUser = document.getElementById("register-container");

    if(!userName || !password){
        registerUser.innerHTML = '<p style="color:red;">Fyll inn alle feltene før du registrerer deg.</p>';
        return;
    }
    
   
    const loginData = {
        userName: userNameInput.value.trim(),
        password: passwordInput.value.trim(),
    };
 
    userNameInput.value = "";
    passwordInput.value = "";
    

  try{
    await postSignUpData(loginData);
    registerUser.innerHTML = '<p>Du er nå registert!</p>'
    registerBtn.value = "Gå til Inlogging";
    registerBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        window.location.href = "/signin.html";
    })
  }catch(error){
    console.error("Det oppsto en feil")
     registerUser.innerHTML = '<p>Det oppsto en feil. Prøv igjen</p>'
  }
   
});