// Функция для обработки смены
function handleShiftChange() {
    const shift = document.getElementById('shift').value;
    const hoursContainer = document.getElementById('hoursContainer');
    const workHoursInput = document.getElementById('workHours');

    if (["Утренняя", "Средняя", "Вечерняя"].includes(shift)) {
        workHoursInput.value = 7.2;
        hoursContainer.style.display = "block";
    } else if (shift === "Полный день") {
        workHoursInput.value = 12;
        hoursContainer.style.display = "block";
    } else if (["Отпуск", "Больничный лист"].includes(shift)) {
        hoursContainer.style.display = "none";
    } else {
        hoursContainer.style.display = "none";
    }
}

// Отправка формы 
document.getElementById('workScheduleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const employeeName = document.getElementById('employeeName').value;
    const passcode = document.getElementById('passcode').value;
    const shift = document.getElementById('shift').value;
    const workHours = document.getElementById('workHours').value;

    if (!employeeName || !passcode || !shift) {
        showNotification('Пожалуйста, заполните все поля.', 'error');
        return;
    }

    // Проверка кодового слова (пример проверки)
    if (passcode.toLowerCase() === 'admin') {
        console.log('Вход как администратор');
    }

    // Данные для отправки
    const formData = {
        name: employeeName,
        passcode: passcode,
        shift: shift,
        hours: (shift === "Отпуск") ? "О" : (shift === "Больничный лист") ? "Б" : workHours
    };

    console.log('Отправка данных: ', formData);

    // Здесь будет отправка в Google Sheets через Google Apps Script Web App
    sendToGoogleSheets(formData);

    showNotification('Форма успешно отправлена!', 'success');

    // Очистка формы
    document.getElementById('workScheduleForm').reset();
    document.getElementById('hoursContainer').style.display = "none";
});

// Функция показа уведомлений
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50'; // зелёный
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336'; // красный
    } else {
        notification.style.backgroundColor = '#2196F3'; // синий
    }

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Заготовка функции отправки в Google Sheets
function sendToGoogleSheets(data) {
    const url = 'https://script.google.com/macros/s/AKfycbzY67Uk0SHC8grR3888je61RQjnDnzgx9bQkloJzmnZAeohPdVy2CygOmHwVvUJbk-f/exec'; // сюда вставишь свой ID скрипта

    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => console.log('Данные успешно отправлены в таблицу.'))
    .catch(error => console.error('Ошибка отправки:', error));
}
