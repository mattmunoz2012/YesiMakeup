/* =============================================
   YESIMAKEUP — JavaScript Interactions
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===================== CUSTOM CURSOR =====================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Grow cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, input, select, textarea, .service-card, .gallery-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--gold)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--gold)';
        cursor.style.border = 'none';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // ===================== NAVBAR =====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ===================== SCROLL REVEAL =====================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===================== TESTIMONIALS SLIDER =====================
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('tDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentCard = 0;
  let autoplayTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tcard-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToCard(i));
    dotsContainer?.appendChild(dot);
  });

  function goToCard(index) {
    cards[currentCard]?.classList.remove('active');
    dotsContainer?.children[currentCard]?.classList.remove('active');
    currentCard = (index + cards.length) % cards.length;
    cards[currentCard]?.classList.add('active');
    dotsContainer?.children[currentCard]?.classList.add('active');
  }

  // Init
  if (cards.length > 0) {
    cards[0].classList.add('active');
    autoplayTimer = setInterval(() => goToCard(currentCard + 1), 5000);
  }

  prevBtn?.addEventListener('click', () => {
    clearInterval(autoplayTimer);
    goToCard(currentCard - 1);
    autoplayTimer = setInterval(() => goToCard(currentCard + 1), 5000);
  });

  nextBtn?.addEventListener('click', () => {
    clearInterval(autoplayTimer);
    goToCard(currentCard + 1);
    autoplayTimer = setInterval(() => goToCard(currentCard + 1), 5000);
  });

  // ===================== BOOKING FORM =====================
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = bookingForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#c94a4a';
        valid = false;
        setTimeout(() => {
          field.style.borderColor = '';
        }, 3000);
      }
    });

    if (!valid) return;

    // Simulate form submission
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      bookingForm.style.display = 'none';
      formSuccess.classList.add('show');
    }, 1200);
  });

  // ===================== SMOOTH ANCHOR SCROLL =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===================== HERO PARALLAX =====================
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
    }
  });

  // ===================== STAGGER SERVICE CARDS =====================
  // Already handled via data-delay in IntersectionObserver

  // ===================== ACTIVE NAV LINK =====================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold)';
      }
    });
  });

});
