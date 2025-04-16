// script.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Элементы DOM ---
    const headerButtonsContainer = document.getElementById('headerButtons');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const contactForm = document.getElementById('contactForm');
    const formStatusEl = document.getElementById('form-status');
    const yearSpan = document.getElementById('current-year');

    // --- Функции ---

    /**
     * Обновляет год в футере
     */
    function updateFooterYear() {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    /**
     * Добавляет плавную прокрутку для якорных ссылок
     */
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                // Исключаем пустые якоря или якоря только с #
                if (href && href.length > 1 && href.startsWith('#')) {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault(); // Предотвращаем стандартный переход только если элемент найден
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    /**
     * Проверяет, залогинен ли пользователь (имитация через localStorage)
     * @returns {string|null} Имя пользователя или null
     */
    function checkLoginStatus() {
        return localStorage.getItem('loggedInUser');
    }

    /**
     * Обновляет кнопки в шапке в зависимости от статуса входа
     */
    function updateHeaderButtons() {
        if (!headerButtonsContainer) return;

        const loggedInUser = checkLoginStatus();
        headerButtonsContainer.innerHTML = ''; // Очищаем контейнер

        if (loggedInUser) {
            // Пользователь вошел
            const profileLink = document.createElement('a');
            profileLink.href = "#"; // Заглушка для профиля
            profileLink.className = 'btn btn-secondary'; // Пример стиля
            profileLink.textContent = `Профиль (${loggedInUser})`; // Отображаем имя
            profileLink.title = 'Ваш профиль (не реализовано)';

            const logoutButton = document.createElement('button');
            logoutButton.className = 'btn btn-danger';
            logoutButton.textContent = 'Выйти';
            logoutButton.id = 'logoutButton'; // ID для обработчика

            headerButtonsContainer.appendChild(profileLink);
            headerButtonsContainer.appendChild(logoutButton);

            // Добавляем обработчик на кнопку Выйти
            logoutButton.addEventListener('click', handleLogout);

        } else {
            // Пользователь не вошел
            const loginButton = document.createElement('a');
            loginButton.href = 'login.html';
            loginButton.className = 'btn btn-primary';
            loginButton.textContent = 'Войти';

            const registerButton = document.createElement('a');
            registerButton.href = 'register.html';
            registerButton.className = 'btn btn-secondary';
            registerButton.textContent = 'Регистрация';

            headerButtonsContainer.appendChild(loginButton);
            headerButtonsContainer.appendChild(registerButton);
        }
    }

    /**
     * Обработчик выхода пользователя
     */
    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        console.log('Пользователь вышел.');
        updateHeaderButtons(); // Обновляем кнопки
        // Можно добавить редирект на главную, если нужно
        // window.location.href = 'index.html';
    }

    /**
     * Обработчик формы входа
     * @param {Event} e - Событие отправки формы
     */
    function handleLogin(e) {
        e.preventDefault();
        const usernameInput = loginForm.querySelector('#username');
        const passwordInput = loginForm.querySelector('#password'); // Пароль не проверяем в имитации

        if (!usernameInput.value.trim()) {
            alert('Пожалуйста, введите имя пользователя.');
            usernameInput.focus();
            return;
        }

        // --- ИМИТАЦИЯ УСПЕШНОГО ВХОДА ---
        const username = usernameInput.value.trim();
        localStorage.setItem('loggedInUser', username);
        console.log(`Пользователь ${username} вошел (имитация).`);
        alert(`Добро пожаловать, ${username}!`);
        updateHeaderButtons(); // Обновляем кнопки
        window.location.href = 'index.html'; // Перенаправляем на главную
    }

    /**
     * Обработчик формы регистрации
     * @param {Event} e - Событие отправки формы
     */
    function handleRegister(e) {
        e.preventDefault();
        const usernameInput = registerForm.querySelector('#username');
        const emailInput = registerForm.querySelector('#email'); // Email не проверяем
        const passwordInput = registerForm.querySelector('#password');
        const confirmPasswordInput = registerForm.querySelector('#confirmPassword');

        // Простая валидация
        if (!usernameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value || !confirmPasswordInput.value) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Пароли не совпадают!');
            confirmPasswordInput.focus();
            return;
        }

        if (passwordInput.value.length < 6) { // Примерная проверка длины пароля
             alert('Пароль должен быть не менее 6 символов.');
             passwordInput.focus();
             return;
        }

        // --- ИМИТАЦИЯ УСПЕШНОЙ РЕГИСТРАЦИИ ---
        const username = usernameInput.value.trim();
        console.log(`Пользователь ${username} зарегистрирован (имитация). Данные:`, {
            username: username,
            email: emailInput.value.trim(),
            // Пароль не логируем!
        });
        alert(`Регистрация ${username} прошла успешно! Теперь вы можете войти.`);
        window.location.href = 'login.html'; // Перенаправляем на страницу входа
    }

    /**
     * Обработчик контактной формы
     * @param {Event} e - Событие отправки формы
     */
    function handleContactForm(e) {
        e.preventDefault();
        if (!formStatusEl) return;

        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        // Простая валидация
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            formStatusEl.textContent = 'Пожалуйста, заполните все поля.';
            formStatusEl.className = 'error'; // Используем класс для стилизации ошибки
            return;
        }

        // --- ИМИТАЦИЯ ОТПРАВКИ ДАННЫХ ---
        formStatusEl.textContent = 'Отправка...';
        formStatusEl.className = ''; // Сбрасываем класс

        // Имитируем задержку сети
        setTimeout(() => {
            console.log('Данные контактной формы (имитация отправки):', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });
            formStatusEl.textContent = 'Спасибо за ваше сообщение! Мы скоро свяжемся с вами.';
            formStatusEl.className = 'success'; // Класс для стилизации успеха
            contactForm.reset(); // Очищаем форму

            // Убираем сообщение через некоторое время
            setTimeout(() => { formStatusEl.textContent = ''; formStatusEl.className = ''; }, 6000);

        }, 1000); // Задержка 1 секунда
    }


    // --- Инициализация ---

    updateFooterYear();
    smoothScroll();
    updateHeaderButtons(); // Проверяем статус входа при загрузке страницы

    // Добавляем обработчики событий к формам, если они существуют на странице
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

}); // Конец DOMContentLoaded