document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    const userDetailsContainer = document.getElementById("user-details");

    if (!userId) {
      userDetailsContainer.innerText = "Не вказано ID користувача.";
      return;
    }

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await response.json();

      if (response.ok) {
        userDetailsContainer.innerHTML = `
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Ім'я:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Адреса:</strong> ${user.address.street}, ${user.address.city}</p>
          <p><strong>Телефон:</strong> ${user.phone}</p>
          <p><strong>Сайт:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;

        // Додаємо кнопку для завантаження постів
        const button = document.createElement("button");
        button.innerText = "Post of Current User";
        button.className = "wide-button";
        button.addEventListener("click", async () => {
          const postsContainer = document.getElementById("posts-container");
          postsContainer.innerHTML = "Завантаження постів...";

          try {
            const postsRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            const posts = await postsRes.json();

            postsContainer.innerHTML = "";
            posts.forEach(post => {
              const postDiv = document.createElement("div");
              postDiv.className = "post-card";
              postDiv.innerHTML = `
                <p><strong>${post.title}</strong></p>
                <a href="post-details.html?postId=${post.id}">View Details</a>
              `;
              postsContainer.appendChild(postDiv);
            });
          } catch (err) {
            postsContainer.innerText = "Помилка при завантаженні постів.";
          }
        });

        userDetailsContainer.insertAdjacentElement("afterend", button);
      } else {
        userDetailsContainer.innerText = "Користувач не знайдений.";
      }
    } catch (error) {
      console.error("Помилка при завантаженні даних користувача:", error);
      userDetailsContainer.innerText = "Сталася помилка при завантаженні даних.";
    }
  });