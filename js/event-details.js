// Event details page functionality

document.addEventListener('DOMContentLoaded', () => {
  // Get event ID from URL
  const urlParams = getUrlParams();
  const eventId = urlParams.id;
  
  if (!eventId) {
    // Redirect to events page if no ID provided
    window.location.href = 'evenements.html';
    return;
  }
  
  // Get event data
  const event = getEventById(eventId);
  
  if (!event) {
    // Show error message if event not found
    const eventContent = document.getElementById('event-content');
    if (eventContent) {
      eventContent.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <h2>Événement non trouvé</h2>
          <p>L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
          <a href="evenements.html" class="btn btn-primary">Voir tous les événements</a>
        </div>
      `;
    }
    return;
  }
  
  // Set page title
  setPageTitle(event.title);
  
  // Render event details
  renderEventDetails(event);
  
  // Render similar events
  renderSimilarEvents(eventId);
  
  // Setup back button
  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      history.back();
    });
  }
});

// Render event details
function renderEventDetails(event) {
  const eventContent = document.getElementById('event-content');
  if (!eventContent) return;
  
  const eventType = CONFIG.EVENT_TYPES[event.type] || { label: event.type, icon: 'fas fa-calendar' };
  const eventFormat = CONFIG.EVENT_FORMATS[event.format] || { label: event.format, class: '', icon: 'fas fa-location-dot' };
  
  const eventHTML = `
    <div class="event-banner">
      <img src="${event.image || getRandomPlaceholderImage()}" alt="${event.title}">
      <div class="event-badge">
        <i class="${eventType.icon}"></i> ${eventType.label}
      </div>
      <div class="event-format-badge ${eventFormat.class}">
        <i class="${eventFormat.icon}"></i> ${eventFormat.label}
      </div>
    </div>
    
    <div class="event-title-section">
      <h1 class="event-title">${event.title}</h1>
      <div class="event-rating-container">
        <div class="event-rating">
          ${generateRatingStars(event.rating.score)}
        </div>
        <span>${event.rating.score.toFixed(1)} (${event.rating.count} avis)</span>
      </div>
    </div>
    
    <div class="event-info-grid">
      <div class="event-details-section">
        <h3>Description</h3>
        <div class="event-description">
          <p>${event.description}</p>
        </div>
        
        <div class="organizer-section">
          <div class="organizer-image">
            <img src="${event.organizer.logo}" alt="${event.organizer.name}">
          </div>
          <div class="organizer-info">
            <div class="organizer-name">${event.organizer.name}</div>
            <div class="organizer-description">Organisateur</div>
          </div>
        </div>
        
        <div class="reviews-section">
          <div class="reviews-header">
            <h3>Commentaires et avis</h3>
            <span class="reviews-count">${event.rating.count} avis</span>
          </div>
          
          <div class="add-review-form">
            <h4>Votre note</h4>
            <div class="rating-select" id="rating-select">
              <i class="far fa-star" data-rating="1"></i>
              <i class="far fa-star" data-rating="2"></i>
              <i class="far fa-star" data-rating="3"></i>
              <i class="far fa-star" data-rating="4"></i>
              <i class="far fa-star" data-rating="5"></i>
            </div>
            
            <div class="form-group">
              <label for="review-comment">Votre commentaire</label>
              <textarea id="review-comment" class="form-control" placeholder="Partagez votre expérience..."></textarea>
            </div>
            
            <button id="submit-review" class="btn btn-primary">Se connecter pour commenter</button>
          </div>
        </div>
      </div>
      
      <div class="event-sidebar">
        <div class="event-sidebar-card">
          <div class="event-price-card">
            <div class="event-price ${event.price === 0 ? 'price-free' : ''}">
              ${formatPrice(event.price)}
            </div>
            <button class="btn btn-primary btn-reserve" id="btn-reserve">
              ${event.price === 0 ? "S'inscrire gratuitement" : "Réserver maintenant"}
            </button>
            <p>${event.participants} participants</p>
          </div>
        </div>
        
        <div class="event-sidebar-card">
          <h3>Informations</h3>
          <div class="event-metadata">
            <div class="event-metadata-item">
              <i class="far fa-calendar"></i>
              <div class="event-metadata-content">
                <span class="event-metadata-label">Date et heure</span>
                <span class="event-metadata-value">${formatDate(event.date)}</span>
              </div>
            </div>
            
            <div class="event-metadata-item">
              <i class="fas fa-map-marker-alt"></i>
              <div class="event-metadata-content">
                <span class="event-metadata-label">Lieu</span>
                <span class="event-metadata-value">
                  ${event.location.address}<br>
                  ${event.location.city}, ${event.location.country}
                </span>
              </div>
            </div>
            
            <div class="event-metadata-item">
              <i class="fas fa-user-tie"></i>
              <div class="event-metadata-content">
                <span class="event-metadata-label">Organisateur</span>
                <span class="event-metadata-value">${event.organizer.name}</span>
              </div>
            </div>
            
            <div class="event-metadata-item">
              <i class="${eventType.icon}"></i>
              <div class="event-metadata-content">
                <span class="event-metadata-label">Type d'événement</span>
                <span class="event-metadata-value">${eventType.label}</span>
              </div>
            </div>
            
            <div class="event-metadata-item">
              <i class="${eventFormat.icon}"></i>
              <div class="event-metadata-content">
                <span class="event-metadata-label">Format</span>
                <span class="event-metadata-value">${eventFormat.label}</span>
              </div>
            </div>
          </div>
          
          <div class="event-share">
            <p>Partager cet événement</p>
            <div class="social-share">
              <a href="#" title="Partager sur Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" title="Partager sur Twitter"><i class="fab fa-twitter"></i></a>
              <a href="#" title="Partager sur LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" title="Partager par e-mail"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  eventContent.innerHTML = eventHTML;
  
  // Setup rating selection
  setupRatingSelection();
  
  // Setup reserve button
  const reserveButton = document.getElementById('btn-reserve');
  if (reserveButton) {
    reserveButton.addEventListener('click', () => {
      showPaymentModal(event);
    });
  }
}

// Setup rating selection functionality
function setupRatingSelection() {
  const ratingStars = document.querySelectorAll('#rating-select i');
  let currentRating = 0;
  
  ratingStars.forEach(star => {
    // Hover effect
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating);
    });
    
    // Mouseout effect
    star.addEventListener('mouseout', () => {
      highlightStars(currentRating);
    });
    
    // Click to select
    star.addEventListener('click', () => {
      currentRating = parseInt(star.dataset.rating);
      highlightStars(currentRating);
    });
  });
  
  // Highlight stars up to the specified rating
  function highlightStars(rating) {
    ratingStars.forEach(star => {
      const starRating = parseInt(star.dataset.rating);
      
      if (starRating <= rating) {
        star.className = 'fas fa-star active';
      } else {
        star.className = 'far fa-star';
      }
    });
  }
}

