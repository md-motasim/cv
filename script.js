/* ═══════════════════════════════════════════════
   Portfolio — Main Script
   Scroll animations, typed text, counters, nav
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Typed Text Effect ───────────────────────
  const titles = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Open-Source Contributor',
    'Problem Solver',
  ];
  let titleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const typedEl = document.getElementById('typedText');

  function typeLoop() {
    const current = titles[titleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
      setTimeout(typeLoop, 80);
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 40);
    }
  }
  typeLoop();

  // ─── Navbar scroll state ─────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');

  function onScroll() {
    const sy = window.scrollY;

    // Compact navbar
    navbar.classList.toggle('scrolled', sy > 50);

    // Active link highlight
    let currentId = '';
    sections.forEach((sec) => {
      if (sy >= sec.offsetTop - 200) {
        currentId = sec.id;
      }
    });
    document.querySelectorAll('.nav-links a').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Mobile nav toggle ───────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ─── Cursor glow (desktop only) ─────────────
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches) {
    let glowVisible = false;
    document.addEventListener('mousemove', (e) => {
      if (!glowVisible) {
        glow.style.opacity = '1';
        glowVisible = true;
      }
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ─── Intersection Observer — scroll reveals ──
  const revealEls = document.querySelectorAll(
    '.anim-reveal, .anim-reveal-left, .anim-reveal-right, .anim-reveal-up'
  );

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObs.observe(el));

  // ─── Counter animation ───────────────────────
  const counters = document.querySelectorAll('.anim-counter');

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const numEl = el.querySelector('.stat-number');
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          numEl.textContent = current;
        }, 25);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObs.observe(c));

  // ─── Skill bar fill on scroll ────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        barObs.unobserve(bar);
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((b) => barObs.observe(b));

  // ─── Parallax on hero shapes ─────────────────
  const shapes = document.querySelectorAll('.shape');
  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          shapes.forEach((s, i) => {
            const speed = 0.15 + i * 0.08;
            s.style.transform = `translateY(${sy * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // ─── Smooth scroll for anchor links ──────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Contact form placeholder handler ────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent! ✓</span>';
      btn.style.background = '#00d4aa';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ─── Tilt effect on project cards ────────────
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -4;
      const rotateY = ((x - midX) / midX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
