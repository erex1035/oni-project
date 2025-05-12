// Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".overlay");

  hamburger.addEventListener("click", () => {
    console.log("hamburger clicked");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Rental Modal
document.addEventListener('DOMContentLoaded', function() {
  // Rental Modal Elements
  const rentalModal = document.getElementById('rentalFormModal');
  const closeRentalModal = document.querySelector('.close-rental-modal');
  const rentalForm = document.getElementById('rentalForm');
  
  // Function to open rental modal with car name
  function openRentalModal(carName) {
    document.getElementById('rentalCarName').textContent = carName;
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('pickupDate').value = today;
    document.getElementById('returnDate').value = tomorrow.toISOString().split('T')[0];
    
    // Show modal
    rentalModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Open rental modal when clicking Rent buttons (existing functionality)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('rent-now-btn')) {
      const carName = e.target.closest('.modal-content').querySelector('#modalCarName').textContent;
      openRentalModal(carName);
    }
  });
  
  // NEW: Handle Rent buttons in car items
  document.addEventListener('click', function(e) {
    // Check if clicked element is the first button in car-buttons
    if (e.target.matches('.car-buttons button:first-child')) {
      const carItem = e.target.closest('.car-item');
      const carName = carItem.querySelector('.car-name').textContent;
      openRentalModal(carName);
    }
  });
  
  // Close rental modal
  closeRentalModal.addEventListener('click', function() {
    rentalModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close when clicking outside
  rentalModal.addEventListener('click', function(e) {
    if (e.target === rentalModal) {
      rentalModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Form submission
  rentalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Booking submitted successfully!');
    rentalModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Date validation
  document.getElementById('pickupDate').addEventListener('change', function() {
    document.getElementById('returnDate').min = this.value;
  });
});

// Details Modal
document.addEventListener('DOMContentLoaded', function() {
  const detailsModal = document.getElementById('detailsModal');
  const closeModal = document.querySelector('.close-modal');
  
  // Touch-friendly details button handler
  document.querySelectorAll('.car-buttons button:nth-child(2)').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const carItem = this.closest('.car-item');
      
      // Get car data (you can expand this with more attributes)
      const carData = {
        name: carItem.querySelector('.car-name').textContent,
        price: carItem.querySelector('.car-price').textContent,
        image: carItem.querySelector('img').src,
        type: carItem.dataset.type || 'Luxury Car',
        engine: carItem.dataset.engine || '3.5L V6',
        transmission: carItem.dataset.transmission || 'Automatic',
        seats: carItem.dataset.seats || '4'
      };
      
      // Update modal
      document.getElementById('modalCarImage').src = carData.image;
      document.getElementById('modalCarName').textContent = carData.name;
      document.getElementById('modalCarPrice').textContent = carData.price;
      document.getElementById('modalCarType').textContent = carData.type;
      document.getElementById('modalCarEngine').textContent = carData.engine;
      document.getElementById('modalCarTransmission').textContent = carData.transmission;
      document.getElementById('modalCarSeats').textContent = carData.seats;
      
      // Show modal with animation
      detailsModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        detailsModal.style.opacity = '1';
        document.querySelector('.modal-content').style.transform = 'translateY(0)';
      }, 10);
    });
  });
  
  // Close handlers
  function closeDetailsModal() {
    detailsModal.style.opacity = '0';
    document.querySelector('.modal-content').style.transform = 'translateY(20px)';
    setTimeout(() => {
      detailsModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  closeModal.addEventListener('click', closeDetailsModal);
  detailsModal.addEventListener('click', function(e) {
    if (e.target === detailsModal) closeDetailsModal();
  });
  
  // Escape key close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && detailsModal.style.display === 'flex') {
      closeDetailsModal();
    }
  });
});

