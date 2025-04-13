 document.addEventListener("DOMContentLoaded", async () => {
            // 1. Отримуємо параметр 'id' з URL
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("id");

            if (!userId) {
                document.getElementById("user-details").innerText = "Не вказано ID користувача.";
                return;
            }

            try {
                // 2. Зробити запит до API для отримання інформації про користувача
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const user = await response.json();

                if (response.ok) {
                    // 3. Вивести дані користувача на сторінці
                    const userDetailsContainer = document.getElementById("user-details");

                    userDetailsContainer.innerHTML = `
                        <p><strong>ID:</strong> ${user.id}</p>
                        <p><strong>Ім'я:</strong> ${user.name}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Адреса:</strong> ${user.address.street}, ${user.address.city}</p>
                        <p><strong>Телефон:</strong> ${user.phone}</p>
                        <p><strong>Сайт:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                    `;
                } else {
                    // Якщо запит не вдалий
                    document.getElementById("user-details").innerText = "Користувач не знайдений.";
                }
            } catch (error) {
                console.error("Помилка при завантаженні даних користувача:", error);
                document.getElementById("user-details").innerText = "Сталася помилка при завантаженні даних.";
            }
        });