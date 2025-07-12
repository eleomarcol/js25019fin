// Cargar el header cuando el documento esté listo
document.addEventListener("DOMContentLoaded", function () {
  // En lugar de cargar de un archivo externo, insertamos directamente
  document.getElementById("header-container").innerHTML = `
                <header>
                    <div class="header-container">
                        <a href="index.html" class="logo">
                            <svg class="logo-svg" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                                <!-- Letras SMA -->
                                <text x="5" y="20" font-family="Arial" font-weight="800" font-size="20" fill="#2c5e92">S</text>
                                <text x="5" y="40" font-family="Arial" font-weight="800" font-size="20" fill="#2c5e92">M</text>
                                <text x="5" y="60" font-family="Arial" font-weight="800" font-size="20" fill="#2c5e92">A</text>
                                
                                <!-- San Miguel Arcángel simplificado -->
                                <!-- Cabeza -->
                                <circle cx="75" cy="20" r="8" fill="#f9d9aa"/>
                                
                                <!-- Cuerpo -->
                                <path d="M 75 30 L 65 50 L 85 50 Z" fill="#2c5e92"/>
                                
                                <!-- Brazos -->
                                <path d="M 65 35 L 55 45 L 58 47 L 68 37 Z" fill="#f9d9aa"/>
                                <path d="M 85 35 L 95 45 L 92 47 L 82 37 Z" fill="#f9d9aa"/>
                                
                                <!-- Espada -->
                                <rect x="73" y="15" width="4" height="35" fill="#c0c0c0"/>
                                <path d="M 73 15 L 75 10 L 77 15 Z" fill="#c0c0c0"/>
                                
                                <!-- Alas -->
                                <path d="M 75 30 Q 60 25 60 40 Q 62 48 75 45" fill="#ffd700" opacity="0.8"/>
                                <path d="M 75 30 Q 90 25 90 40 Q 88 48 75 45" fill="#ffd700" opacity="0.8"/>
                            </svg>
                            <div class="logo-text">Colegio <span>San Miguel</span></div>
                        </a>
                        <nav>
                            <ul>
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="actividades.html">Actividades</a></li>
                                <li><a href="calendario.html">Calendario</a></li>
                                <li><a href="contacto.html">Contacto</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            `;
  setActiveLink();
});

// Función para el carrusel
function moveSlide(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const inner = carousel.querySelector(".carousel-inner");
  const items = carousel.querySelectorAll(".carousel-item");
  const itemWidth = items[0].clientWidth;

  let currentPosition = parseInt(
    inner.style.transform?.replace("translateX(", "").replace("px)", "") || 0
  );
  let maxPosition = -itemWidth * (items.length - 1);

  let newPosition = currentPosition + direction * itemWidth;

  // Limitar el desplazamiento
  if (newPosition > 0) newPosition = maxPosition;
  if (newPosition < maxPosition) newPosition = 0;

  inner.style.transform = `translateX(${newPosition}px)`;
}

// Auto-avance del carrusel
setInterval(() => {
  moveSlide("institucionalCarousel", -1);
  moveSlide("actividadesCarousel", -1);
}, 5000);
