/**
 * SARISIGNATURE SITE CONFIGURATION
 * Verified branch and contact information lives here. Service details and the
 * n8n webhook remain easy to update without changing the visual design.
 */
const SITE_CONFIG = {
  business: {
    name: 'Sarisignature',
    phones: ['08027970777', '07018799879'],
    whatsappDisplay: '+234 806 666 0002',
    whatsappDigits: '2348066660002',
    branches: [
      {
        id: 'lagos',
        city: 'Lagos',
        area: 'Victoria Island',
        address: '269A Patience Coker Street, Victoria Island, Lagos 106104, Lagos, Nigeria'
      },
      {
        id: 'abuja',
        city: 'Abuja',
        area: 'Wuse 2',
        address: 'The Ruby Centre, No. 762 Aminu Kanu Crescent, Wuse 2, Abuja, Nigeria'
      }
    ]
  },
  integrations: {
    n8nBookingWebhook: '',     // Add the production booking webhook when ready.
    n8nAvailabilityWebhook: '' // Optional endpoint that must return confirmed slots.
  },
  bookingRules: {
    timezone: 'Africa/Lagos',
    slotIntervalMinutes: 30,
    closingMinutes: 19 * 60,
    openingMinutesByDay: {
      0: 12 * 60, // Sunday: 12:00 PM
      1: 10 * 60, // Monday: 10:00 AM
      2: 10 * 60,
      3: 10 * 60,
      4: 10 * 60,
      5: 10 * 60,
      6: 10 * 60  // Saturday: 10:00 AM
    }
  },
  services: [
    { id: 'hair-styling', name: 'Hair Styling', description: 'Final service options and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'hair-colour', name: 'Hair Colour', description: 'Final colour menu and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'hair-treatment', name: 'Hair Treatment', description: 'Final treatment menu and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'wig-services', name: 'Wig Services', description: 'Final wig service menu and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'natural-hair', name: 'Natural Hair', description: 'Final natural hair menu and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'braiding', name: 'Braiding', description: 'Final braiding menu and pricing to be supplied.', price: '', durationMinutes: null },
    { id: 'other-services', name: 'Other Salon Services', description: 'Enquire for services not shown above.', price: '', durationMinutes: null }
  ]
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

// Header and mobile navigation
const header = $('.site-header');
const menuToggle = $('#menuToggle');
const mobileMenu = $('#mobileMenu');

const setMenu = (open) => {
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
};

menuToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
$$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => setMenu(false)));

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 80);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Hero slideshow: four authentic Sarisignature images with a five-second fade.
const heroCarousel = $('#heroCarousel');
if (heroCarousel) {
  const heroSlides = $$('.hero-slide', heroCarousel);
  const heroDots = $$('[data-hero-slide]', heroCarousel);
  const heroSlideCurrent = $('#heroSlideCurrent');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeHeroSlide = 0;
  let heroSlideTimer;

  const showHeroSlide = (index) => {
    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeHeroSlide;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeHeroSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
    heroSlideCurrent.textContent = String(activeHeroSlide + 1).padStart(2, '0');
  };

  const stopHeroSlideshow = () => clearInterval(heroSlideTimer);
  const startHeroSlideshow = () => {
    stopHeroSlideshow();
    if (!reducedMotion.matches && !document.hidden) {
      heroSlideTimer = setInterval(() => showHeroSlide(activeHeroSlide + 1), 5000);
    }
  };

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showHeroSlide(Number(dot.dataset.heroSlide));
      startHeroSlideshow();
    });
  });
  heroCarousel.addEventListener('mouseenter', stopHeroSlideshow);
  heroCarousel.addEventListener('mouseleave', startHeroSlideshow);
  heroCarousel.addEventListener('focusin', stopHeroSlideshow);
  heroCarousel.addEventListener('focusout', startHeroSlideshow);
  document.addEventListener('visibilitychange', startHeroSlideshow);
  reducedMotion.addEventListener('change', startHeroSlideshow);

  showHeroSlide(0);
  startHeroSlideshow();
}

