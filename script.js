const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "✕" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
    if (menuBtn) menuBtn.textContent = "☰";
  });
});

document.querySelectorAll(".council-head").forEach(button => {
  button.addEventListener("click", () => {
    const current = button.closest(".council");
    const wasActive = current.classList.contains("active");

    document.querySelectorAll(".council").forEach(item => {
      item.classList.remove("active");
      const head = item.querySelector(".council-head");
      head.setAttribute("aria-expanded", "false");
      item.querySelector(".plus").textContent = "+";
    });

    if (!wasActive) {
      current.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      current.querySelector(".plus").textContent = "−";
    }
  });
});

const search = document.getElementById("doctrineSearch");
const cards = [...document.querySelectorAll(".doctrine-card")];

search?.addEventListener("input", event => {
  const term = event.target.value.toLowerCase().trim();
  cards.forEach(card => {
    const haystack = (card.dataset.search + " " + card.textContent).toLowerCase();
    card.classList.toggle("hidden", Boolean(term) && !haystack.includes(term));
  });
});

const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
