/**
* Template Name: FlexBiz
* Template URL: https://bootstrapmade.com/flexbiz-bootstrap-business-template/
* Updated: Aug 04 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  const triggers = document.querySelectorAll('.video-trigger, .video-trigger-inline');
  const embedHost = document.querySelector('.video-embed');
  const instagramTriggers = document.querySelectorAll('.instagram-confirm-trigger');
  const instagramConfirmation = document.getElementById('instagram-confirmation');
  const instagramConfirmationCloseButtons = document.querySelectorAll('[data-instagram-confirm-close]');
  const instagramConfirmationContinue = instagramConfirmation
    ? instagramConfirmation.querySelector('.instagram-confirmation__continue')
    : null;
  let lastInstagramTrigger = null;

  // Fungsi untuk membuka video Instagram
  function openVideo(trigger) {
    if (!embedHost || !trigger) return;
    const embedUrl = trigger.dataset.embed;
    if (!embedUrl) return;

    if (!embedHost.dataset.loaded) {
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl;
      iframe.title = 'Instagram Reel';
      iframe.loading = 'lazy';
      iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      embedHost.innerHTML = '';
      embedHost.appendChild(iframe);
      embedHost.dataset.loaded = 'true';
    }
  }

  // Mengatur tombol pemutar video
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      openVideo(this);
    });
  });


  // Fungsi untuk menutup pop-up Instagram
  function closeInstagramConfirmation() {
    if (!instagramConfirmation || instagramConfirmation.hidden) return;

    instagramConfirmation.classList.remove('is-open');
    instagramConfirmation.hidden = true;
    instagramConfirmation.setAttribute('aria-hidden', 'true');
    if (lastInstagramTrigger) lastInstagramTrigger.focus();
  }

  // Mengatur tombol untuk membuka pop-up Instagram
  instagramTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      if (!instagramConfirmation) return;

      lastInstagramTrigger = this;
      instagramConfirmation.hidden = false;
      instagramConfirmation.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => instagramConfirmation.classList.add('is-open'));
      instagramConfirmation.querySelector('.instagram-confirmation__close').focus();
    });
  });


  instagramConfirmationCloseButtons.forEach(button => {
    button.addEventListener('click', closeInstagramConfirmation);
  });


  if (instagramConfirmation) {
    instagramConfirmation.addEventListener('click', function(event) {
      if (event.target === instagramConfirmation) closeInstagramConfirmation();
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && !instagramConfirmation.hidden) {
        closeInstagramConfirmation();
      }
    });
  }

 
  if (instagramConfirmationContinue) {
    instagramConfirmationContinue.addEventListener('click', closeInstagramConfirmation);
  }

  // Mengambil elemen informasi lokasi perusahaan
  const locationButtons = document.querySelectorAll('.location-item');
  const detailName = document.getElementById('detail-name');
  const detailCompany = document.getElementById('detail-company');
  const mapFrame = document.getElementById('map-frame');
  const mapLink = document.getElementById('map-link');

  // Mengatur perubahan informasi berdasarkan lokasi yang dipilih
  if (locationButtons.length && detailName && detailCompany && mapFrame && mapLink) {
    locationButtons.forEach(button => {
      button.addEventListener('click', function() {
        const { name, company, map, link } = this.dataset;

        detailName.textContent = name || 'Lokasi';
        detailCompany.textContent = company || 'PT Solusi Bangun Indonesia Tbk';
        mapFrame.src = map || '';
        mapFrame.title = name || 'Lokasi perusahaan';
        mapLink.href = link || '#';

        locationButtons.forEach(item => item.classList.toggle('active', item === this));
      });
    });
  }

  const contactMessageForm = document.getElementById('contact-message-form');
  if (contactMessageForm) {
    const contactFormStatus = contactMessageForm.querySelector('.contact-form-status');
    const contactSubmitButton = contactMessageForm.querySelector('.contact-submit-button');
    const contactSubmitLabel = contactMessageForm.querySelector('.contact-submit-label');
    const contactSubmitLoading = contactMessageForm.querySelector('.contact-submit-loading');
    const contactSubmitArrow = contactMessageForm.querySelector('.contact-submit-arrow');
    const contactStatusIcon = contactFormStatus.querySelector('.contact-form-status-icon');
    const contactStatusTitle = contactFormStatus.querySelector('.contact-form-status-title');
    const contactStatusMessage = contactFormStatus.querySelector('.contact-form-status-message');
    const emailjsConfig = {
      publicKey: '_VMSv5MdCwslYutsN',
      serviceId: '12345678',
      templateId: 'template_pzf2dft',
      recipient: 'aisarahmah11@gmail.com'
    };
    let isSendingContactMessage = false;
    let emailjsInitializationError = false;

    if (window.emailjs && typeof window.emailjs.init === 'function') {
      try {
        window.emailjs.init({ publicKey: emailjsConfig.publicKey });
      } catch {
        emailjsInitializationError = true;
      }
    }

    function showContactFormStatus(type, title, message) {
      contactFormStatus.classList.remove('is-error', 'is-success');
      contactFormStatus.classList.add(`is-${type}`);
      contactStatusIcon.className = `contact-form-status-icon bi ${type === 'success' ? 'bi-check-lg' : 'bi-exclamation-lg'}`;
      contactStatusTitle.textContent = title;
      contactStatusMessage.textContent = message;
      contactFormStatus.hidden = false;
    }

    function setContactFormLoading(isLoading) {
      isSendingContactMessage = isLoading;
      contactSubmitButton.disabled = isLoading;
      contactMessageForm.setAttribute('aria-busy', String(isLoading));
      contactSubmitLabel.hidden = isLoading;
      contactSubmitLoading.hidden = !isLoading;
      contactSubmitArrow.hidden = isLoading;
    }

    contactMessageForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      if (isSendingContactMessage) return;

      contactFormStatus.hidden = true;
      contactFormStatus.classList.remove('is-error', 'is-success');

      const nameField = contactMessageForm.elements.namedItem('name');
      const emailField = contactMessageForm.elements.namedItem('email');
      const subjectField = contactMessageForm.elements.namedItem('subject');
      const messageField = contactMessageForm.elements.namedItem('message');
      const requiredFields = [
        ['Nama Lengkap', nameField],
        ['Email', emailField],
        ['Subjek', subjectField],
        ['Pesan', messageField]
      ];
      const emptyFields = requiredFields.filter(([, field]) => !field.value.trim());

      if (emptyFields.length) {
        showContactFormStatus('error', 'Periksa Formulir', `Mohon lengkapi kolom berikut: ${emptyFields.map(([label]) => label).join(', ')}.`);
        emptyFields[0][1].focus();
        return;
      }

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const subject = subjectField.value.trim();
      const message = messageField.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showContactFormStatus('error', 'Periksa Formulir', 'Masukkan alamat email dengan format yang valid.');
        emailField.focus();
        return;
      }

      if (emailjsInitializationError || !window.emailjs || typeof window.emailjs.send !== 'function') {
        showContactFormStatus(
          'error',
          'Pesan Gagal Dikirim!',
          'Maaf, pesan Anda belum berhasil dikirim. Silakan coba kembali beberapa saat lagi.'
        );
        return;
      }

      setContactFormLoading(true);
      try {
        const response = await window.emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            to_email: emailjsConfig.recipient,
            from_name: name,
            from_email: email,
            subject,
            message
          },
          { publicKey: emailjsConfig.publicKey }
        );

        if (response.status < 200 || response.status >= 300) {
          throw new Error(`EmailJS returned status ${response.status}`);
        }

        contactMessageForm.reset();
        showContactFormStatus(
          'success',
          'Pesan Berhasil Dikirim!',
          'Terima kasih telah menghubungi kami. Pesan Anda berhasil dikirim dan akan segera kami tindak lanjuti.'
        );
      } catch {
        showContactFormStatus(
          'error',
          'Pesan Gagal Dikirim!',
          'Maaf, pesan Anda belum berhasil dikirim. Silakan coba kembali beberapa saat lagi.'
        );
      } finally {
        setContactFormLoading(false);
      }
    });
  }

})();