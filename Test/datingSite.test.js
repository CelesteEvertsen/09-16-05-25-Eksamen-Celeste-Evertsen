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
test("sjekker at #liked-container finnes i DOM", ()=>{
    const likedContainer = document.querySelector("#liked-container");
    expect (likedContainer).not.toBeNull();
})
test("sjekker at #male-liked-container finnes i DOM", ()=>{
    const maleLikedContainer = document.querySelector("#male-liked-container");
    expect (maleLikedContainer).not.toBeNull();
})

})

