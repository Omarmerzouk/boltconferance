// Payment processing functionality

// Available payment methods
const PAYMENT_METHODS = {
  card: {
    name: 'Carte bancaire',
    icon: 'far fa-credit-card',
    fields: [
      {
        name: 'cardName',
        label: 'Nom sur la carte',
        type: 'text',
        placeholder: 'John Doe',
        required: true
      },
      {
        name: 'cardNumber',
        label: 'Numéro de carte',
        type: 'text',
        placeholder: '1234 5678 9012 3456',
        required: true,
        pattern: '^[0-9]{16}$',
        formatInput: true
      },
      {
        name: 'expiryDate',
        label: 'Date d\'expiration',
        type: 'text',
        placeholder: 'MM/AA',
        required: true,
        pattern: '^(0[1-9]|1[0-2])\/([0-9]{2})$'
      },
      {
        name: 'cvv',
        label: 'Code de sécurité',
        type: 'text',
        placeholder: '123',
        required: true,
        pattern: '^[0-9]{3,4}$'
      }
    ]
  },
  paypal: {
    name: 'PayPal',
    icon: 'fab fa-paypal',
    redirectUrl: 'https://www.paypal.com'
  }
};

// Process payment with selected method
function processPaymentWithMethod(paymentData, method) {
  return new Promise((resolve, reject) => {
    // This would be an API call in a real application
    console.log(`Processing payment with ${method}:`, paymentData);
    
    // Simulate API response
    setTimeout(() => {
      // 90% success rate for demo
      if (Math.random() < 0.9) {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          message: 'Paiement traité avec succès'
        });
      } else {
        reject({
          success: false,
          error: 'payment_failed',
          message: 'Le paiement a échoué. Veuillez réessayer.'
        });
      }
    }, 2000);
  });
}

// Validate payment form
function validatePaymentForm(formData, method) {
  const methodConfig = PAYMENT_METHODS[method];
  
  if (!methodConfig) {
    return {
      isValid: false,
      errors: {
        general: 'Méthode de paiement non prise en charge'
      }
    };
  }
  
  if (method === 'paypal') {
    // PayPal handles its own validation
    return {
      isValid: true,
      errors: {}
    };
  }
  
  // For card payments, validate all fields
  const errors = {};
  let isValid = true;
  
  methodConfig.fields.forEach(field => {
    const value = formData[field.name];
    
    // Check required fields
    if (field.required && (!value || value.trim() === '')) {
      errors[field.name] = `${field.label} est requis`;
      isValid = false;
      return;
    }
    
    // Check pattern if specified
    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value.replace(/\s/g, ''))) {
        errors[field.name] = `${field.label} n'est pas valide`;
        isValid = false;
      }
    }
    
    // Specific validations
    if (field.name === 'expiryDate' && value) {
      const [month, year] = value.split('/');
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      
      const expiryMonth = parseInt(month, 10);
      const expiryYear = parseInt(year, 10);
      
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        errors[field.name] = 'La carte a expiré';
        isValid = false;
      }
    }
  });
  
  return {
    isValid,
    errors
  };
}

// Format card number with spaces
function formatCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
}

// Format expiry date with slash
function formatExpiryDate(expiryDate) {
  const cleaned = expiryDate.replace(/\D/g, '');
  
  if (cleaned.length <= 2) {
    return cleaned;
  }
  
  return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
}

// Get card type based on number
function getCardType(cardNumber) {
  const number = cardNumber.replace(/\s/g, '');
  
  // Visa
  if (/^4/.test(number)) {
    return 'visa';
  }
  
  // Mastercard
  if (/^5[1-5]/.test(number)) {
    return 'mastercard';
  }
  
  // Amex
  if (/^3[47]/.test(number)) {
    return 'amex';
  }
  
  // Discover
  if (/^6(?:011|5)/.test(number)) {
    return 'discover';
  }
  
  return 'unknown';
}

// Setup input formatting for payment fields
function setupPaymentFieldFormatting() {
  // Card number formatting
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      const value = e.target.value.replace(/\s/g, '');
      e.target.value = formatCardNumber(value);
    });
  }
  
  // Expiry date formatting
  const expiryDateInput = document.getElementById('expiry-date');
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', (e) => {
      const value = e.target.value;
      e.target.value = formatExpiryDate(value);
    });
  }
  
  // CVV number only
  const cvvInput = document.getElementById('cvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
}