// Subtle reveal animations
const revealItems = $$('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Active navigation item
const navSections = $$('main section[id]');
const navAnchors = $$('.nav-links a, .mobile-menu a:not(.button)[href^="#"]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
  navSections.forEach((section) => sectionObserver.observe(section));
}

// Render the editable service configuration into the existing designs.
const servicesList = $('#servicesList');
const bookingServices = $('#bookingServices');

SITE_CONFIG.services.forEach((service, index) => {
  const row = document.createElement('article');
  row.className = 'service-row';
  row.innerHTML = `
    <span class="service-index">${String(index + 1).padStart(2, '0')}</span>
    <h3>${service.name}</h3>
    <p>${service.description}</p>
    <button type="button" data-book-service="${service.id}">Book this service</button>`;
  servicesList.appendChild(row);

  const option = document.createElement('label');
  option.className = 'service-option';
  option.innerHTML = `
    <input type="radio" name="service" value="${service.id}" required />
    <span><i></i><b>${service.name}<small>${service.price || 'Price on enquiry'}${service.durationMinutes ? ` · ${service.durationMinutes} min` : ' · Duration pending'}</small></b></span>`;
  bookingServices.appendChild(option);
});

// Five-step, branch-aware booking flow
const bookingForm = $('#bookingForm');
const bookingPanel = $('.booking-panel');
const bookingConfirmation = $('#bookingConfirmation');
const progressButtons = $$('.booking-progress button');
const bookingDate = $('#bookingDate');
let currentStep = 1;
let maxReachedStep = 1;

const localDateValue = (date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
};
const now = new Date();
const sixMonths = new Date(now);
sixMonths.setMonth(sixMonths.getMonth() + 6);
bookingDate.min = localDateValue(now);
bookingDate.max = localDateValue(sixMonths);

const setStep = (step) => {
  currentStep = step;
  maxReachedStep = Math.max(maxReachedStep, step);
  $$('.booking-step').forEach((panel) => panel.classList.toggle('active', Number(panel.dataset.step) === step));
  progressButtons.forEach((button, index) => {
    const buttonStep = index + 1;
    button.disabled = buttonStep > maxReachedStep;
    button.classList.toggle('active', buttonStep === step);
    button.classList.toggle('complete', buttonStep < maxReachedStep);
  });
  bookingPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const selectedValue = (name) => {
  const selected = $(`input[name="${name}"]:checked`, bookingForm);
  return selected ? selected.value : '';
};

const showStepError = (step, message) => {
  const error = $(`#step${step}Error`);
  if (error) error.textContent = message;
};

const validateStep = (step) => {
  if (step === 1 && !selectedValue('location')) {
    showToast('Choose your location', 'Select Lagos or Abuja to continue.');
    return false;
  }
  if (step === 2 && !selectedValue('service')) {
    showToast('Choose a service', 'Select one service category to continue.');
    return false;
  }
  if (step === 3) {
    showStepError(3, '');
    if (!bookingDate.value) {
      showStepError(3, 'Please choose a preferred date.');
      return false;
    }
    if (!timeOptions.children.length) {
      showStepError(3, 'No selectable time can be offered until a verified service duration or confirmed backend availability is available.');
      return false;
    }
    if (!selectedValue('time')) {
      showStepError(3, 'Please choose a preferred time within the displayed opening-hours window.');
      return false;
    }
  }
  if (step === 4) {
    showStepError(4, '');
    const required = ['name', 'phone', 'email'];
    const invalid = required.some((name) => {
      const field = bookingForm.elements[name];
      return !field.value.trim() || !field.checkValidity();
    });
    if (invalid) {
      showStepError(4, 'Please enter a valid name, phone number and email address.');
      return false;
    }
  }
  return true;
};

const serviceById = (id) => SITE_CONFIG.services.find((service) => service.id === id);
const branchById = (id) => SITE_CONFIG.business.branches.find((branch) => branch.id === id);
const timeOptions = $('#timeOptions');
const timeStatus = $('#timeStatus');

const formatMinutes = (minutes) => {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
};

const timeLabelToMinutes = (value) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]) % 12;
  const minute = Number(match[2]);
  if (match[3].toUpperCase() === 'PM') hour += 12;
  return hour * 60 + minute;
};

