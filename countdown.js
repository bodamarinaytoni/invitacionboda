// Fecha del evento
const eventDate = new Date("Dec 20, 2025 00:00:00").getTime();

// Actualiza el contador cada segundo
const x = setInterval(function() {

  // Obtiene la fecha y hora actual
  const now = new Date().getTime();

  // Calcula la diferencia entre la fecha del evento y la fecha actual
  const distance = eventDate - now;

  // Cálculos de tiempo
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Muestra los resultados
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // Si la cuenta atrás llega a cero, muestra un mensaje
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-timer").innerHTML = "¡Es el gran día!";
  }
}, 1000);
