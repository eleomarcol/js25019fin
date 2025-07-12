document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('main-header');
  const scrollThreshold = 100; // Pixeles a scrollear antes de reducir
  let lastScrollPosition = 0;

  // window.addEventListener('scroll', function() {
  //   const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
  //   // Solo aplicar efectos si se supera el threshold
  //   if (currentScrollPosition > scrollThreshold) {
  //     header.classList.add('header-reducido');
  //   } else {
  //     header.classList.remove('header-reducido');
  //   }
    
  //   lastScrollPosition = currentScrollPosition;
  // });
  window.addEventListener('scroll', function() {
  requestAnimationFrame(function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollPosition > 100) {
      header.classList.add('header-reducido');
    } else {
      header.classList.remove('header-reducido');
    }
  });
}, { passive: true });

  // Inicializar estado
  if (window.pageYOffset > scrollThreshold) {
    header.classList.add('header-reducido');
  }
});

window.addEventListener('scroll', function() {
  requestAnimationFrame(function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollPosition > 100) {
      header.classList.add('header-reducido');
    } else {
      header.classList.remove('header-reducido');
    }
  });
}, { passive: true });