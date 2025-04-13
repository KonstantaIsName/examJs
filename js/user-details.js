document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    const userDetailsContainer = document.getElementById("user-details");
    const postsContainer = document.getElementById("posts-container");
  
    if (!userId) {
      userDetailsContainer.innerText = "Не вказано ID користувача.";
      return;
    }
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await response.json();
  
      if (!response.ok) {
        userDetailsContainer.innerText = "Користувач не знайдений.";
        return;
      }
  
      // Вивід інформації про користувача
      userDetailsContainer.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Ім'я:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Адреса:</strong> ${user.address.street}, ${user.address.city}</p>
        <p><strong>Телефон:</strong> ${user.phone}</p>
        <p><strong>Сайт:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      `;
  
      // Створюємо кнопку
      const button = document.createElement("button");
      button.innerText = "Показати пости цього користувача";
      button.className = "wide-button";
      userDetailsContainer.insertAdjacentElement("afterend", button);
  
      // Початково ховаємо блок з постами
      postsContainer.style.display = "none";
      let postsVisible = false;
      let postsLoaded = false;
  
      // Обробник кнопки
      button.addEventListener("click", async () => {
        if (!postsVisible) {
          // Якщо пости ще не завантажені — завантажити
          if (!postsLoaded) {
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
                  <a href="post-details.html?postId=${post.id}">Детальніше</a>
                `;
                postsContainer.appendChild(postDiv);
              });
  
              postsLoaded = true;
            } catch (err) {
              postsContainer.innerText = "Помилка при завантаженні постів.";
            }
          }
  
          postsContainer.style.display = "flex";
          button.innerText = "Сховати пости";
          postsVisible = true;
        } else {
          postsContainer.style.display = "none";
          button.innerText = "Показати пости цього користувача";
          postsVisible = false;
        }
      });
  
    } catch (error) {
      console.error("Помилка при завантаженні даних користувача:", error);
      userDetailsContainer.innerText = "Сталася помилка при завантаженні даних.";
    }
  });
  