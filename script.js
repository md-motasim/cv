/* ═══════════════════════════════════════════════
   Dynamic CV — Main Script
   Mohammad Motasim Bin Nazir
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  // ─── Typed Text Effect (CV Specializations) ──
  const titles = [
    'Electronics & Telecommunications',
    'Data Analytics & Visualization',
    'Business Administration',
    'IT Infrastructure & Networking',
    'Engineering Problem Solving',
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
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 60);
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 30);
    }
  }
  if (typedEl) typeLoop();

  // ─── Toast Notification System ───────────────
  const toast = document.getElementById('toast');
  function showToast(message = 'Copied to clipboard!') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // ─── Copy to Clipboard Functionality ─────────
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied: ${textToCopy}`);

        // Visual feedback
        btn.style.transform = 'scale(0.96)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      }).catch((err) => {
        console.error('Copy failed:', err);
        showToast('Copy failed. Please try manually.');
      });
    });
  });

  // ─── Navbar scroll state & active section ────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');

  function onScroll() {
    const sy = window.scrollY;

    // Compact navbar on scroll
    navbar.classList.toggle('scrolled', sy > 50);

    // Active link highlight based on visible section
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

  if (navToggle && navLinks) {
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
  }

  // ─── Print CV Button ─────────────────────────
  const printBtn = document.getElementById('printCvBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ─── Cursor glow (desktop only) ──────────────
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
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
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach((el) => revealObs.observe(el));

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

  // ─── Skills Filter (Category Tabs) ───────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter skill cards
      skillCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          setTimeout(() => card.classList.add('visible'), 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

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
            const speed = 0.12 + i * 0.06;
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
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Contact form submission handler ─────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origHTML = btn.innerHTML;

      btn.innerHTML = '<span>✓ Message Sent Successfully!</span>';
      btn.style.background = '#00d4aa';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
        showToast('Thank you for reaching out!');
      }, 3200);
    });
  }

  // ─── Hover tilt on cards (subtle 3D effect for desktop) ──
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll(
      '.job-card, .edu-card, .workshop-card, .reference-card, .engagement-card, .metric-card, .skill-card'
    );

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
        const rotateX = ((y - midY) / midY) * -3;
        const rotateY = ((x - midX) / midX) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ─── Performance: Lazy-load animations ───────
  // Ensure animations only trigger when elements are visible
  const lazyAnimEls = document.querySelectorAll('[data-delay]');
  const lazyObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${entry.target.dataset.delay * 100}ms`;
          lazyObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  lazyAnimEls.forEach((el) => lazyObs.observe(el));

  // ─── Enhanced Badge Pulse Animation ──────────
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    setInterval(() => {
      badge.style.animation = 'none';
      setTimeout(() => {
        badge.style.animation = '';
      }, 10);
    }, 5000);
  }

  // ─── Print Optimization ──────────────────────
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
  });

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
  });

  console.log('✓ Dynamic CV initialized — Mohammad Motasim Bin Nazir');
})();
