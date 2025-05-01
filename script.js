let selectedDates = [];

flatpickr("#multiDatePicker", {
  mode: "multiple",
  dateFormat: "Y-m-d",
  locale: "ru",
  onChange: function (selectedDatesArr) {
    selectedDates = selectedDatesArr.map(date => date.toISOString().split('T')[0]);
  }
});

document.getElementById('scheduleForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const employee = document.getElementById('employee').value;
  const shift = document.getElementById('shift').value;
  const hoursField = document.getElementById('hours');

  let hoursWorked = 0;
  let label = "";

  switch (shift) {
    case 'Утренняя':
    case 'Средняя':
    case 'Вечерняя':
    case 'Суббота':
      hoursWorked = 7.2;
      break;
    case 'Полный день':
      hoursWorked = 12;
      break;
    case 'Отпуск':
      hoursWorked = 0;
      label = 'О';
      break;
    case 'Больничный лист':
      hoursWorked = 0;
      label = 'Б';
      break;
    default:
      hoursWorked = parseFloat(hoursField.value);
  }

  selectedDates.forEach(date => {
    const data = {
      employee,
      date,
      shift,
      hoursWorked,
      label
    };
    sendToGoogleSheets(data);
  });
});

function sendToGoogleSheets(data) {
  const url = 'https://script.google.com/macros/s/AKfycbzx4BD9PUbbo99_zWjbfpifyl2lPP7rr6yU8TntlK4/dev';

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
