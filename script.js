// Mostrar a página principal
function mostrarSite() {
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("principal").classList.remove("hidden");
  localStorage.setItem("abriu", "sim");
  iniciarSlide();
  iniciarContador();

  // Tocar música
  const musica = document.getElementById("musica");
  musica.currentTime = 0;
  musica.play();
}

// Voltar para a tela inicial
function voltarInicio() {
  document.getElementById("inicio").classList.remove("hidden");
  document.getElementById("principal").classList.add("hidden");
  localStorage.removeItem("abriu");

  // Parar música
  const musica = document.getElementById("musica");
  musica.pause();
  musica.currentTime = 0;
}

// Slideshow
let slides = [];
let index = 0;
let slideInterval;

function iniciarSlide() {
  slides = document.querySelectorAll(".slide");
  slides.forEach((s) => s.classList.remove("active"));
  index = 0;
  slides[index].classList.add("active");

  if (slideInterval) clearInterval(slideInterval);

  slideInterval = setInterval(() => {
    mudarSlide(1);
  }, 4000);
}

function mudarSlide(n) {
  slides[index].classList.remove("active");
  index += n;
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  slides[index].classList.add("active");

  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    mudarSlide(1);
  }, 4000);
}

// Contador
let contadorInterval;
function iniciarContador() {
  const inicio = new Date("2025-05-24T20:00:00");

  if (contadorInterval) clearInterval(contadorInterval);

  contadorInterval = setInterval(() => {
    const agora = new Date();

    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();
    let segundos = agora.getSeconds() - inicio.getSeconds();

    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos < 0) { minutos += 60; horas--; }
    if (horas < 0) { horas += 24; dias--; }
    if (dias < 0) {
      const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior;
      meses--;
    }
    if (meses < 0) { meses += 12; anos--; }

    let texto = "Desde o dia que te beijei e sabia que era você, se passaram ";
    if (anos > 0) texto += `${anos} anos, `;
    texto += `${meses} meses, ${dias} dias, ${horas}h ${minutos}m ${segundos}s 💕`;

    document.getElementById("contador").textContent = texto;
  }, 1000);
}

// Mini Player Spotify Style
const musica = document.getElementById("musica");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");

playPauseBtn.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    playPauseBtn.textContent = "⏸"; // pause preto
  } else {
    musica.pause();
    playPauseBtn.textContent = "▶"; // play preto
  }
});

musica.addEventListener("timeupdate", () => {
  progress.value = (musica.currentTime / musica.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  musica.currentTime = (progress.value / 100) * musica.duration;
});

musica.addEventListener("play", () => playPauseBtn.textContent = "⏸");
musica.addEventListener("pause", () => playPauseBtn.textContent = "▶");

// Verifica se já foi aberto antes
window.onload = () => {
  if (localStorage.getItem("abriu") === "sim") {
    mostrarSite();
  }
};
