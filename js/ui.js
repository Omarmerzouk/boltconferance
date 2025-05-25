// UI Components and functions

// Toggle mobile menu
function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.getElementById('main-header');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      header.classList.toggle('mobile-menu-open');
    });
  }
}

// Toggle filters panel
function setupFilters() {
  const toggleButton = document.getElementById('toggle-filters');
  const filtersPanel = document.getElementById('filters-panel');
  const applyButton = document.getElementById('apply-filters');
  const resetButton = document.getElementById('reset-filters');
  
  if (toggleButton && filtersPanel) {
    toggleButton.addEventListener('click', () => {
      filtersPanel.classList.toggle('active');
    });
    
    // Close filters when clicking outside
    document.addEventListener('click', (event) => {
      if (filtersPanel.classList.contains('active') && 
          !filtersPanel.contains(event.target) && 
          event.target !== toggleButton) {
        filtersPanel.classList.remove('active');
      }
    });
    
    // Prevent closing when clicking inside
    filtersPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    
    // Apply button
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        applyFilters();
        filtersPanel.classList.remove('active');
      });
    }
    
    // Reset button
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        resetFilters();
      });
    }
  }
}

// Gather filter values
function getFilterValues() {
  const types = Array.from(document.querySelectorAll('input[name="type"]:checked'))
    .map(input => input.value);
  
  const formats = Array.from(document.querySelectorAll('input[name="format"]:checked'))
    .map(input => input.value);
  
  const countries = Array.from(document.querySelectorAll('input[name="country"]:checked'))
    .map(input => input.value);
  
  const cities = Array.from(document.querySelectorAll('input[name="city"]:checked'))
    .map(input => input.value);
  
  return {
    types,
    formats,
    countries,
    cities
  };
}

// Apply filters
function applyFilters() {
  const filters = getFilterValues();
  const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
    filters.query = searchInput.value;
  }
  
  // Different behavior based on current page
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'index.html' || currentPage === '') {
    renderFeaturedEvents(filters);
  } else if (currentPage === 'evenements.html') {
    renderAllEvents(filters);
  }
}

// Reset filters
function resetFilters() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
  }
  
  applyFilters();
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
      applyFilters();
    });
    
    searchInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        applyFilters();
      }
    });
  }
}

// Create event card HTML
function createEventCard(event) {
  const eventType = CONFIG.EVENT_TYPES[event.type] || { label: event.type, icon: 'fas fa-calendar' };
  const eventFormat = CONFIG.EVENT_FORMATS[event.format] || { label: event.format, class: '', icon: 'fas fa-location-dot' };
  
  return `
    <div class="event-card" data-id="${event.id}">
      <div class="event-card-image">
        <img src="${event.image || getRandomPlaceholderImage()}" alt="${event.title}">
        <div class="event-type">
          <i class="${eventType.icon}"></i> ${eventType.label}
        </div>
        <div class="event-format ${eventFormat.class}">
          <i class="${eventFormat.icon}"></i> ${eventFormat.label}
        </div>
      </div>
      <div class="event-card-content">
        <h3 class="event-card-title">${event.title}</h3>
        <p class="event-card-description">${event.description}</p>
        <div class="event-card-details">
          <div class="event-detail">
            <i class="far fa-calendar"></i>
            <span>${formatShortDate(event.date)}</span>
          </div>
          <div class="event-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>${event.location.city}, ${event.location.country}</span>
          </div>
          <div class="event-detail">
            <i class="fas fa-users"></i>
            <span>${event.participants} participants</span>
          </div>
        </div>
      </div>
      <div class="event-card-footer">
        <div class="event-rating">
          <div class="rating-stars">
            ${generateRatingStars(event.rating.score)}
          </div>
          <span class="rating-count">(${event.rating.count} avis)</span>
        </div>
        <div class="event-price ${event.price === 0 ? 'price-free' : ''}">
          ${formatPrice(event.price)}
        </div>
      </div>
      <div class="event-organizer">
        Organisé par ${event.organizer.name}
      </div>
    </div>
  `;
}

// Render featured events
function renderFeaturedEvents(filters = {}) {
  const eventsContainer = document.getElementById('events-container');
  if (!eventsContainer) return;
  
  let events = getFeaturedEvents();
  
  // Apply filters if any
  if (Object.keys(filters).some(key => filters[key] && filters[key].length > 0)) {
    events = filterEvents(filters);
  }
  
  if (events.length === 0) {
    eventsContainer.innerHTML = `
      <div class="no-events">
        <i class="fas fa-search"></i>
        <h3>Aucun événement trouvé</h3>
        <p>Essayez de modifier vos filtres ou votre recherche.</p>
      </div>
    `;
    return;
  }
  
  let eventsHTML = '';
  events.forEach(event => {
    eventsHTML += createEventCard(event);
  });
  
  eventsContainer.innerHTML = eventsHTML;
  
  // Add event listeners to cards
  setupEventCardListeners();
}

