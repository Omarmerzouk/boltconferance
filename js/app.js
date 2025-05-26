document.addEventListener('DOMContentLoaded', () => {
  // Initialize auth UI
  updateAuthUI();

  // Setup auth buttons
  const loginBtn = document.querySelector('.btn-login');
  const registerBtn = document.querySelector('.btn-register');
  const logoutBtn = document.querySelector('.btn-logout');
  const createEventBtn = document.querySelector('.btn-create-event');

  loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginModal();
  });

  registerBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterModal();
  });

  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });

  createEventBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }
    showCreateEventModal();
  });

  // Setup search
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        filterEvents({ query });
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          filterEvents({ query });
        }
      }
    });
  }

  // Initialize filters
  setupFilters();
  
  // Load initial events
  loadEvents();
});

function filterEvents(filters = {}) {
  const eventsContainer = document.getElementById('events-container');
  if (!eventsContainer) return;

  let filteredEvents = EVENTS_DATA;

  if (filters.query) {
    const query = filters.query.toLowerCase();
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.city.toLowerCase().includes(query) ||
      event.location.country.toLowerCase().includes(query)
    );
  }

  if (filters.types?.length) {
    filteredEvents = filteredEvents.filter(event => filters.types.includes(event.type));
  }

  if (filters.format) {
    filteredEvents = filteredEvents.filter(event => event.format === filters.format);
  }

  if (filters.country) {
    filteredEvents = filteredEvents.filter(event => event.location.country === filters.country);
  }

  if (filters.city) {
    filteredEvents = filteredEvents.filter(event => event.location.city === filters.city);
  }

  renderEvents(filteredEvents);
}

function loadEvents() {
  renderEvents(EVENTS_DATA);
}

function renderEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  if (!eventsContainer) return;

  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>Aucun événement trouvé</p>';
    return;
  }

  eventsContainer.innerHTML = events.map(event => `
    <div class="event-card">
      <img src="${event.image}" alt="${event.title}">
      <div class="event-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-details">
          <span><i class="fas fa-calendar"></i> ${formatDate(event.date)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${event.location.city}, ${event.location.country}</span>
          <span><i class="fas fa-users"></i> ${event.participants} participants</span>
        </div>
        <div class="event-footer">
          <span class="price">${event.price ? event.price + '€' : 'Gratuit'}</span>
          <button class="btn btn-primary" onclick="showEventDetails(${event.id})">
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function showEventDetails(eventId) {
  const event = EVENTS_DATA.find(e => e.id === eventId);
  if (!event) return;

  window.location.href = `event-details.html?id=${eventId}`;
}