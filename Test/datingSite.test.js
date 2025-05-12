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

})