// Render similar events
function renderSimilarEvents(eventId) {
  const similarEventsContainer = document.getElementById('similar-events-container');
  if (!similarEventsContainer) return;
  
  const similarEvents = getSimilarEvents(eventId, 3);
  
  if (similarEvents.length === 0) {
    similarEventsContainer.innerHTML = `
      <p>Aucun événement similaire trouvé.</p>
    `;
    return;
  }
  
  let eventsHTML = '';
  similarEvents.forEach(event => {
    eventsHTML += createEventCard(event);
  });
  
  similarEventsContainer.innerHTML = eventsHTML;
  
  // Add event listeners to cards
  setupEventCardListeners();
}

// Show payment modal
function showPaymentModal(event) {
  const modalTitle = `Réserver - ${event.title}`;
  
  const modalContent = `
    <div class="payment-form">
      <div class="payment-summary">
        <div class="payment-item">
          <span>Prix de l'événement</span>
          <span>${formatPrice(event.price)}</span>
        </div>
        ${event.price > 0 ? `
          <div class="payment-item">
            <span>Frais de service</span>
            <span>${formatPrice(Math.round(event.price * 0.05))}</span>
          </div>
        ` : ''}
        <div class="payment-total">
          <span>Total</span>
          <span>${event.price > 0 ? formatPrice(Math.round(event.price * 1.05)) : 'Gratuit'}</span>
        </div>
      </div>
      
      ${event.price > 0 ? `
        <div class="payment-methods">
          <h3>Mode de paiement</h3>
          <div class="payment-methods-options">
            <div class="payment-method active" data-method="card">
              <i class="far fa-credit-card"></i>
              <p>Carte bancaire</p>
            </div>
            <div class="payment-method" data-method="paypal">
              <i class="fab fa-paypal"></i>
              <p>PayPal</p>
            </div>
          </div>
        </div>
        
        <div class="card-details">
          <div class="form-group">
            <label for="card-name">Nom sur la carte</label>
            <input type="text" id="card-name" class="form-control" placeholder="John Doe">
          </div>
          
          <div class="form-group">
            <label for="card-number">Numéro de carte</label>
            <input type="text" id="card-number" class="form-control" placeholder="1234 5678 9012 3456">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="expiry-date">Date d'expiration</label>
              <input type="text" id="expiry-date" class="form-control" placeholder="MM/AA">
            </div>
            
            <div class="form-group">
              <label for="cvv">Code de sécurité</label>
              <input type="text" id="cvv" class="form-control" placeholder="123">
            </div>
          </div>
        </div>
      ` : `
        <div class="form-group">
          <label for="attendee-name">Votre nom</label>
          <input type="text" id="attendee-name" class="form-control" placeholder="John Doe">
        </div>
        
        <div class="form-group">
          <label for="attendee-email">Votre email</label>
          <input type="email" id="attendee-email" class="form-control" placeholder="john.doe@example.com">
        </div>
      `}
    </div>
  `;
  
  const modalButtons = [
    {
      text: 'Annuler',
      class: 'btn-outline',
      onClick: hideModal
    },
    {
      text: event.price > 0 ? 'Payer et réserver' : 'Confirmer l\'inscription',
      class: 'btn-primary',
      id: 'confirm-payment',
      onClick: () => processPayment(event)
    }
  ];
  
  showModal(modalTitle, modalContent, modalButtons);
  
  // Setup payment method selection
  if (event.price > 0) {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
      method.addEventListener('click', () => {
        // Remove active class from all methods
        paymentMethods.forEach(m => m.classList.remove('active'));
        // Add active class to selected method
        method.classList.add('active');
      });
    });
  }
}

// Process payment
function processPayment(event) {
  // In a real app, this would call a payment API
  
  // Show loading state
  const confirmButton = document.getElementById('confirm-payment');
  if (confirmButton) {
    confirmButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    confirmButton.disabled = true;
  }
  
  // Simulate API call delay
  setTimeout(() => {
    hideModal();
    
    // Show success message
    const successMessage = event.price > 0
      ? `Votre réservation pour "${event.title}" a été confirmée. Vous allez recevoir un email de confirmation.`
      : `Votre inscription à "${event.title}" a été confirmée. Vous allez recevoir un email avec tous les détails.`;
    
    showAlert(successMessage, 'success', 5000);
  }, 2000);
}