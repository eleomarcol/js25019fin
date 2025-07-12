// Cargar productos desde tienda.json
fetch("./data/tienda.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("productos-container");

    data.productos.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "producto-card";
      card.dataset.id = producto.id;

      // Creamos el contenedor de la imagen con background-image
      const imagenContainer = document.createElement("div");
      imagenContainer.className = "producto-imagen-container";
      imagenContainer.style.backgroundImage = `url('${producto.imagen}')`;

      // Creamos el contenido de la tarjeta
      const infoDiv = document.createElement("div");
      infoDiv.className = "producto-info";
      infoDiv.innerHTML = `
    <h3 class="producto-titulo">${producto.nombre}</h3>
    <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
    <p class="producto-descripcion">${producto.descripcion}</p>
    <button class="producto-boton">Añadir al carrito</button>
  `;

      // Añadimos los elementos a la tarjeta
      card.appendChild(imagenContainer);
      card.appendChild(infoDiv);

      container.appendChild(card);
    });
  })
  .catch((error) => console.error("Error cargando los productos:", error));

card.innerHTML = `
  <div class="producto-imagen-container">
    <img 
        src="${producto.imagen}" 
        alt="${producto.nombre}" 
        class="producto-imagen">
  </div>
  <div class="producto-info">
    <h3 class="producto-titulo"> ${producto.nombre} </h3>
    <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
    <p class="producto-descripcion">${producto.descripcion}</p>
    <button class="producto-boton">Añadir al carrito</button>
  </div>
`;
