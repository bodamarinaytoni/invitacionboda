document.addEventListener("DOMContentLoaded", function () {
  // Cuenta regresiva
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
  const musica = document.getElementById("musica");
  const toggleBtn = document.getElementById("toggle-musica");

  // Iniciar reproducción (cuando sea posible)
  musica.volume = 0.5;
  musica.play().then(() => {
    toggleBtn.textContent = "🔊";
  }).catch(() => {
    // Si falla, espera a que el usuario interactúe
    toggleBtn.textContent = "🔈";
  });

  toggleBtn.addEventListener("click", () => {
    if (musica.paused) {
      musica.play();
      toggleBtn.textContent = "🔊";
    } else {
      musica.pause();
      toggleBtn.textContent = "🔈";
    }
  });
});
