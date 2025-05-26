// UI utilities
function showModal(title, content, buttons = []) {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal';
  
  modalContainer.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
      <div class="modal-footer">
        ${buttons.map(btn => `
          <button class="btn ${btn.class}" ${btn.id ? `id="${btn.id}"` : ''}>
            ${btn.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  // Setup close button
  const closeBtn = modalContainer.querySelector('.modal-close');
  closeBtn?.addEventListener('click', () => hideModal());

  // Setup action buttons
  buttons.forEach((btn, index) => {
    const buttonElement = modalContainer.querySelectorAll('.modal-footer .btn')[index];
    buttonElement?.addEventListener('click', btn.onClick);
  });
}

function hideModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}

function showAlert(message, type = 'success', duration = 3000) {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, duration);
}

function setupFilters() {
  const filterToggles = document.querySelectorAll('.filter-toggle');
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const filterId = toggle.getAttribute('data-filter');
      const filterContent = document.getElementById(filterId);
      if (filterContent) {
        filterContent.classList.toggle('show');
      }
    });
  });

  // Setup filter inputs
  const filterInputs = document.querySelectorAll('.filter input');
  filterInputs.forEach(input => {
    input.addEventListener('change', () => {
      const filters = getActiveFilters();
      filterEvents(filters);
    });
  });
}

function getActiveFilters() {
  const filters = {
    types: [],
    format: null,
    country: null,
    city: null
  };

  document.querySelectorAll('[name="type"]:checked').forEach(input => {
    filters.types.push(input.value);
  });

  const formatInput = document.querySelector('[name="format"]:checked');
  if (formatInput) {
    filters.format = formatInput.value;
  }

  const countryInput = document.querySelector('[name="country"]:checked');
  if (countryInput) {
    filters.country = countryInput.value;
  }

  const cityInput = document.querySelector('[name="city"]:checked');
  if (cityInput) {
    filters.city = cityInput.value;
  }

  return filters;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}