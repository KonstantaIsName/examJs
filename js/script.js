document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.getElementById("users-container");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

      
        function createUserCard(user) {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");

            userCard.innerHTML = `
                <p><strong>ID: ${user.id}</p>
                <p><strong>Ім'я:</strong> ${user.name}</p>
                <a href="user-details.html?id=${user.id}">Деталі</a>
            `;

            usersContainer.appendChild(userCard);
        }

 
        users.forEach(createUserCard);
        
    } catch (error) {
        console.error("Помилка завантаження користувачів:", error);
    }
});