// Carousel
document.addEventListener('DOMContentLoaded', function() {
  // Carousel elements
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.car-item:not(.clone)');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  // Clone items for infinite effect
  const firstClone = items[0].cloneNode(true);
  const secondClone = items[1].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  const secondLastClone = items[items.length - 2].cloneNode(true);
  
  firstClone.classList.add('clone');
  secondClone.classList.add('clone');
  lastClone.classList.add('clone');
  secondLastClone.classList.add('clone');
  
  // Add clones to track
  track.insertBefore(lastClone, items[0]);
  track.insertBefore(secondLastClone, items[0]);
  track.appendChild(firstClone);
  track.appendChild(secondClone);
  
  // All items including clones
  const allItems = document.querySelectorAll('.car-item');
  const itemCount = items.length;
  let currentIndex = 2; // Start at first original item
  let isAnimating = false;
  
  // Calculate item width including gap
  function getItemWidth() {
    return items[0].offsetWidth + 20;
  }
  
  // Update carousel position
  function updatePosition() {
    track.style.transform = `translateX(${-currentIndex * getItemWidth()}px)`;
  }
  
  // Handle next click
  function handleNext() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex++;
    track.style.transition = 'transform 0.5s ease';
    updatePosition();
    
    // If reached end, instantly reset to beginning
    if (currentIndex >= itemCount + 2) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 2;
        updatePosition();
        void track.offsetWidth; // Force reflow
        track.style.transition = 'transform 0.5s ease';
        isAnimating = false;
      }, 500);
    } else {
      setTimeout(() => { isAnimating = false; }, 500);
    }
  }
  
  // Handle previous click
  function handlePrev() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex--;
    track.style.transition = 'transform 0.5s ease';
    updatePosition();
    
    // If reached beginning, instantly reset to end
    if (currentIndex <= 1) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = itemCount + 1;
        updatePosition();
        void track.offsetWidth; // Force reflow
        track.style.transition = 'transform 0.5s ease';
        isAnimating = false;
      }, 500);
    } else {
      setTimeout(() => { isAnimating = false; }, 500);
    }
  }
  
  // Initialize carousel
  track.style.transition = 'none';
  updatePosition();
  void track.offsetWidth; // Force reflow
  track.style.transition = 'transform 0.5s ease';
  
  // Event listeners
  nextBtn.addEventListener('click', handleNext);
  prevBtn.addEventListener('click', handlePrev);
  
  // Handle window resize
  window.addEventListener('resize', function() {
    track.style.transition = 'none';
    updatePosition();
    void track.offsetWidth;
    track.style.transition = 'transform 0.5s ease';
  });
});

// Filter Modal
document.addEventListener('DOMContentLoaded', function() {
  const filterModal = document.getElementById('filterModal');
  const filterBtn = document.querySelector('.filter-btn');
  const closeFilter = document.querySelector('.close-filter');
  const applyFilters = document.getElementById('applyFilters');
  const resetFilters = document.getElementById('resetFilters');
  const brandFilter = document.getElementById('brand-filter');
  const modelFilter = document.getElementById('model-filter');
  const categoryFilter = document.getElementById('category-filter');
  const priceRange = document.getElementById('price-range');
  const priceValue = document.getElementById('price-value');
  
  // Car models data
  const carModels = {
    'ford': ['Mustang', 'F-150', 'Explorer', 'Focus', 'Escape'],
    'toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
    'chevrolet': ['Tahoe', 'Silverado', 'Malibu', 'Equinox', 'Camaro'],
    'bmw': ['X5', '3 Series', '5 Series', 'Z4', 'X3'],
    'honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey']
  };
  
  // Toggle modal
  filterBtn.addEventListener('click', () => {
    filterModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  
  closeFilter.addEventListener('click', () => {
    filterModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside
  filterModal.addEventListener('click', (e) => {
    if (e.target === filterModal) {
      filterModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Update price display
  priceRange.addEventListener('input', () => {
    priceValue.textContent = priceRange.value;
  });
  
  // Update models when brand changes
  brandFilter.addEventListener('change', function() {
    const brand = this.value;
    modelFilter.innerHTML = '<option value="">All Models</option>';
    modelFilter.disabled = !brand;
    
    if (brand && carModels[brand]) {
      carModels[brand].forEach(model => {
        const option = document.createElement('option');
        option.value = model.toLowerCase();
        option.textContent = model;
        modelFilter.appendChild(option);
      });
    }
  });
  
  // Reset filters
  resetFilters.addEventListener('click', () => {
    brandFilter.value = '';
    modelFilter.innerHTML = '<option value="">Select brand first</option>';
    modelFilter.disabled = true;
    categoryFilter.value = '';
    priceRange.value = 500;
    priceValue.textContent = '500';
  });
  
  // Apply filters
  applyFilters.addEventListener('click', () => {
    const brand = brandFilter.value;
    const model = modelFilter.value;
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceRange.value);
    
    document.querySelectorAll('.car-item:not(.clone)').forEach(item => {
      const itemBrand = item.dataset.brand;
      const itemModel = item.dataset.model;
      const itemCategory = item.dataset.category;
      const itemPrice = parseInt(item.dataset.price);
      
      const brandMatch = !brand || itemBrand === brand;
      const modelMatch = !model || itemModel === model;
      const categoryMatch = !category || itemCategory === category;
      const priceMatch = itemPrice <= maxPrice;
      
      item.style.display = (brandMatch && modelMatch && categoryMatch && priceMatch) ? '' : 'none';
    });
    
    filterModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});