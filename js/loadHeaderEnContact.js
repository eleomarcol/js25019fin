document.addEventListener('DOMContentLoaded', function() {
  const loader = createLoader();
  let componentsLoaded = 0;
  const totalComponents = 1; // Header y footer

  function componentLoaded() {
    componentsLoaded++;
    if (componentsLoaded === totalComponents) {
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
  }

  // Cargar Header
  fetch('./components/header.html')
    .then(response => {
      if (!response.ok) throw new Error('Error cargando header');
      return response.text();
    })
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      componentLoaded();
    })
    .catch(error => {
      console.error(error);
      componentLoaded();
    });
});

function createLoader() {
  const loaderContainer = document.createElement('div');
  loaderContainer.className = 'loader-container';
  loaderContainer.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loaderContainer);
  return loaderContainer;
}
