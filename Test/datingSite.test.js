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
    const html = fs.readFileSync(path.resolve(__dirname, '../datingSite.html'), 'utf8'); 
    dom = new JSDOM(html); 
    document = dom.window.document;
    global.document = document; 
    global.window = dom.window; 
 // simulerer knapp fra datingsite.js
 const likeBtn = document.createElement("button");
 likeBtn.id = "likeBtn";
 document.body.appendChild(likeBtn);

});
test("Sjekker at knappene for filtrering finnes",()=>{
    const getFemalebtn = document.querySelector("#getFemaleBtn");
    const getMalebtn = document.querySelector("#getMaleBtn");
    const getAllBtn = document.querySelector("#getAllBtn");
    
    expect(getFemalebtn).not.toBeNull();
    expect(getMalebtn).not.toBeNull();
    expect(getAllBtn).not.toBeNull();
   
})

// Tester Containerne der Brukerene legges inn
test("Sjekk at .female-container finnes", () => {
    const femalecontainer = document.querySelector("#female-container");
    expect(femalecontainer).not.toBeNull();
});


test("Sjekk at #male-container finnes", () => {
    const maleContainer = document.querySelectorAll("#male-container");
    expect(maleContainer).not.toBeNull();
});

test("sjekker at #all-container finnes", ()=>{
    const allContainer = document.querySelector("#all-container");
    expect(allContainer).not.toBeNull();
});

test("sjekker at .container-gender finnes i DOM", ()=>{
    const genderContainer = document.querySelector(".container-gender");
    expect (genderContainer).not.toBeNull();
})

// testene under sjeker at containerne for likete brukere finnes
test("sjekker at #liked-container finnes i DOM", ()=>{
    const likedContainer = document.querySelector("#female-liked-container");
    expect (likedContainer).not.toBeNull();
})
test("sjekker at #male-liked-container finnes i DOM", ()=>{
    const maleLikedContainer = document.querySelector("#male-liked-container");
    expect (maleLikedContainer).not.toBeNull();
})
test("sjekker at #all-liked-container finnes i DOM", ()=>{
    const allLikedContainer = document.querySelector("#all-liked-container");
    expect (allLikedContainer).not.toBeNull();
})
test("sjekker at #edit og #logout finnes i DOM", ()=>{
    const editBtn = document.querySelector("#edit");
    const logoutBtn = document.querySelector("#logOut");

    expect (editBtn).not.toBeNull();
    expect (logoutBtn).not.toBeNull();

});
 // tester LOCALSTORAGE
test("returnerer en tom array hvis localStorage er tom", () => {
    const likedUsers = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];
    expect(likedUsers).toEqual([]);
    expect(likedUsers.length).toBe(0);
});

test("returnerer lagerde likte bruker hvis de finnes i localStorage", ()=>{
    const mockUsers = [
        {name:{first:"Henni", last:"Norddame"},gender: "female"},
        {name:{first:"Kari", last:"Hansen"},gender: "female"},
    ];
   localStorage.setItem("likedUsersFemale", JSON.stringify(mockUsers));
   const likedUsers = JSON.parse(localStorage.getItem("likedUsersFemale")) || [];

    expect(likedUsers).toEqual(mockUsers);
    expect(likedUsers.length).toBe(2);
    expect(likedUsers[0].name.first).toBe("Henni");
    expect(likedUsers[1].name.first).toBe("Kari");
});

test("Når kanppen trykkes, lagres likte bruker i localStorage", async()=>{
    const likeBtn = document.querySelector("#likeBtn");
    expect(likeBtn).not.toBeNull();

    // Simulerer verdier for likte brukere
    let counter = 0;
    const maxLike = 10;
    let likeUsers = [];

    const mockUser = {
        name:{first:"Henni", last:"Norddame"},gender: "female",
    }

    // lager en mock funkjson av postFemaleLikedUsers sidne den er async. 
    // Slik at jeg kan bruke den i testen
    const postFemaleLikedUsers = jest.fn().mockResolvedValue(mockUser);

    likeBtn.addEventListener("click", async()=>{
        if(counter < maxLike){
            counter++;
            const saveUser = await postFemaleLikedUsers();
            likeUsers.push(saveUser);
            localStorage.setItem("likedUsersFemale",JSON.stringify(likeUsers));
            localStorage.setItem("likeCounter",counter);

        }else if(counter === maxLike){
            alert('Du har ingen flere likes ${maxlike}');

        }

    })
    await likeBtn.click();

    const storedFemale = JSON.parse(localStorage.getItem("likedUsersFemale"));
    expect(storedFemale.length).toBe(1);
    expect(storedFemale[0].name.first).toBe("Henni");

    expect(localStorage.getItem("likeCounter")).toBe("1");

});


});

// Kilder:
// https://www.testim.io/blog/dom-testing/
//https://jestjs.io/docs/getting-started
//https://github.com/jsdom/jsdom
//moodle