// Events page specific functionality

document.addEventListener('DOMContentLoaded', () => {
  // Set page title
  setPageTitle('Événements');
  
  // Get URL parameters for pre-filtering
  const urlParams = getUrlParams();
  
  // Apply filters from URL if any
  if (Object.keys(urlParams).length > 0) {
    applyFiltersFromUrl(urlParams);
  }
  
  // Render all events
  renderAllEvents();
});

// Apply filters from URL parameters
function applyFiltersFromUrl(params) {
  // Search query
  if (params.query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = params.query;
    }
  }
  
  // Event type
  if (params.type) {
    const typeCheckbox = document.querySelector(`input[name="type"][value="${params.type}"]`);
    if (typeCheckbox) {
      typeCheckbox.checked = true;
    }
  }
  
  // Event format
  if (params.format) {
    const formatCheckbox = document.querySelector(`input[name="format"][value="${params.format}"]`);
    if (formatCheckbox) {
      formatCheckbox.checked = true;
    }
  }
  
  // Country
  if (params.country) {
    const countryCheckbox = document.querySelector(`input[name="country"][value="${params.country}"]`);
    if (countryCheckbox) {
      countryCheckbox.checked = true;
    }
  }
  
  // City
  if (params.city) {
    const cityCheckbox = document.querySelector(`input[name="city"][value="${params.city}"]`);
    if (cityCheckbox) {
      cityCheckbox.checked = true;
    }
  }
}