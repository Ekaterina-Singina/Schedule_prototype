// Глобальная переменная для хранения выбранных дат
let selectedDates = [];

// Инициализация flatpickr
flatpickr("#multiDatePicker", {
  mode: "multiple",
  dateFormat: "Y-m-d",
  locale: "ru",
  onChange: function (selectedDatesArr) {
    selectedDates = selectedDatesArr.map(date => date.toISOString().split('T')[0]);
  }
});

// Обработка формы
document.getElementById('scheduleForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const employee = document.getElementById('employee').value;
  const shift = document.getElementById('shift').value;
  const hoursField = document.getElementById('hours');

  let hoursWorked;

  if (shift === 'Отпуск') {
    hoursWorked = 'О';
  } else if (shift === 'Больничный лист') {
    hoursWorked = 'Б';
  } else {
    // Автозаполнение в зависимости от смены
    switch (shift) {
      case 'Утренняя':
      case 'Вечерняя':
      case 'Суббота':
        hoursWorked = 7.2;
        break;
      case 'Полный день':
        hoursWorked = 12;
        break;
      default:
        hoursWorked = parseFloat(hoursField.value); // вручную
    }
  }

  // Отправка данных по каждой дате
  selectedDates.forEach(date => {
    const data = {
      employee,
      date,
      shift,
      hoursWorked
    };
    sendToGoogleSheets(data);
  });
});

// Отправка данных в Google Sheets
function sendToGoogleSheets(data) {
  const url = 'https://script.google.com/macros/s/AKfycbzY67Uk0SHC8grR3888je61RQjnDnzgx9bQkloJzmnZAeohPdVy2CygOmHwVvUJbk-f/exec';

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(() => showNotification('Данные успешно отправлены!', 'success'))
    .catch(() => showNotification('Ошибка отправки данных!', 'error'));
}

// Показ уведомления
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.className = `notification ${type} show`;
  notification.textContent = message;

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}