// =============================================
// The Bond Departamentos - JavaScript
// =============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initCalculator();
  initContactForm();
  initScrollAnimations();
  initSmoothScroll();
});

// ============= NAVBAR FUNCTIONALITY =============
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarMenu.classList.remove('active');
      });
    });
  }
}

// ============= CALCULATOR FUNCTIONALITY =============
function initCalculator() {
  const downPaymentSlider = document.getElementById('downPayment');
  const downPaymentValue = document.getElementById('downPaymentValue');
  const downPaymentAmount = document.getElementById('downPaymentAmount');
  const propertyPriceSelect = document.getElementById('propertyPrice');
  
  // Update down payment display
  if (downPaymentSlider && downPaymentValue && downPaymentAmount) {
    downPaymentSlider.addEventListener('input', function() {
      const percentage = this.value;
      const propertyPrice = parseFloat(propertyPriceSelect.value);
      const amount = propertyPrice * (percentage / 100);
      
      downPaymentValue.textContent = percentage + '%';
      downPaymentAmount.textContent = '$us ' + amount.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    });
    
    // Trigger initial update
    downPaymentSlider.dispatchEvent(new Event('input'));
    
    // Update when property price changes
    propertyPriceSelect.addEventListener('change', function() {
      downPaymentSlider.dispatchEvent(new Event('input'));
    });
  }
}

// Calculate monthly payment
function calculatePayment() {
  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
  const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
  const term = parseInt(document.getElementById('term').value);
  const annualRate = parseFloat(document.getElementById('interestRate').value);
  
  // Calculate values
  const downPayment = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = term * 12;
  
  // Monthly payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;
  const minIncome = monthlyPayment / 0.3; // Assuming 30% of income
  
  // Display results
  document.getElementById('monthlyPayment').textContent = '$us ' + monthlyPayment.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  document.getElementById('loanAmount').textContent = '$us ' + loanAmount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  document.getElementById('totalPayment').textContent = '$us ' + totalPayment.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  document.getElementById('totalInterest').textContent = '$us ' + totalInterest.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  document.getElementById('minIncome').textContent = '$us ' + minIncome.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  // Show result section
  document.getElementById('calculatorResult').style.display = 'block';
  
  // Scroll to result
  document.getElementById('calculatorResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============= CONTACT FORM FUNCTIONALITY =============
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: contactForm.name.value,
        phone: contactForm.phone.value,
        email: contactForm.email.value,
        segment: contactForm.segment.value,
        property: contactForm.property.value,
        message: contactForm.message.value
      };
      
      // Disable submit button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      try {
        // Send to API
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Success message
          alert('✅ ' + result.message);
          contactForm.reset();
          
          // Optional: Redirect to WhatsApp
          const whatsappMessage = `Hola! Me interesa ${formData.property}. Mi nombre es ${formData.name}.`;
          const whatsappUrl = `https://wa.me/59176154045?text=${encodeURIComponent(whatsappMessage)}`;
          
          if (confirm('¿Deseas continuar la conversación por WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
          }
        } else {
          alert('❌ ' + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al enviar el formulario. Por favor intenta nuevamente o contáctanos por WhatsApp.');
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}

// ============= SCROLL ANIMATIONS =============
function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all cards and sections
  const elements = document.querySelectorAll('.benefit-card, .property-card, .investment-card, .segment-card, .location-category');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============= SMOOTH SCROLL =============
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============= UTILITY FUNCTIONS =============

// Format currency
function formatCurrency(amount, decimals = 0) {
  return '$us ' + amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone (Bolivia format)
function validatePhone(phone) {
  const re = /^[67]\d{7}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// ============= ANALYTICS TRACKING =============
function trackEvent(category, action, label) {
  // Implement Google Analytics or other tracking
  console.log('Event tracked:', { category, action, label });
  
  // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track button clicks
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.btn-primary, .btn-secondary, .btn-whatsapp');
  if (btn) {
    const text = btn.textContent.trim();
    trackEvent('Button', 'Click', text);
  }
});

// Track calculator usage
if (document.getElementById('propertyPrice')) {
  document.getElementById('propertyPrice').addEventListener('change', function() {
    trackEvent('Calculator', 'Property Selected', this.options[this.selectedIndex].text);
  });
}

// ============= WHATSAPP INTEGRATION =============
function openWhatsApp(message = '') {
  const defaultMessage = message || 'Hola! Me interesa información sobre The Bond Departamentos.';
  const whatsappUrl = `https://wa.me/59176154045?text=${encodeURIComponent(defaultMessage)}`;
  window.open(whatsappUrl, '_blank');
}

// ============= SHARE FUNCTIONALITY =============
function shareProperty(platform) {
  const url = window.location.href;
  const text = 'The Bond Departamentos - Inversión inteligente en Santa Cruz';
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`
  };
  
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank');
    trackEvent('Share', platform, url);
  }
}

// ============= CONSOLE MESSAGE =============
console.log('%c🏢 The Bond Departamentos', 'font-size: 20px; font-weight: bold; color: #1a4d2e;');
console.log('%c💚 Tu inversión inteligente en Santa Cruz', 'font-size: 14px; color: #2d7a4f;');
console.log('%c📞 Contacto: +591 76154045', 'font-size: 12px; color: #666;');
