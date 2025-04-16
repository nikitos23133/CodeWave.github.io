// Функция для загрузки истории посещений
function loadVisitHistory() {
    const history = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.page} - ${new Date(item.timestamp).toLocaleString()}`;
        historyList.appendChild(li);
    });
}

// Функция для загрузки избранных материалов
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    favorites.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.title;
        li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
        favoritesList.appendChild(li);
    });
}

// Загрузка данных при загрузке страницы
window.onload = function() {
    loadVisitHistory();
    loadFavorites();
};