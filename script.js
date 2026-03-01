// ✅ Edit these
const HER_NAME = "Tink";
const YOUR_NAME = "Shanks";
const START_DATE = "2025-08-01"; // <-- change to your anniversary date (YYYY-MM-DD)

// Elements
const herNameEl = document.getElementById("herName");
const yourNameEl = document.getElementById("yourName");
const footerNameEl = document.getElementById("footerName");
const counterEl = document.getElementById("togetherCounter");
const scrollBtn = document.getElementById("scrollToLove");

const music = document.getElementById("music");
const toggleMusicBtn = document.getElementById("toggleMusic");

const reasonReveal = document.getElementById("reasonReveal");
const reasonButtons = document.querySelectorAll("[data-reason]");

const noteButtons = document.querySelectorAll("[data-note]");
const dialog = document.getElementById("noteDialog");
const noteText = document.getElementById("noteText");
const closeDialog = document.getElementById("closeDialog");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");

// Set names
herNameEl.textContent = HER_NAME;
yourNameEl.textContent = YOUR_NAME;
footerNameEl.textContent = YOUR_NAME;

// Smooth scroll
scrollBtn.addEventListener("click", () => {
  document.getElementById("loveLetter").scrollIntoView({ behavior: "smooth" });
});

// Together counter
function updateCounter() {
  const start = new Date(START_DATE + "T00:00:00");
  const now = new Date();

  const diff = now - start;
  if (diff < 0) {
    counterEl.textContent = "Set your START_DATE in script.js 💞";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);

  counterEl.textContent = `Together for ${days} days, ${hours} hours, ${mins} minutes ♡`;
}
updateCounter();
setInterval(updateCounter, 30_000);

// Music toggle
toggleMusicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      toggleMusicBtn.textContent = "Pause music ♪";
      toggleMusicBtn.setAttribute("aria-pressed", "true");
    } else {
      music.pause();
      toggleMusicBtn.textContent = "Play music ♪";
      toggleMusicBtn.setAttribute("aria-pressed", "false");
    }
  } catch (e) {
    alert("Add an mp3 named song.mp3 to the same folder (or remove the music button).");
  }
});

// Reasons reveal
reasonButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    reasonReveal.textContent = btn.dataset.reason;
  });
});

// Open When dialog
noteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    noteText.textContent = btn.dataset.note;
    dialog.showModal();
  });
});
closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  const rect = dialog.querySelector(".dialog-inner").getBoundingClientRect();
  const inBox =
    e.clientX >= rect.left && e.clientX <= rect.right &&
    e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inBox) dialog.close();
});

// Surprise
surpriseBtn.addEventListener("click", () => {
  surpriseBox.hidden = false;
  surpriseBox.scrollIntoView({ behavior: "smooth", block: "center" });
});