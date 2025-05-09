import { getSignInData } from "../Request/GET.JS"; 

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async (e)=>{
e.preventDefault();
const userNameInput = document.getElementById("username").value.trim()
const passwordInput = document.getElementById("pwd").value.trim()

const allUsers = await getSignInData();
const matchUser = allUsers.find((user) =>
    user.userName === userNameInput && user.password === passwordInput
);

if(matchUser){
    window.location.href ="/datingSite.html"
    console.log("Vellykket",matchUser)
}else{
    alert("Brukernavn eller Passord er feil")
    console.log("ikke Vellykket")
}

console.log("knappen er trykket")
})