const sections = ["welcome", "intro", "gallery", "contact"];
let currentIndex = 0;

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

function updateView() {
  pages.forEach((page, i) => {
    page.style.display = i === currentIndex ? "block" : "none";
  });

  navButtons.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });

  updateButtons();
}

function updateButtons() {
  pages.forEach((page, i) => {
    const prevBtn = page.querySelector("button[id^='prevBtn']");
    const nextBtn = page.querySelector("button[id^='nextBtn']");

    if (prevBtn) prevBtn.disabled = (currentIndex === 0);
    if (nextBtn) nextBtn.disabled = (currentIndex === sections.length - 1);
  });
}

function goToSection(index) {
  if (index < 0 || index >= sections.length) return;
  currentIndex = index;
  updateView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function prevSection() {
  if (currentIndex > 0) {
    goToSection(currentIndex - 1);
  }
}

function nextSection() {
  if (currentIndex < sections.length - 1) {
    goToSection(currentIndex + 1);
  }
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index, 10);
    goToSection(index);
  });
});

pages.forEach((page) => {
  const prevBtn = page.querySelector("button[id^='prevBtn']");
  const nextBtn = page.querySelector("button[id^='nextBtn']");

  if (prevBtn) prevBtn.addEventListener("click", prevSection);
  if (nextBtn) nextBtn.addEventListener("click", nextSection);
});

updateView();