const openingWindowForDate = (dateValue) => {
  if (!dateValue) return null;
  const date = new Date(`${dateValue}T12:00:00`);
  const dayIndex = date.getDay();
  const openingMinutes = SITE_CONFIG.bookingRules.openingMinutesByDay[dayIndex];
  const closingMinutes = SITE_CONFIG.bookingRules.closingMinutes;
  return {
    dayIndex,
    dayName: new Intl.DateTimeFormat('en-NG', { weekday: 'long' }).format(date),
    openingMinutes,
    closingMinutes,
    openingLabel: formatMinutes(openingMinutes),
    closingLabel: formatMinutes(closingMinutes)
  };
};

const setTimeStatus = (message, blocked = false) => {
  timeStatus.textContent = message;
  timeStatus.classList.toggle('is-blocked', blocked);
};

const addTimeOption = (label, source) => {
  const option = document.createElement('label');
  option.className = 'time-option';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'time';
  input.value = label;
  input.required = true;
  input.dataset.availabilitySource = source;
  const text = document.createElement('span');
  text.textContent = label;
  option.append(input, text);
  timeOptions.appendChild(option);
};

const renderHoursBasedRequestTimes = (window, durationMinutes) => {
  const lastStart = window.closingMinutes - durationMinutes;
  for (let minutes = window.openingMinutes; minutes <= lastStart; minutes += SITE_CONFIG.bookingRules.slotIntervalMinutes) {
    addTimeOption(formatMinutes(minutes), 'opening_hours_rule');
  }
};

const loadTimeOptions = async () => {
  timeOptions.replaceChildren();
  showStepError(3, '');

  const dateValue = bookingDate.value;
  const service = serviceById(selectedValue('service'));
  const branch = branchById(selectedValue('location'));
  if (!dateValue) {
    setTimeStatus('Choose a date to view the booking-hours rule for that day.');
    return;
  }

  const window = openingWindowForDate(dateValue);
  if (!service) {
    setTimeStatus(`${window.dayName} hours are ${window.openingLabel} – ${window.closingLabel}. Select a service before choosing a time.`, true);
    return;
  }

  // A configured availability endpoint must return { slots: [...] }. Only
  // entries explicitly marked available:true are treated as confirmed.
  if (SITE_CONFIG.integrations.n8nAvailabilityWebhook) {
    setTimeStatus('Checking confirmed appointment times…');
    try {
      const response = await fetch(SITE_CONFIG.integrations.n8nAvailabilityWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId: branch?.id || '',
          serviceId: service.id,
          serviceDurationMinutes: service.durationMinutes,
          date: dateValue,
          timezone: SITE_CONFIG.bookingRules.timezone,
          openingMinutes: window.openingMinutes,
          closingMinutes: window.closingMinutes
        })
      });
      if (!response.ok) throw new Error(`Availability endpoint returned ${response.status}`);
      const data = await response.json();
      const slots = Array.isArray(data.slots) ? data.slots : [];
      slots.forEach((slot) => {
        if (slot.available !== true) return;
        const startMinutes = timeLabelToMinutes(slot.startMinutes ?? slot.time);
        const durationMinutes = Number(service.durationMinutes ?? slot.durationMinutes);
        if (!Number.isFinite(startMinutes) || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return;
        if (startMinutes < window.openingMinutes || startMinutes + durationMinutes > window.closingMinutes) return;
        addTimeOption(formatMinutes(startMinutes), 'backend_confirmed');
      });
      if (timeOptions.children.length) {
        setTimeStatus(`Confirmed times for ${window.dayName}. Every option finishes by ${window.closingLabel}.`);
      } else {
        setTimeStatus(`No confirmed appointment times were returned for ${window.dayName}.`, true);
      }
    } catch (error) {
      console.error(error);
      setTimeStatus('Confirmed availability could not be loaded. No time has been offered.', true);
    }
    return;
  }

  if (!Number.isFinite(service.durationMinutes) || service.durationMinutes <= 0) {
    setTimeStatus(`${window.dayName} hours are ${window.openingLabel} – ${window.closingLabel}. Selectable times are paused until the verified duration for ${service.name} is added.`, true);
    return;
  }

  renderHoursBasedRequestTimes(window, service.durationMinutes);
  if (timeOptions.children.length) {
    setTimeStatus(`Preferred request times within ${window.dayName} opening hours. These are not confirmed real-time availability.`);
  } else {
    setTimeStatus(`${service.name} cannot fit within the configured ${window.dayName} opening window.`, true);
  }
};