// Render all events with pagination
function renderAllEvents(filters = {}, page = 1) {
  const eventsContainer = document.getElementById('all-events-container');
  if (!eventsContainer) return;
  
  let events = getAllEvents();
  
  // Apply filters if any
  if (Object.keys(filters).some(key => filters[key] && filters[key].length > 0)) {
    events = filterEvents(filters);
  }
  
  if (events.length === 0) {
    eventsContainer.innerHTML = `
      <div class="no-events">
        <i class="fas fa-search"></i>
        <h3>Aucun événement trouvé</h3>
        <p>Essayez de modifier vos filtres ou votre recherche.</p>
      </div>
    `;
    document.getElementById('pagination').innerHTML = '';
    return;
  }
  
  // Calculate pagination
  const totalEvents = events.length;
  const totalPages = Math.ceil(totalEvents / CONFIG.PAGINATION.ITEMS_PER_PAGE);
  const startIndex = (page - 1) * CONFIG.PAGINATION.ITEMS_PER_PAGE;
  const endIndex = startIndex + CONFIG.PAGINATION.ITEMS_PER_PAGE;
  const paginatedEvents = events.slice(startIndex, endIndex);
  
  let eventsHTML = '';
  paginatedEvents.forEach(event => {
    eventsHTML += createEventCard(event);
  });
  
  eventsContainer.innerHTML = eventsHTML;
  
  // Add event listeners to cards
  setupEventCardListeners();
  
  // Generate pagination
  generatePagination(page, totalPages, (newPage) => {
    renderAllEvents(filters, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Setup event listeners for event cards
function setupEventCardListeners() {
  const eventCards = document.querySelectorAll('.event-card');
  
  eventCards.forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.dataset.id;
      window.location.href = `event-details.html?id=${eventId}`;
    });
  });
}

// Populate country and city filters
function populateFilters() {
  const countryFilters = document.getElementById('country-filters');
  const cityFilters = document.getElementById('city-filters');
  
  if (countryFilters) {
    const countries = getUniqueCountries();
    let countryHTML = '';
    
    countries.forEach(country => {
      countryHTML += `
        <label>
          <input type="checkbox" name="country" value="${country}"> ${country}
        </label>
      `;
    });
    
    countryFilters.innerHTML = countryHTML;
  }
  
  if (cityFilters) {
    const cities = getUniqueCities();
    let cityHTML = '';
    
    cities.forEach(city => {
      cityHTML += `
        <label>
          <input type="checkbox" name="city" value="${city}"> ${city}
        </label>
      `;
    });
    
    cityFilters.innerHTML = cityHTML;
  }
}

// Show modal
function showModal(title, content, buttons = []) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  
  modalContainer.classList.remove('modal-hidden');
  
  let buttonsHTML = '';
  buttons.forEach(button => {
    buttonsHTML += `
      <button class="btn ${button.class || 'btn-outline'}" id="${button.id || ''}">
        ${button.text}
      </button>
    `;
  });
  
  modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" id="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        ${buttons.length > 0 ? `<div class="modal-footer">${buttonsHTML}</div>` : ''}
      </div>
    </div>
  `;
  
  // Close button
  const closeButton = document.getElementById('modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', hideModal);
  }
  
  // Close on click outside
  const modal = modalContainer.querySelector('.modal');
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        hideModal();
      }
    });
  }
  
  // Add button event listeners
  buttons.forEach(button => {
    if (button.id && button.onClick) {
      const buttonElement = document.getElementById(button.id);
      if (buttonElement) {
        buttonElement.addEventListener('click', button.onClick);
      }
    }
  });
  
  // Add keyboard events
  document.addEventListener('keydown', handleModalKeydown);
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

// Hide modal
function hideModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.classList.add('modal-hidden');
    modalContainer.innerHTML = '';
  }
  
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleModalKeydown);
  
  // Restore body scrolling
  document.body.style.overflow = '';
}

// Handle keyboard events for modal
function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    hideModal();
  }
}

// Initialize UI components
function initUI() {
  setupMobileMenu();
  setupFilters();
  setupSearch();
  
  // Page-specific initializations
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'index.html' || currentPage === '') {
    renderFeaturedEvents();
  } else if (currentPage === 'evenements.html') {
    populateFilters();
    renderAllEvents();
  }
}