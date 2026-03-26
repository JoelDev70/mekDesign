const copyblockP = document.querySelector(".copy-block p");
const sentences = [
  "Nous concevons des expériences qui inspirent et transforment vos idées en réalité",
];

if (copyblockP) {
  let sentenceIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let currentPhrase = "";
  const delay = 100;

  function type() {
    currentPhrase = sentences[sentenceIndex];
    if (!isDeleting) {
      copyblockP.textContent = currentPhrase.substring(0, letterIndex++);
      if (letterIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      copyblockP.textContent = currentPhrase.substring(0, letterIndex--);

      if (letterIndex < 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
      }
    }
    setTimeout(type, delay);
  }
  type();
}
const hero = document.querySelector(".hero");
const heroH5 = document.querySelector(".hero h5")
hero.addEventListener("mouseover",()=>{
  heroH5.classList.toggle("visible");  
});

const navElements = document.querySelectorAll(".top-nav");

navElements.forEach((nav) => {
  const toggleButton = nav.querySelector(".menu-toggle");
  const menu = nav.querySelector(".menu");

  if (!toggleButton || !menu) {
    return;
  }

  const closeMenu = () => {
    nav.classList.remove("menu-open");
    toggleButton.setAttribute("aria-expanded", "false");
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("menu-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
});

const revealTargets = document.querySelectorAll(
  ".inner-hero, .highlight-card, .content-grid > *, .contact-layout > *, .store-featured, .store-gallery > *, .inner-footer"
);
if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  revealTargets.forEach((element, index) => {
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay", `${index * 80}ms`);
  });

  if (prefersReducedMotion) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealTargets.forEach((element) => observer.observe(element));
  }
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const projectType = document.getElementById("project").value;
    const message = document.getElementById("message").value;
    const texte = `%0ANouveau contact depuis votre portfolio%0A
  Nom : ${name}%0A
  Email : ${email}%0A
  Type : ${projectType}%0A
  Message : ${message}`;

    const numeroWhatsApp = "243977692438";
    const whatsappURL = `https://wa.me/${numeroWhatsApp}?text=${texte}`;

    alert("Votre message est prêt à être envoyé sur WhatsApp !");
    window.open(whatsappURL, "_blank");
    contactForm.reset();
  });
}

const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  const toggleBackToTopButton = () => {
    if (window.scrollY > 280) {
      backToTopButton.classList.add("is-active");
      return;
    }

    backToTopButton.classList.remove("is-active");
  };

  toggleBackToTopButton();
  window.addEventListener("scroll", toggleBackToTopButton, { passive: true });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
