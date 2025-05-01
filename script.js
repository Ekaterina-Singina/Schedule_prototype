// Инициализация Flatpickr с множественным выбором дат
flatpickr("#date", {
  mode: "multiple",
  dateFormat: "Y-m-d"
});

document.getElementById('scheduleForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const employee = document.getElementById('employee').value;
  const dates = document.getElementById('date').value.split(','); // получаем все выбранные даты
  const shift = document.getElementById('shift').value;
  const hoursWorked = parseInt(document.getElementById('hours').value, 10);

  dates.forEach(date => {
    const data = {
      employee,
      date: date.trim(),
      shift,
      hoursWorked
    };

    sendToGoogleSheets(data);
  });
});

function sendToGoogleSheets(data) {
  const url = 'https://script.google.com/macros/s/AKfycbzY67Uk0SHC8grR3888je61RQjnDnzgx9bQkloJzmnZAeohPdVy2CygOmHwVvUJbk-f/exec'; // Замените на ваш ID скрипта

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

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.className = `notification ${type} show`;
  notification.textContent = message;

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}