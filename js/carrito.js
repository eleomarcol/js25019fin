document.addEventListener('DOMContentLoaded', function() {
  // Variables
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoIcono = document.getElementById('carrito-icono');
  const carritoModal = document.getElementById('carrito-modal');
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  const carritoContador = document.getElementById('carrito-contador');
  const cerrarCarrito = document.querySelector('.cerrar-carrito');
  const finalizarCompraBtn = document.getElementById('finalizar-compra');

  // Eventos
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('producto-boton')) {
      const productoElement = e.target.closest('.producto-card');
      const productoId = parseInt(productoElement.dataset.id);
      agregarAlCarrito(productoId);
    }
  });

  carritoIcono.addEventListener('click', mostrarCarrito);
  cerrarCarrito.addEventListener('click', ocultarCarrito);
  finalizarCompraBtn.addEventListener('click', finalizarCompra);

  // Funciones
  function agregarAlCarrito(productoId) {
    fetch('./data/tienda.json')
      .then(response => response.json())
      .then(data => {
        const producto = data.productos.find(p => p.id === productoId);
        
        const itemExistente = carrito.find(item => item.id === productoId);
        
        if (itemExistente) {
          itemExistente.cantidad++;
        } else {
          carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
          });
        }
        
        actualizarCarrito();
        mostrarNotificacion(`${producto.nombre} añadido al carrito`);
      });
  }

  function actualizarCarrito() {
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    carritoContador.textContent = totalItems;
    
    // Actualizar lista de items
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
      carritoItems.innerHTML = '<p>Tu carrito está vacío</p>';
      carritoTotal.textContent = '$0.00';
      return;
    }
    
    let total = 0;
    
    carrito.forEach(item => {
      const itemTotal = item.precio * item.cantidad;
      total += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'carrito-item';
      itemElement.innerHTML = `
        <img 
          src="${item.imagen}" 
          alt="${item.nombre}" 
          style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin: 10px">
        <div class="carrito-item-info">
          <div class="carrito-item-nombre">${item.nombre}</div>
          <div class="carrito-item-precio">$${item.precio.toFixed(2)}</div>
        </div>
        <div class="carrito-item-cantidad">
          <button class="disminuir" data-id="${item.id}">-</button>
          <span>${item.cantidad}</span>
          <button class="aumentar" data-id="${item.id}">+</button>
        </div>
        <div class="carrito-item-total">$${itemTotal.toFixed(2)}</div>
        <div class="carrito-item-eliminar" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </div>
      `;
      
      carritoItems.appendChild(itemElement);
    });
    
    // Actualizar total
    carritoTotal.textContent = `$${total.toFixed(2)}`;
    
    // Agregar eventos a los nuevos botones
    document.querySelectorAll('.disminuir').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        disminuirCantidad(id);
      });
    });
    
    document.querySelectorAll('.aumentar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        aumentarCantidad(id);
      });
    });
    
    document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        eliminarDelCarrito(id);
      });
    });
  }

  function aumentarCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
      item.cantidad++;
      actualizarCarrito();
    }
  }

  function disminuirCantidad(id) {
    const item = carrito.find(item => item.id === id);
    if (item) {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        carrito = carrito.filter(item => item.id !== id);
      }
      actualizarCarrito();
    }
  }

  function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
  }

  function mostrarCarrito() {
    carritoModal.style.display = 'block';
    actualizarCarrito();
  }

  function ocultarCarrito() {
    carritoModal.style.display = 'none';
  }

  function finalizarCompra() {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    alert('Gracias por tu compra! Total: ' + carritoTotal.textContent);
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    ocultarCarrito();
  }

  function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.classList.add('mostrar');
    }, 10);
    
    setTimeout(() => {
      notificacion.classList.remove('mostrar');
      setTimeout(() => {
        document.body.removeChild(notificacion);
      }, 300);
    }, 3000);
  }

  // Inicializar carrito
  actualizarCarrito();
});