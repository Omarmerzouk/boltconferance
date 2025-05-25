// Utility functions for the application

// Format price according to currency settings
function formatPrice(price) {
  if (price === 0) {
    return 'Gratuit';
  }
  
  const formattedPrice = price.toString();
  
  if (CONFIG.CURRENCY.POSITION === 'before') {
    return `${CONFIG.CURRENCY.SYMBOL}${formattedPrice}`;
  } else {
    return `${formattedPrice}${CONFIG.CURRENCY.SYMBOL}`;
  }
}

// Format date to localized string
function formatDate(dateString) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

// Format short date (without time)
function formatShortDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

// Generate star rating HTML
function generateRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Get random placeholder image
function getRandomPlaceholderImage() {
  const randomIndex = Math.floor(Math.random() * CONFIG.PLACEHOLDER_IMAGES.length);
  return CONFIG.PLACEHOLDER_IMAGES[randomIndex];
}

// Debounce function for search inputs
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Parse URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const paramsObj = {};
  
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }
  
  return paramsObj;
}

// Set page title
function setPageTitle(title) {
  document.title = title ? `${title} - GlobalEvents` : 'GlobalEvents';
}

// Generate pagination HTML
function generatePagination(currentPage, totalPages, onPageChange) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;
  
  let paginationHTML = '';
  
  // Previous button
  paginationHTML += `
    <div class="pagination-item ${currentPage === 1 ? 'disabled' : ''}" 
         data-page="${currentPage - 1}" 
         ${currentPage === 1 ? 'disabled' : ''}>
      <i class="fas fa-chevron-left"></i>
    </div>
  `;
  
  // Calculate start and end page numbers
  let startPage = Math.max(1, currentPage - Math.floor(CONFIG.PAGINATION.MAX_PAGES_SHOWN / 2));
  let endPage = Math.min(totalPages, startPage + CONFIG.PAGINATION.MAX_PAGES_SHOWN - 1);
  
  // Adjust if at the end
  if (endPage - startPage + 1 < CONFIG.PAGINATION.MAX_PAGES_SHOWN) {
    startPage = Math.max(1, endPage - CONFIG.PAGINATION.MAX_PAGES_SHOWN + 1);
  }
  
  // First page (if not in range)
  if (startPage > 1) {
    paginationHTML += `
      <div class="pagination-item" data-page="1">1</div>
      ${startPage > 2 ? '<div class="pagination-item disabled">...</div>' : ''}
    `;
  }
  
  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <div class="pagination-item ${i === currentPage ? 'active' : ''}" data-page="${i}">
        ${i}
      </div>
    `;
  }
  
  // Last page (if not in range)
  if (endPage < totalPages) {
    paginationHTML += `
      ${endPage < totalPages - 1 ? '<div class="pagination-item disabled">...</div>' : ''}
      <div class="pagination-item" data-page="${totalPages}">${totalPages}</div>
    `;
  }
  
  // Next button
  paginationHTML += `
    <div class="pagination-item ${currentPage === totalPages ? 'disabled' : ''}" 
         data-page="${currentPage + 1}" 
         ${currentPage === totalPages ? 'disabled' : ''}>
      <i class="fas fa-chevron-right"></i>
    </div>
  `;
  
  paginationContainer.innerHTML = paginationHTML;
  
  // Add event listeners
  const pageItems = paginationContainer.querySelectorAll('.pagination-item:not(.disabled)');
  pageItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = parseInt(item.dataset.page);
      if (page !== currentPage) {
        onPageChange(page);
      }
    });
  });
}

// Show alert message
function showAlert(message, type = 'success', duration = 3000) {
  // Create alert element
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type}`;
  alertElement.innerHTML = `
    <div class="alert-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="alert-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add to DOM
  document.body.appendChild(alertElement);
  
  // Animate in
  setTimeout(() => {
    alertElement.classList.add('show');
  }, 10);
  
  // Add close button functionality
  const closeButton = alertElement.querySelector('.alert-close');
  closeButton.addEventListener('click', () => {
    alertElement.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(alertElement);
    }, 300);
  });
  
  // Auto close after duration
  if (duration) {
    setTimeout(() => {
      if (document.body.contains(alertElement)) {
        alertElement.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(alertElement)) {
            document.body.removeChild(alertElement);
          }
        }, 300);
      }
    }, duration);
  }
}

// Validate form fields
function validateForm(formData, fields) {
  const errors = {};
  
  fields.forEach(field => {
    const value = formData[field.name];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
      errors[field.name] = `${field.label} est requis`;
    }
    
    // Check email format
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.name] = 'Format d\'email invalide';
      }
    }
    
    // Check minimum length
    if (field.minLength && value && value.length < field.minLength) {
      errors[field.name] = `${field.label} doit contenir au moins ${field.minLength} caractères`;
    }
    
    // Check number field
    if (field.type === 'number' && value) {
      const numberValue = parseFloat(value);
      
      if (isNaN(numberValue)) {
        errors[field.name] = `${field.label} doit être un nombre`;
      }
      
      if (field.min !== undefined && numberValue < field.min) {
        errors[field.name] = `${field.label} doit être au moins ${field.min}`;
      }
      
      if (field.max !== undefined && numberValue > field.max) {
        errors[field.name] = `${field.label} doit être au plus ${field.max}`;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Scroll to element with smooth animation
function scrollToElement(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}