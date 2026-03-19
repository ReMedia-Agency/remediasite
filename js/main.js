/**
 * ReMedia Agency — Main Interactions (Multi-Page)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─── Active Nav Link Detection ─────────────────────── */
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';

  const navMappings = {
    'index.html': null,
    'about.html': 'About',
    'services.html': 'Services',
    'industries.html': 'Industries',
    'results.html': 'Results',
    'why-remedia.html': 'Why Us',
    'contact.html': 'Contact',
    'website-design.html': 'Services',
    'seo.html': 'Services',
    'digital-marketing.html': 'Services',
    'branding.html': 'Services'
  };

  const activeLabel = navMappings[pageName];

  if (activeLabel) {
    document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
      if (link.textContent.trim() === activeLabel) {
        link.classList.add('active');
      }
    });
  }


  /* ─── Smooth Scrolling (for # links) ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        closeMobileMenu();

        const headerHeight = document.querySelector('#site-header').offsetHeight;
        const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });


  /* ─── Navbar Scroll State ─────────────────────────────── */
  const header = document.querySelector('#site-header');
  let lastScroll = 0;

  const updateHeader = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ─── Mobile Menu ─────────────────────────────────────── */
  const hamburger = document.querySelector('#hamburger');
  const mobileMenu = document.querySelector('#mobile-menu');

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMobileMenu());
    });
  }


  /* ─── Dark Mode Toggle ────────────────────────────────── */
  const themeToggle = document.querySelector('#theme-toggle');
  const html = document.documentElement;

  // Check stored preference
  const storedTheme = localStorage.getItem('remedia-theme');
  if (storedTheme) {
    html.setAttribute('data-theme', storedTheme);
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.setAttribute('data-theme', 'dark');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('remedia-theme', next);
    });
  }


  /* ─── FAQ Accordion ───────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question');
        otherBtn.setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  /* ─── Scroll Reveal ───────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ─── Animated Stat Counters ──────────────────────────── */
  const statNumbers = document.querySelectorAll('.hero-stat-number[data-count]');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    };

    tick();
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));


  /* ─── Contact Form Handler ────────────────────────────── */
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      const formCard = contactForm.closest('.form-card');
      formCard.innerHTML = `
        <div class="form-success">
          <div class="form-success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3>Thank You!</h3>
          <p>Your inquiry has been received. A member of our team will reach out to you within 24 hours to schedule your free strategy call.</p>
        </div>
      `;
    });
  }
});
