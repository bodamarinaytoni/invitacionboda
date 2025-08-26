document.addEventListener("DOMContentLoaded", function () {
  // ===== Countdown =====
  const countdownDate = new Date("2025-12-20T11:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      document.getElementById("countdown-timer").innerHTML = "<p>¡Ya es el gran día!</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  
  // ===== Animaciones secuenciales ubicaciones =====
  const ubicaciones = document.querySelectorAll('.ubicacion-ceremonia, .ubicacion-celebracion');

const observerUbicaciones = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(ubicaciones).indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.3}s`;
      entry.target.classList.add('animate');
      observerUbicaciones.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

ubicaciones.forEach(el => observerUbicaciones.observe(el));

  // ===== Countdown animado =====
  const countdownContent = document.querySelector('.countdown-content');
  if (countdownContent) {
    const observerCountdown = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countdownContent.classList.add('animate');
          observerCountdown.unobserve(countdownContent);
        }
      });
    }, { threshold: 0.5 });
    observerCountdown.observe(countdownContent);
  }

  // ===== Animaciones itinerario =====
  const itinerario = document.querySelectorAll('.itinerario .titulo-itinerario, .itinerario .evento');
  const observerItinerario = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(itinerario).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.2}s`;
        entry.target.classList.add('animate');
        observerItinerario.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  itinerario.forEach(el => observerItinerario.observe(el));

  const autobus = document.querySelector('.autobus');

  if (autobus) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animar elementos internos secuencialmente
          const hijos = autobus.children;
          Array.from(hijos).forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate');
            }, index * 150); // retraso 150ms entre cada elemento
          });

          observer.unobserve(autobus); // solo animar una vez
        }
      });
    }, { threshold: 0.3 }); // se activa cuando el 30% de la sección es visible

    observer.observe(autobus);
  }

  const dressElements = document.querySelectorAll('.dress > *');

  const observerDress = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animación secuencial
        const index = Array.from(dressElements).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.3}s`; // retraso por elemento
        entry.target.classList.add('animate');
        observerDress.unobserve(entry.target); // animar solo una vez
      }
    });
  }, { threshold: 0.5 });

  dressElements.forEach(el => observerDress.observe(el));

  const regaloElements = document.querySelectorAll('.regalo > *');

  const observerRegalo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animación secuencial
        const index = Array.from(regaloElements).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 150); // retraso 150ms entre elementos

        observerRegalo.unobserve(entry.target); // solo animar una vez
      }
    });
  }, { threshold: 0.3 });

  regaloElements.forEach(el => observerRegalo.observe(el));

  const asistenciaElements = document.querySelectorAll('.asistencia > *');

  const observerAsistencia = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animación secuencial con efecto pop
        const hijos = Array.from(asistenciaElements);
        hijos.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate');
          }, index * 150); // retraso 150ms entre elementos
        });

        observerAsistencia.unobserve(entry.target); // animar solo una vez
      }
    });
  }, { threshold: 0.3 });

  asistenciaElements.forEach(el => observerAsistencia.observe(el));

  const hotelElements = document.querySelectorAll('.hotel > *');

  const observerHotel = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Array.from(hotelElements).forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate');
          }, index * 250); // retraso mayor para notar mejor el efecto
        });

        observerHotel.unobserve(entry.target); // animar solo una vez
      }
    });
  }, { threshold: 0.3 });

  hotelElements.forEach(el => observerHotel.observe(el));

  
  // 🎵 Música
  const audio = document.getElementById("musica");
  const boton = document.getElementById("toggleMusica");
  const icono = boton.querySelector("i");

  const imagenPantalla = document.getElementById('imagenPantallaCompleta');
  const contenidoPagina = document.getElementById('contenidoPagina');

  let estaSonando = false;

  imagenPantalla.addEventListener('click', function () {
    imagenPantalla.style.display = 'none';
    contenidoPagina.style.display = 'block';

    audio.play().then(() => {
      estaSonando = true;
      icono.classList.remove("fa-play");
      icono.classList.add("fa-pause");
    }).catch(err => {
      console.warn("No se pudo reproducir el audio automáticamente:", err);
    });
  });

  boton.addEventListener("click", () => {
    if (estaSonando) {
      audio.pause();
      icono.classList.remove("fa-pause");
      icono.classList.add("fa-play");
    } else {
      audio.play().then(() => {
        icono.classList.remove("fa-play");
        icono.classList.add("fa-pause");
      }).catch(err => {
        console.warn("No se pudo reproducir el audio:", err);
      });
    }
    estaSonando = !estaSonando;
  });

  // Lógica del formulario de asistencia
  const form = document.getElementById("formulario-asistencia");
  const nombresNo = document.getElementById("nombres_no");
  const nombresSi = document.getElementById("nombres_si");
  const plazasInput = document.getElementById("plazas");
  const botonEnviar = document.getElementById("enviar-asistencia");
  const noAsisteCampo = document.getElementById("no-asiste-campo");
  const siAsisteCampos = document.getElementById("si-asiste-campos");
  const plazasBusCampo = document.getElementById("plazas-bus");

  const formFields = document.querySelectorAll('#formulario-asistencia input, #formulario-asistencia select, #formulario-asistencia textarea');
formFields.forEach(field => {
  field.setAttribute('autocomplete', 'off');
});

  function revisarEstadoFormulario() {
    const asistencia = form.elements["asistencia"].value;
    console.log("Revisar estado - asistencia:", asistencia);

    if (!asistencia) {
      botonEnviar.disabled = true;
      console.log("Botón deshabilitado: no hay asistencia");
      return;
    }

    if (asistencia === "no") {
      const noValido = nombresNo.value.trim() === "";
      botonEnviar.disabled = noValido;
      console.log(`Asistencia NO, nombres vacíos? ${noValido}. Botón deshabilitado: ${botonEnviar.disabled}`);
      return;
    }

    if (asistencia === "si") {
      const nombresOk = nombresSi.value.trim() !== "";
      const busSeleccionado = form.elements["bus"].value;
      const plazasOk = busSeleccionado === "no" || (plazasInput.value && parseInt(plazasInput.value) > 0);
      botonEnviar.disabled = !(nombresOk && busSeleccionado && plazasOk);
      console.log(`Asistencia SI, nombresOk: ${nombresOk}, bus: ${busSeleccionado}, plazasOk: ${plazasOk}`);
      return;
    }
  }

  // Escuchar cambios para revisar estado
  form.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", revisarEstadoFormulario);
    el.addEventListener("change", revisarEstadoFormulario);
  });

  // Mostrar/ocultar campos dinámicos y revisar estado al cambiar asistencia o bus
  form.addEventListener("change", () => {
    const asistencia = form.elements["asistencia"].value;
    const bus = form.elements["bus"]?.value || "";

    noAsisteCampo.style.display = asistencia === "no" ? "block" : "none";
    siAsisteCampos.style.display = asistencia === "si" ? "block" : "none";
    plazasBusCampo.style.display = bus === "si" ? "block" : "none";

    revisarEstadoFormulario();
  });

  // Ejecutar al cargar la página
  revisarEstadoFormulario();

  // Submit del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const asistencia = form.elements["asistencia"].value;
    console.log("Submit - asistencia:", asistencia);

    if (!asistencia) {
      alert("Por favor, indica si asistirás.");
      return;
    }

    if (asistencia === "no") {
      if (nombresNo.value.trim() === "") {
        alert("Por favor, introduce los nombres de los que no asistirán.");
        return;
      }
    }

    if (asistencia === "si") {
      const busSeleccionado = form.elements["bus"].value;
      if (nombresSi.value.trim() === "") {
        alert("Por favor, introduce los nombres de los asistentes.");
        return;
      }
      if (!busSeleccionado) {
        alert("Por favor, indica si necesitas autobús.");
        return;
      }
      if (busSeleccionado === "si" && (plazasInput.value === "" || parseInt(plazasInput.value) < 1)) {
        alert("Introduce el número de plazas de autobús.");
        return;
      }
    }

    // Datos a enviar
    const data = {
      asistencia,
      nombres: asistencia === "si" ? nombresSi.value.trim() : nombresNo.value.trim(),
      alergia: form.elements["alergia"]?.value || "",
      bus: asistencia === "si" ? form.elements["bus"].value : "",
      plazas: asistencia === "si" && form.elements["bus"].value === "si" ? plazasInput.value : "",
      cancion: form.elements["cancion"]?.value || "",
      mensaje: form.elements["mensaje"]?.value || ""
    };

    console.log("Datos para enviar:", data);

    fetch("https://script.google.com/macros/s/AKfycbyqj7tJfGLjXbts6ZeOOQ6ohZfE3AcmCH2xb-Ky6-JhkO0ZDoOvX8PCGwGRAy-ep8Ho7w/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors"
    })
      .then(() => {
        alert("¡Gracias por confirmar!");
        form.reset();
        siAsisteCampos.style.display = "none";
        noAsisteCampo.style.display = "none";
        plazasBusCampo.style.display = "none";
        revisarEstadoFormulario();
      })
      .catch((err) => {
        console.error("Error al enviar", err);
        alert("Hubo un problema al enviar tu respuesta.");
      });
  });
});
