let currentLang = localStorage.getItem("lang") || "en";

async function loadContent() {
  const res = await fetch("content.json");
  const data = await res.json();
  const langData = data[currentLang];

  document.documentElement.dir = langData.dir;

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = langData[key];
  });

  document.getElementById("langToggle").textContent =
    currentLang === "en" ? "AR" : "EN";
}

document.getElementById("langToggle").onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("lang", currentLang);
  location.reload(); // 🔥 refresh page
};

loadContent();


document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});



function animateCounters() {
  const counters = document.querySelectorAll(".count");

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const speed = 200;

    const update = () => {
      const current = +counter.innerText.replace(/,/g, "");
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = (current + increment).toLocaleString();
        setTimeout(update, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  });
}

window.addEventListener("load", animateCounters);