bookingDate.addEventListener('change', loadTimeOptions);
$$('input[name="service"], input[name="location"]', bookingForm).forEach((input) => {
  input.addEventListener('change', loadTimeOptions);
});

const bookingPayload = () => {
  const formData = new FormData(bookingForm);
  const service = serviceById(formData.get('service'));
  const branch = branchById(formData.get('location'));
  const selectedTimeInput = $('input[name="time"]:checked', bookingForm);
  const openingWindow = openingWindowForDate(formData.get('date'));
  return {
    source: 'sarisignature-website',
    type: 'appointment_request',
    branch: {
      id: branch?.id || '',
      city: branch?.city || '',
      area: branch?.area || '',
      address: branch?.address || ''
    },
    serviceId: service?.id || '',
    serviceName: service?.name || '',
    serviceDurationMinutes: service?.durationMinutes || null,
    preferredDate: formData.get('date') || '',
    preferredTime: formData.get('time') || '',
    availabilitySource: selectedTimeInput?.dataset.availabilitySource || '',
    openingHoursRule: openingWindow ? {
      day: openingWindow.dayName,
      openingMinutes: openingWindow.openingMinutes,
      closingMinutes: openingWindow.closingMinutes,
      timezone: SITE_CONFIG.bookingRules.timezone
    } : null,
    customer: {
      name: (formData.get('name') || '').trim(),
      phone: (formData.get('phone') || '').trim(),
      email: (formData.get('email') || '').trim()
    },
    notes: (formData.get('notes') || '').trim(),
    consentToContact: formData.get('consent') === 'on',
    submittedAt: new Date().toISOString()
  };
};

const readableDate = (value) => {
  if (!value) return '—';
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('en-NG', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  }).format(date);
};

const addSummaryRow = (container, label, value) => {
  const row = document.createElement('div');
  row.className = 'summary-row';
  const key = document.createElement('span');
  const content = document.createElement('strong');
  key.textContent = label;
  content.textContent = value;
  row.append(key, content);
  container.appendChild(row);
};

const populateSummary = () => {
  const data = bookingPayload();
  const summary = $('#bookingSummary');
  summary.replaceChildren();
  addSummaryRow(summary, 'Location', `${data.branch.city} · ${data.branch.area}`);
  addSummaryRow(summary, 'Address', data.branch.address);
  addSummaryRow(summary, 'Service', data.serviceName);
  addSummaryRow(summary, 'Date', readableDate(data.preferredDate));
  addSummaryRow(summary, 'Time', data.preferredTime);
  addSummaryRow(summary, 'Name', data.customer.name);
  addSummaryRow(summary, 'Phone', data.customer.phone);
  addSummaryRow(summary, 'Email', data.customer.email);
  if (data.notes) addSummaryRow(summary, 'Notes', data.notes);
};

$$('.booking-next').forEach((button) => {
  button.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    const nextStep = Number(button.dataset.next);
    if (nextStep === 5) populateSummary();
    setStep(nextStep);
  });
});
$$('.booking-back').forEach((button) => button.addEventListener('click', () => setStep(Number(button.dataset.back))));
progressButtons.forEach((button) => button.addEventListener('click', () => {
  if (!button.disabled) setStep(Number(button.dataset.stepJump));
}));

