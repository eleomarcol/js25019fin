document.addEventListener('DOMContentLoaded', function() {
  // Cargar el footer
  fetch('./components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
    })
    .catch(error => console.error('Error cargando el footer:', error));
});