document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.querySelector(".header__burger");
    const sideMenu = document.querySelector(".side__menu");
    const overlay = document.querySelector(".side__overlay");
    const closeButton = document.getElementById("close-menu");
    const buttons = document.querySelectorAll("button[data-target]");
    const menuLinks = document.querySelectorAll(".side__menu a");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.getAttribute("data-target"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    burgerButton.addEventListener("click", () => {
        sideMenu.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    closeButton.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        overlay.classList.remove("active");
    });

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("active");
            overlay.classList.remove("active");
        });
    });

    const form = document.querySelector(".form__container");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        document.querySelectorAll(".error-message").forEach(el => el.remove());

        if (name.value.trim() === "") {
            isValid = false;
            showError(name, "Имя не может быть пустым");
        }

        if (email.value.trim() === "") {
            isValid = false;
            showError(email, "Почта не может быть пустой");
        } else if (!validateEmail(email.value)) {
            isValid = false;
            showError(email, "Некорректный формат почты");
        }

        if (message.value.trim() === "") {
            isValid = false;
            showError(message, "Сообщение не может быть пустым");
        }

        if (isValid) {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert("Сообщение успешно отправлено!");
                    form.reset();
                })
                .catch(error => {
                    console.error("Ошибка:", error);
                });
        }
    });

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

//Фибоначчи
function nthFibo(n) {
    if (n <= 0) return 0;
    if (n === 1) return 0;
    if (n === 2) return 1;
    let a = 0, b = 1, temp;
    for (let i = 3; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

console.log(nthFibo(4));