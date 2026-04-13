document.addEventListener("DOMContentLoaded", () => {

  // TYPEWRITER
  const text = "I build high-conversion websites that grow businesses.";
  const hero = document.getElementById("heroText");

  let i = 0;

  function type() {
    if (!hero) return;

    if (i < text.length) {
      hero.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 35);
    }
  }

  type();

  // DARK MODE (SAFE)
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // GSAP ANIMATIONS
  gsap.utils.toArray(".card").forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });

});