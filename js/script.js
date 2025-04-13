
  document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.getElementById("users-container");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();

      users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Ім'я:</strong> ${user.name}</p>
          <a href="user-details.html?id=${user.id}">Деталі</a>
        `;

        usersContainer.appendChild(userCard);
      });

    } catch (error) {
      console.error("Помилка завантаження користувачів:", error);
      usersContainer.innerText = "Не вдалося завантажити користувачів.";
    }
  });

