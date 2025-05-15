/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path'); 
const { JSDOM } = require('jsdom'); 




let dom; 
let document; 

describe('tester DOM', ()=>{

beforeEach(() => { 
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8'); 
    dom = new JSDOM(html); 
    document = dom.window.document;
    global.document = document; 
    global.window = dom.window; 



});
test("Skal finne brukernavn, passord og registrerings knapp i skjemaet",()=>{
    const userName = document.querySelector("#username");
    const password = document.querySelector("#pwd");
    const register = document.querySelector("#register");
    
    expect(userName).not.toBeNull();
    expect(password).not.toBeNull();
    expect(register).not.toBeNull();

    expect(userName.hasAttribute("required")).toBe(true);
    expect(password.hasAttribute("required")).toBe(true);
   
})

test("Label er riktig koblet til input", ()=>{
    const userNameLabel = document.querySelector("label[for='username']");
    const passwordLabel = document.querySelector("label[for='pwd']");

    expect(userNameLabel).not.toBeNull();
    expect(passwordLabel).not.toBeNull();

    expect(document.getElementById("username")).toBeTruthy();
    expect(document.getElementById("pwd")).toBeTruthy();
})

test("Lenken som for 'Allerde bruker?' sender til riktig html",()=>{
    const link = document.querySelector("a[href='/signIn.html']");
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe("/signIn.html");
})

test("Viser feilmelding om inputfeltene er tomme",()=>{
    const userNameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#pwd");
    const registerBtn = document.querySelector("#register");
    const registerUser = document.querySelector("#register-container")

    userNameInput.value = "";
    passwordInput.value = "";

    registerBtn.click();
    expect(registerUser.innerHTML).toBe('');
})

test("Tømmer inputfeltet etter bruker er registrert", async()=>{
    const userNameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#pwd");
    const registerBtn = document.querySelector("#register");
    const registerUser = document.querySelector("#register-container")

    userNameInput.value = "Brukernavn";
    passwordInput.value = "Passord123";

    registerBtn.addEventListener("click", async (e)=>{
        e.preventDefault();
        
    if(!userNameInput.value.trim() || !passwordInput.value.trim()){
        registerUser.innerHTML = '<p style="color:red;">Fyll inn alle feltene før du registrerer deg.</p>';
        return;
    };

     const loginData = {
        userName: userNameInput.value.trim(),
        password: passwordInput.value.trim(),
    };
  
    userNameInput.value = "";
    passwordInput.value = "";
    })

      await registerBtn.click();
      expect(userNameInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    
      
})
});

// Kilder:
// https://www.testim.io/blog/dom-testing/
//https://jestjs.io/docs/getting-started
//https://github.com/jsdom/jsdom
//moodle
