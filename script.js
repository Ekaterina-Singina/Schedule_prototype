document.getElementById('scheduleForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const employee = document.getElementById('employee').value;
    const date = document.getElementById('date').value;
    const shift = document.getElementById('shift').value;
    const hoursWorked = parseInt(document.getElementById('hours').value, 10);
  
    const data = {
      employee,
      date,
      shift,
      hoursWorked
    };
  
    sendToGoogleSheets(data);
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
  