$$('[data-book-service]').forEach((button) => {
  button.addEventListener('click', () => {
    const option = $(`input[name="service"][value="${button.dataset.bookService}"]`);
    if (option) option.checked = true;
    loadTimeOptions();
    setStep(1);
    $('#book').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

$$('[data-select-location]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const option = $(`input[name="location"][value="${link.dataset.selectLocation}"]`);
    if (option) option.checked = true;
    loadTimeOptions();
    setStep(1);
    $('#book').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const finishBooking = (data, wasSent) => {
  bookingForm.hidden = true;
  $('.booking-progress').hidden = true;
  bookingConfirmation.hidden = false;
  $('#confirmationName').textContent = data.customer.name.split(' ')[0] || 'there';
  $('#confirmationRef').textContent = `SARI-${Date.now().toString().slice(-6)}`;
  const statusCopy = $('p:not(.eyebrow)', bookingConfirmation);
  if (wasSent) {
    statusCopy.innerHTML = `Your appointment request for <strong>${data.branch.city}</strong> has been submitted. Sarisignature will use your supplied contact details to follow up.`;
  } else {
    statusCopy.innerHTML = `Your ${data.branch.city} appointment request has been prepared in this concept demo. It has <strong>not been sent</strong> because the n8n booking connection is awaiting setup.`;
  }
};

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showStepError(5, '');
  if (!bookingForm.elements.consent.checked) {
    showStepError(5, 'Please confirm that Sarisignature may contact you about this request.');
    return;
  }

  const data = bookingPayload();
  const submitButton = $('button[type="submit"]', bookingForm);
  const originalText = submitButton.innerHTML;

  if (!SITE_CONFIG.integrations.n8nBookingWebhook) {
    finishBooking(data, false);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  try {
    const response = await fetch(SITE_CONFIG.integrations.n8nBookingWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`Booking endpoint returned ${response.status}`);
    finishBooking(data, true);
  } catch (error) {
    console.error(error);
    showStepError(5, 'We could not send your request. Please try again or contact Sarisignature directly.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

$('#newBooking').addEventListener('click', () => {
  bookingForm.reset();
  bookingForm.hidden = false;
  $('.booking-progress').hidden = false;
  bookingConfirmation.hidden = true;
  currentStep = 1;
  maxReachedStep = 1;
  loadTimeOptions();
  setStep(1);
});

// Gallery lightbox
const lightbox = $('#lightbox');
const lightboxImage = $('img', lightbox);
const lightboxCaption = $('p', lightbox);
let lastFocusedGalleryItem = null;

const closeLightbox = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (lastFocusedGalleryItem) lastFocusedGalleryItem.focus();
};

$$('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lastFocusedGalleryItem = item;
    lightboxImage.src = item.dataset.src;
    lightboxImage.alt = $('img', item).alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    $('.lightbox-close').focus();
  });
});
$('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    if (mobileMenu.classList.contains('open')) setMenu(false);
  }
});

// WhatsApp, product enquiry and compact status messaging
const toast = $('#toast');
let toastTimer;
function showToast(title, message) {
  $('strong', toast).textContent = title;
  $('span', toast).textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
}

const openWhatsApp = (message) => {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${SITE_CONFIG.business.whatsappDigits}?text=${encoded}`, '_blank', 'noopener,noreferrer');
};

$$('.js-whatsapp').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedBranch = branchById(selectedValue('location'));
    const locationText = selectedBranch ? ` at the ${selectedBranch.city} branch` : '';
    openWhatsApp(`Hello Sarisignature, I would like to enquire about your services${locationText}.`);
  });
});

$$('.js-enquire').forEach((button) => {
  button.addEventListener('click', () => {
    openWhatsApp(`Hello Sarisignature, I would like to enquire about ${button.dataset.product}.`);
  });
});

// Balanced floating actions: WhatsApp on the left and scroll-to-top on the right.
const scrollTopButton = $('#scrollTopButton');
const updateScrollTopVisibility = () => {
  scrollTopButton.classList.toggle('visible', window.scrollY >= 600);
};

const animateScrollToTop = () => {
  const startY = window.scrollY;
  if (!startY) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, 0);
    return;
  }

  const duration = 800;
  const startTime = performance.now();
  const easeInOut = (progress) => progress < .5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, Math.round(startY * (1 - easeInOut(progress))));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
scrollTopButton.addEventListener('click', animateScrollToTop);
updateScrollTopVisibility();

$('#year').textContent = new Date().getFullYear();
