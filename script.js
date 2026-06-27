
    document.addEventListener('DOMContentLoaded', () => {
      /* ============================================================
         1. PREMIUM NAVBAR SCROLL & MENU ARCHITECTURE
         ============================================================ */
      const header = document.getElementById('header');
      const navLinks = document.querySelectorAll('.nav-link');
      const navNavigation = document.getElementById('nav-navigation');
      const premiumHamburger = document.getElementById('hamburger');

      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      if (premiumHamburger && navNavigation) {
        premiumHamburger.addEventListener('click', () => {
          premiumHamburger.classList.toggle('is-active');
          navNavigation.classList.toggle('mobile-active');
        });

        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            premiumHamburger.classList.remove('is-active');
            navNavigation.classList.remove('mobile-active');

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          });
        });
      }

      /* ============================================================
         2. HERO SLIDER LOGIC INTERACTIVITY
         ============================================================ */
      const slides = document.querySelectorAll('.slide-card');
      const dots = document.querySelectorAll('.slider-dot');
      const prevBtn = document.querySelector('.slider-arrow.prev');
      const nextBtn = document.querySelector('.slider-arrow.next');
      let currentSlideIdx = 0;

      const updateSliderUI = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
      };

      if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
          currentSlideIdx = (currentSlideIdx + 1) % slides.length;
          updateSliderUI(currentSlideIdx);
        });
        prevBtn.addEventListener('click', () => {
          currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
          updateSliderUI(currentSlideIdx);
        });
        dots.forEach((dot, idx) => {
          dot.addEventListener('click', () => {
            currentSlideIdx = idx;
            updateSliderUI(currentSlideIdx);
          });
        });
      }

      /* ============================================================
         3. FIXED THEME MANAGER SETUP (DARK / LIGHT THEME ENGINE)
         ============================================================ */
      const themeToggle = document.getElementById('theme-toggle');
      // Read exact state
      const initialTheme = localStorage.getItem('portfolio-theme') || 'dark';

      if (initialTheme === 'light') {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }

      if (themeToggle) {
        themeToggle.addEventListener('click', () => {
          document.body.classList.toggle('light-mode');
          const finalThemeState = document.body.classList.contains('light-mode') ? 'light' : 'dark';
          localStorage.setItem('portfolio-theme', finalThemeState);
        });
      }

      /* ============================================================
         4. MULTILINGUAL DICTIONARY HANDLER (EN / BN ENGINE)
         ============================================================ */
      const langBtns = document.querySelectorAll('.lang-btn');
      const activeLang = localStorage.getItem('portfolio-lang') || 'en';

      const setLanguage = (lang) => {
        document.querySelectorAll('[data-en]').forEach(el => {
          const targetTranslation = el.getAttribute(`data-${lang}`);
          if (targetTranslation) {
            if (targetTranslation.includes('<') && targetTranslation.includes('>')) {
              el.innerHTML = targetTranslation;
            } else {
              el.textContent = targetTranslation;
            }
          }
        });

        langBtns.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        localStorage.setItem('portfolio-lang', lang);
      };

      setLanguage(activeLang);

      langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          setLanguage(btn.getAttribute('data-lang'));
        });
      });

      /* ============================================================
         5. PROJECTS FILTER ACCELERATOR ENGINE
         ============================================================ */
      const filterBtns = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const activeCategory = btn.getAttribute('data-filter');

          projectCards.forEach(card => {
            const itemCategory = card.getAttribute('data-category');
            if (activeCategory === 'all' || itemCategory === activeCategory) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });

      /* ============================================================
         6. STATS ACCELERATED INTERACTIVE COUNTER
         ============================================================ */
      const counters = document.querySelectorAll('.custom-counter');
      counters.forEach(counter => {
        const targetValue = parseInt(counter.getAttribute('data-target'));
        if (targetValue > 1000) {
          counter.textContent = (targetValue / 1000).toFixed(0);
        } else {
          counter.textContent = targetValue;
        }
      });

      /* ============================================================
         7. PREMIUM INTERACTIVE GALLERY LIGHTBOX MODULE
         ============================================================ */
      const galleryItems = document.querySelectorAll('.gallery-item-wrapper');
      const lightboxOverlay = document.getElementById('gallery-lightbox');
      const lightboxImg = document.getElementById('lightbox-hero-img');
      const lightboxClose = document.getElementById('lightbox-close');

      if (galleryItems.length > 0 && lightboxOverlay && lightboxImg) {
        galleryItems.forEach(item => {
          item.addEventListener('click', () => {
            const targetImgSrc = item.querySelector('.gallery-fluid-img').getAttribute('src');
            lightboxImg.setAttribute('src', targetImgSrc);
            lightboxOverlay.classList.add('show');
            lightboxOverlay.setAttribute('aria-hidden', 'false');
          });
        });

        const closeLightboxElement = () => {
          lightboxOverlay.classList.remove('show');
          lightboxOverlay.setAttribute('aria-hidden', 'true');
          setTimeout(() => { lightboxImg.setAttribute('src', ''); }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxElement);
        lightboxOverlay.addEventListener('click', (e) => {
          if (e.target === lightboxOverlay) closeLightboxElement();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && lightboxOverlay.classList.contains('show')) closeLightboxElement();
        });
      }
    });

     /* ============================================================
         7. Contact Form Submission Handler (Google Sheets Integration)
         ============================================================ */

         const scriptURL = '/api/submit';
const form = document.getElementById('portfolio-secure-form');
const submitBtn = form.querySelector('.btn-primary');


const currentLang = document.documentElement.lang || 'en'; 
const loadingText = currentLang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...';
const successText = currentLang === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message sent successfully!';
const errorText = currentLang === 'bn' ? 'দুঃখিত, আবার চেষ্টা করুন।' : 'Error! Please try again.';

form.addEventListener('submit', e => {
  e.preventDefault();
  

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = loadingText;

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      submitBtn.innerHTML = successText;
      form.reset(); 
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 3000);
    })
    .catch(error => {
      console.error('Error!', error.message);
      submitBtn.innerHTML = errorText;
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 3000);
    });
});
