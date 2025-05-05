document.addEventListener("DOMContentLoaded", function () {
  // Control de la cuenta regresiva
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

  let estaSonando = true;

  boton.addEventListener("click", () => {
    if (estaSonando) {
      audio.pause();
      boton.textContent = "🔇";
    } else {
      audio.play();
      boton.textContent = "🔊";
    }
    estaSonando = !estaSonando;
  });

  // Lógica del formulario de asistencia
  const form = document.getElementById("formulario-asistencia");
  const asistenciaRadios = form.elements["asistencia"];
  const busRadios = form.elements["bus"];

  const noAsisteCampo = document.getElementById("no-asiste-campo");
  const siAsisteCampos = document.getElementById("si-asiste-campos");
  const plazasBusCampo = document.getElementById("plazas-bus");

  const nombresNo = document.getElementById("nombres_no");
  const nombresSi = document.getElementById("nombres_si");
  const plazasInput = document.getElementById("plazas");

  function validarFormulario(e) {
    let valido = true;

    const asistencia = form.elements["asistencia"].value;
    if (!asistencia) return e.preventDefault();

    if (asistencia === "no") {
      if (nombresNo.value.trim() === "") {
        valido = false;
        alert("Por favor, introduce los nombres de los que no asistirán.");
        e.preventDefault();
      }
    }

    if (asistencia === "si") {
      if (nombresSi.value.trim() === "") {
        valido = false;
        alert("Por favor, introduce los nombres de los asistentes.");
        e.preventDefault();
      }

      const busSeleccionado = form.elements["bus"].value;
      if (!busSeleccionado) {
        valido = false;
        alert("Por favor, indica si necesitas autobús.");
        e.preventDefault();
      }

      if (busSeleccionado === "si" && (plazasInput.value === "" || parseInt(plazasInput.value) < 1)) {
        valido = false;
        alert("Introduce el número de plazas de autobús.");
        e.preventDefault();
      }
    }
  }

  form.addEventListener("submit", validarFormulario);

  form.addEventListener("change", () => {
    const asistencia = form.elements["asistencia"].value;
    const bus = form.elements["bus"].value;

    noAsisteCampo.style.display = asistencia === "no" ? "block" : "none";
    siAsisteCampos.style.display = asistencia === "si" ? "block" : "none";
    plazasBusCampo.style.display = bus === "si" ? "block" : "none";
  });

  document.getElementById("formulario-asistencia").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      asistencia: document.querySelector('input[name="asistencia"]:checked')?.value || "",
      nombres: document.querySelector("#nombres_si")?.value || document.querySelector("#nombres_no")?.value || "",
      alergia: document.querySelector('input[name="alergia"]')?.value || "",
      bus: document.querySelector('input[name="bus"]:checked')?.value || "",
      plazas: document.querySelector('input[name="plazas"]')?.value || "",
      cancion: document.querySelector('input[name="cancion"]')?.value || "",
      mensaje: document.querySelector('textarea[name="mensaje"]')?.value || ""
    };

    fetch("https://script.google.com/macros/s/AKfycbyqj7tJfGLjXbts6ZeOOQ6ohZfE3AcmCH2xb-Ky6-JhkO0ZDoOvX8PCGwGRAy-ep8Ho7w/exec", { // REEMPLAZA con tu URL
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: 'no-cors'  // Esto deshabilita CORS

    })
    .then(res => res.text())
    .then(msg => {
      alert("¡Gracias por confirmar!");
      document.getElementById("formulario-asistencia").reset();
    })
    .catch(err => {
      console.error("Error al enviar", err);
      alert("Hubo un problema al enviar tu respuesta.");
    });
  });

  // Lógica para mostrar/ocultar campos
  document.querySelectorAll('input[name="asistencia"]').forEach(radio => {
    radio.addEventListener("change", function () {
      document.getElementById("si-asiste-campos").style.display = this.value === "si" ? "block" : "none";
      document.getElementById("no-asiste-campo").style.display = this.value === "no" ? "block" : "none";
    });
  });

  document.querySelectorAll('input[name="bus"]').forEach(radio => {
    radio.addEventListener("change", function () {
      document.getElementById("plazas-bus").style.display = this.value === "si" ? "block" : "none";
    });
  });

});
