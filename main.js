// Seleccionamos elementos
const btnAgregar = document.querySelector("#agregar");
const inputNombre = document.querySelector("#nombrePokemon");
const contenedorGaleria = document.querySelector(".galeria");

// Evento click al botón
btnAgregar.addEventListener("click", async () => {
    const nombre = inputNombre.value.toLowerCase().trim();
  
    if (!nombre) {
      alert("Por favor escribe un nombre de Pokémon");
      return;
    }
  
    try {
      // Usamos fetch para obtener los datos del Pokémon por nombre
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      if (!respuesta.ok) throw new Error("Pokémon no encontrado");
  
      const datos = await respuesta.json();
      const imagen = datos.sprites.other['official-artwork'].front_default;
  
      const nuevaTarjeta = `
        <div class="tarjeta">
          <img src="${imagen}" alt="${nombre}">
          <p>${nombre}</p>
          <button class="eliminar">X</button>
        </div>
      `;
  
      contenedorGaleria.insertAdjacentHTML("beforeend", nuevaTarjeta);
      inputNombre.value = "";
    } catch (error) {
      alert("Ese Pokémon no existe 😢");
    }
  });

  // Usamos la PokéAPI para mostrar el sprite del Pokémon (por nombre)
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${inputNombre}.png`;

  // Creamos la tarjeta con ese nombre
  const nuevaTarjeta = `
    <div class="tarjeta">
      <img src="${url}" alt="${inputNombre}">
      <p>${inputNombre}</p>
      <button class="eliminar">X</button>
    </div>
  `;

  contenedorGaleria.insertAdjacentHTML("beforeend", nuevaTarjeta);
  inputNombre.value = ""; // limpiamos el campo
// Delegación de eventos: escuchar clicks dentro de la galería
contenedorGaleria.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("eliminar")) {
      const tarjeta = evento.target.closest(".tarjeta");
      tarjeta.remove(); // Elimina la tarjeta entera
    }
  });

  // Evento para reemplazar la imagen al hacer clic sobre ella
contenedorGaleria.addEventListener("click", (evento) => {
    // Si se hace clic sobre una imagen
    if (evento.target.tagName === "IMG") {
      const imagen = evento.target;
  
      // Verificamos si ya es shiny
      const nombre = imagen.alt.toLowerCase();
      const esShiny = imagen.dataset.shiny === "true";
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(res => res.json())
        .then(data => {
          const nuevaImagen = esShiny
            ? data.sprites.other["official-artwork"].front_default
            : data.sprites.front_shiny;
  
          imagen.src = nuevaImagen;
          imagen.dataset.shiny = (!esShiny).toString(); // Guardamos si es shiny o no
        });
    }
  });

  // Animación solo en la imagen al pasar el ratón (hover)
contenedorGaleria.addEventListener("mouseenter", (evento) => {
    if (evento.target.tagName === "IMG") {
      evento.target.animate(
        [
          { transform: "scale(1)", filter: "brightness(1)" },
          { transform: "scale(1.1)", filter: "brightness(1.1)" },
        ],
        {
          duration: 300,
          fill: "forwards",
        }
      );
    }
  }, true);
  
