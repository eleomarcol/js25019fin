document.addEventListener('DOMContentLoaded', function() {
  // Cargar el header
  fetch('./components/header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => console.error('Error cargando el header:', error));
});