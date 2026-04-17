gsap.registerPlugin(ScrollTrigger);

const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark" || savedTheme === "light") {
  html.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("portfolio-theme", next);
});

const revealItems = gsap.utils.toArray(".reveal");
revealItems.forEach((item) => {
  gsap.fromTo(
    item,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 88%"
      }
    }
  );
});

const cardElements = document.querySelectorAll(".tilt-card");
cardElements.forEach((card) => {
  const depth = Number(card.dataset.depth || 14);

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * depth;
    const rotateX = (0.5 - (y / rect.height)) * depth;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1400,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.55,
      ease: "power3.out"
    });
  });
});

gsap.fromTo(
  ".orb-1",
  { y: -8, x: 0, rotate: 0 },
  {
    y: 16,
    x: 8,
    rotate: 10,
    duration: 4.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }
);

gsap.fromTo(
  ".orb-2",
  { y: 10, x: -3, rotate: -8 },
  {
    y: -20,
    x: 14,
    rotate: 12,
    duration: 5.1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }
);

gsap.fromTo(
  ".orb-3",
  { y: 0, x: 0, rotate: 5 },
  {
    y: 12,
    x: -10,
    rotate: -9,
    duration: 4.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }
);

const statNumbers = document.querySelectorAll(".stat-num");
statNumbers.forEach((stat) => {
  const endValue = Number(stat.dataset.count || 0);
  const suffix = stat.dataset.suffix || "";
  const counter = { value: 0 };

  ScrollTrigger.create({
    trigger: stat,
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        value: endValue,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          stat.textContent = `${Math.round(counter.value)}${suffix}`;
        }
      });
    }
  });
});

const projectGrid = document.getElementById("projectGrid");
if (projectGrid) {
  gsap.to(projectGrid, {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: projectGrid,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}
