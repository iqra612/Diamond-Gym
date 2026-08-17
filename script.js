/* ============================================
   DIAMOND GYM — JAVASCRIPT
   ============================================ */

"use strict";

// ─────────────────────────────────────────────
// PRELOADER
// ─────────────────────────────────────────────
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    // Trigger hero animation after preloader
    document.querySelectorAll(".hero [data-animate]").forEach((el, i) => {
      setTimeout(() => el.classList.add("animated"), i * 150);
    });
  }, 900);
});

// ─────────────────────────────────────────────
// PARTICLE CANVAS
// ─────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity * Math.min(1, (this.maxLife - this.life) / 60);
      ctx.fillStyle = Math.random() > 0.85 ? "#FF1E1E" : "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnParticles(n) {
    for (let i = 0; i < n; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  resize();
  spawnParticles(120);
  animate();

  window.addEventListener("resize", () => {
    resize();
    cancelAnimationFrame(animId);
    animate();
  });
})();

// ─────────────────────────────────────────────
// NAVBAR — scroll effect + mobile toggle
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar  = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburgerBtn");
  const navLinks  = document.getElementById("navLinks");

  // Scroll class
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
    hamburger.classList.toggle("active", open);
  });

  // Close on nav link click
  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("active");
    });
  });

  // Active nav link tracking
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle(
        "nav-link-active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });
})();

// ─────────────────────────────────────────────
// SCROLL ANIMATIONS (Intersection Observer)
// ─────────────────────────────────────────────
(function initScrollAnimations() {
  const elements = document.querySelectorAll("[data-animate]");
  // Skip hero elements (handled by preloader callback)
  const nonHero = Array.from(elements).filter(
    el => !el.closest(".hero")
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = parseInt(entry.target.dataset.delay || "0", 10);
        setTimeout(() => entry.target.classList.add("animated"), delay);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nonHero.forEach(el => observer.observe(el));
})();

// ─────────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(ease * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => counterObserver.observe(el));
})();

// ─────────────────────────────────────────────
// FORMS — validation & toast
// ─────────────────────────────────────────────
(function initForms() {
  let toastTimeout;

  function showToast() {
    const toast = document.getElementById("successToast");
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 4000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function setError(input, msg) {
    input.style.borderColor = "#FF1E1E";
    input.style.boxShadow  = "0 0 0 3px rgba(255,30,30,0.2)";
    // Only create message if not exists
    if (!input.nextElementSibling?.classList.contains("field-error")) {
      const err = document.createElement("span");
      err.className = "field-error";
      err.style.cssText = "font-size:11px;color:#FF6B6B;margin-top:4px;display:block;";
      err.textContent = msg;
      input.parentNode.appendChild(err);
    }
  }

  function clearError(input) {
    input.style.borderColor = "";
    input.style.boxShadow   = "";
    const err = input.nextElementSibling;
    if (err?.classList.contains("field-error")) err.remove();
  }

  // Trial form
  const trialForm = document.getElementById("trialForm");
  if (trialForm) {
    // Live validation
    trialForm.querySelectorAll(".form-input").forEach(input => {
      input.addEventListener("blur", () => {
        clearError(input);
        if (input.required && !input.value.trim()) {
          setError(input, "This field is required.");
        } else if (input.type === "email" && input.value && !validateEmail(input.value)) {
          setError(input, "Please enter a valid email address.");
        }
      });
      input.addEventListener("input", () => clearError(input));
    });

    trialForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const firstName = document.getElementById("firstName");
      const lastName  = document.getElementById("lastName");
      const email     = document.getElementById("email");

      [firstName, lastName, email].forEach(f => clearError(f));

      if (!firstName.value.trim()) { setError(firstName, "Required."); valid = false; }
      if (!lastName.value.trim())  { setError(lastName,  "Required."); valid = false; }
      if (!email.value.trim())     { setError(email, "Required."); valid = false; }
      else if (!validateEmail(email.value)) { setError(email, "Valid email required."); valid = false; }

      if (valid) {
        const btn = document.getElementById("trialSubmitBtn");
        btn.textContent = "SUBMITTING...";
        btn.disabled = true;

        // Simulate async submission
        setTimeout(() => {
          trialForm.reset();
          btn.innerHTML = 'CLAIM FREE TRIAL NOW <span class="btn-arrow">→</span>';
          btn.disabled = false;
          showToast();
        }, 1200);
      }
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      clearError(emailInput);

      if (!validateEmail(emailInput.value)) {
        setError(emailInput, "Enter a valid email.");
        return;
      }

      const btn = document.getElementById("newsletterSubmitBtn");
      btn.style.background = "#00C45A";
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

      setTimeout(() => {
        newsletterForm.reset();
        btn.style.background = "";
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        showToast();
      }, 2000);
    });
  }
})();

// ─────────────────────────────────────────────
// SMOOTH SCROLL for anchor links
// ─────────────────────────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();

// ─────────────────────────────────────────────
// PARALLAX — subtle hero image shift
// ─────────────────────────────────────────────
(function initParallax() {
  const heroImg = document.querySelector(".hero-img-wrapper");
  if (!heroImg) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const maxH = window.innerHeight;
        if (scrolled < maxH) {
          heroImg.style.transform = `translateY(${scrolled * 0.12}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ─────────────────────────────────────────────
// CURSOR GLOW (desktop only)
// ─────────────────────────────────────────────
(function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch

  const cursor = document.createElement("div");
  cursor.style.cssText = `
    position:fixed; pointer-events:none; z-index:9998;
    width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(255,30,30,0.06) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: opacity 0.3s ease;
    top:0; left:0;
  `;
  document.body.appendChild(cursor);

  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener("mousemove", e => {
    tx = e.clientX;
    ty = e.clientY;
    cursor.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function loop() {
    cx = lerp(cx, tx, 0.12);
    cy = lerp(cy, ty, 0.12);
    cursor.style.left = cx + "px";
    cursor.style.top  = cy + "px";
    requestAnimationFrame(loop);
  })();
})();

// ─────────────────────────────────────────────
// CARD HOVER TILT (philosophy & class cards)
// ─────────────────────────────────────────────
(function initCardTilt() {
  const cards = document.querySelectorAll(".philosophy-card, .class-card, .membership-card");
  if (window.matchMedia("(pointer: coarse)").matches) return;

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
