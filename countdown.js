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

  

  // ===== Secciones animadas =====
  const seccionesAnimadas = [
    { selector: '.countdown', clase: 'animate-left'},
    { selector: '.ubicacion-ceremonia, .ubicacion-celebracion', clase: 'animate-up', delay: 500 },
    { selector: '.countdown-content', clase: 'animate-up', delay: 300 },
    { selector: '.autobus > *', clase: 'animate-left', delay: 150 },
    { selector: '.itinerario .titulo-itinerario, .itinerario .evento', clase: 'animate-curtain-vertical', delay: 200 },
    { selector: '.dress > *', clase: 'animate-up', delay: 150 },
    { selector: '.regalo > *', clase: 'animate-pop', delay: 150 },
    { selector: '.asistencia > *', clase: 'animate-pop', delay: 150 },
    { selector: '.hotel > *', clase: 'animate-fade', delay: 250 }
  ];

  seccionesAnimadas.forEach(seccion => {
    const elementos = document.querySelectorAll(seccion.selector);

    elementos.forEach(el => el.classList.add(seccion.clase)); // clase base

    if (elementos.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(elementos).forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate');
            }, index * seccion.delay);
          });
          obs.disconnect(); // animar solo una vez
        }
      });
    }, { threshold: 0.3 });

    // Observamos el primer elemento de la sección
    observer.observe(elementos[0].parentElement || elementos[0]);
  });

  
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
