

/* 
export async function displayUsers(users) {
    const allUsersContainer = document.getElementById("all-users-container");
    allUsersContainer.innerHTML = ""; // Tøm container før visning

    users.forEach(user => {
        const container = document.createElement("div");
        container.classList.add("allUsersCard");

        container.innerHTML = `
            <img src="${user.picture.large}">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>Gender: ${user.gender}</p>
            <p>Alder: ${user.dob.age}</p>
            <p>${user.location.city}</p>
        `;

        const userColor = {
            female: "lightpink",
            male: "lightblue",
            all: "lightgreen",
        };
        container.style.backgroundColor = userColor[user.gender] || userColor.all;

        allUsersContainer.appendChild(container);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getAllUses();

    const searchGender = document.getElementById("search");
    searchGender.addEventListener("change", (e) => {
        const selectedGender = e.target.value.toLowerCase();

        if (selectedGender === "") {
            displayUsers(allUsers); // Vis alle
        } else {
            const filteredUsers = allUsers.filter(user => user.gender === selectedGender);
            displayUsers(filteredUsers); // Vis kun valgt kjønn
        }
    });
}); */