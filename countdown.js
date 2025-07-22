document.addEventListener("DOMContentLoaded", function () {
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

  // ⚠️ Sistema de mensajes visuales
  function mostrarMensaje(texto, tipo = "exito") {
    const div = document.createElement("div");
    div.textContent = texto;
    div.className = tipo === "error" ? "mensaje-error" : "mensaje-confirmacion";
    div.style.cssText = "position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: #fff; padding: 12px 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 9999; font-size: 16px;";
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  }

  // Formulario
  const form = document.getElementById("formulario-asistencia");
  const asistenciaRadios = form.elements["asistencia"];
  const busRadios = form.elements["bus"];

  const noAsisteCampo = document.getElementById("no-asiste-campo");
  const siAsisteCampos = document.getElementById("si-asiste-campos");
  const plazasBusCampo = document.getElementById("plazas-bus");

  const nombresNo = document.getElementById("nombres_no");
  const nombresSi = document.getElementById("nombres_si");
  const plazasInput = document.getElementById("plazas");

  const botonEnviar = document.getElementById("enviar-asistencia");
  const formFields = document.querySelectorAll('#formulario-asistencia input, #formulario-asistencia select, #formulario-asistencia textarea');
  formFields.forEach(field => {
    field.setAttribute('autocomplete', 'off');
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Submit detectado, disabled?", botonEnviar.disabled);

    const asistencia = form.elements["asistencia"].value;
    const busSeleccionado = form.elements["bus"].value;

    if (!asistencia) {
      mostrarMensaje("Por favor, indica si asistirás.", "error");
      return;
    }

    if (asistencia === "no" && nombresNo.value.trim() === "") {
      mostrarMensaje("Introduce los nombres de quienes no asistirán.", "error");
      return;
    }

    if (asistencia === "si") {
      if (nombresSi.value.trim() === "") {
        mostrarMensaje("Introduce los nombres de los asistentes.", "error");
        return;
      }

      if (!busSeleccionado) {
        mostrarMensaje("Indica si necesitas autobús.", "error");
        return;
      }

      if (busSeleccionado === "si" && (plazasInput.value === "" || parseInt(plazasInput.value) < 1)) {
        mostrarMensaje("Introduce el número de plazas.", "error");
        return;
      }
    }

    const data = {
      asistencia,
      nombres: asistencia === "si" ? nombresSi.value.trim() : nombresNo.value.trim(),
      alergia: form.elements["alergia"]?.value || "",
      bus: busSeleccionado || "",
      plazas: busSeleccionado === "si" ? plazasInput.value : "",
      cancion: form.elements["cancion"]?.value || "",
      mensaje: form.elements["mensaje"]?.value || ""
    };

    fetch("https://script.google.com/macros/s/AKfycbyqj7tJfGLjXbts6ZeOOQ6ohZfE3AcmCH2xb-Ky6-JhkO0ZDoOvX8PCGwGRAy-ep8Ho7w/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors" // ⚠️ Si habilitas CORS en el script, cámbialo a "cors"
    })
      .then(() => {
        mostrarMensaje("¡Gracias por confirmar!");
        form.reset();
        siAsisteCampos.style.display = "none";
        noAsisteCampo.style.display = "none";
        plazasBusCampo.style.display = "none";
        revisarEstadoFormulario();
      })
      .catch((err) => {
        console.error("Error al enviar", err);
        mostrarMensaje("Hubo un problema al enviar tu respuesta.", "error");
      });
  });

  form.addEventListener("change", () => {
    const asistencia = form.elements["asistencia"].value;
    const bus = form.elements["bus"].value;

    noAsisteCampo.style.display = asistencia === "no" ? "block" : "none";
    siAsisteCampos.style.display = asistencia === "si" ? "block" : "none";
    plazasBusCampo.style.display = bus === "si" ? "block" : "none";
  });

  function revisarEstadoFormulario() {
    const asistencia = form.elements["asistencia"].value;

    if (!asistencia) {
      botonEnviar.disabled = true;
      return;
    }

    if (asistencia === "no") {
      botonEnviar.disabled = nombresNo.value.trim() === "";
      return;
    }

    if (asistencia === "si") {
      const nombresOk = nombresSi.value.trim() !== "";
      const busSeleccionado = form.elements["bus"].value;

      if (!busSeleccionado) {
        botonEnviar.disabled = true;
        return;
      }

      const plazasOk = busSeleccionado === "no" || (plazasInput.value && parseInt(plazasInput.value) > 0);
      botonEnviar.disabled = !(nombresOk && plazasOk);
    }
  }

  revisarEstadoFormulario();

  form.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("input", revisarEstadoFormulario);
    el.addEventListener("change", revisarEstadoFormulario);
  });

  // 🩺 Forzar revisión cada medio segundo (por si eventos fallan en móviles)
  setInterval(revisarEstadoFormulario, 500);
});
