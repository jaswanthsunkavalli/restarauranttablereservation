// Global variables
let restaurants = [];
let userLocation = { name: "Vijayawada", latitude: 16.5062, longitude: 80.6480 };
let isLocationDetected = false;

// Free restaurant data based on real cities
const cityRestaurants = {
    "Vijayawada": [
        { name: "The Golden Fork", rating: 4.7, cuisine: "Italian", address: "456 Main St, Benz Circle" },
        { name: "Spice Garden", rating: 4.5, cuisine: "Indian", address: "789 Raja Vari St, Governorpet" },
        { name: "Dragon Palace", rating: 4.3, cuisine: "Chinese", address: "321 Besant Rd, Benz Circle" },
        { name: "Burger Hub", rating: 4.4, cuisine: "Fast Food", address: "654 Brahmananda St, Labbipet" },
        { name: "Pasta Paradise", rating: 4.6, cuisine: "Italian", address: "987 Mall Rd, MG Road" },
        { name: "Tandoor Express", rating: 4.5, cuisine: "Indian", address: "234 Dwaraka St, Auto Nagar" },
        { name: "Seafood Shack", rating: 4.8, cuisine: "Seafood", address: "567 Canal Rd, Bhavanipuram" },
        { name: "Simply Vegan", rating: 4.2, cuisine: "Vegan", address: "111 Park St, Krishnalanka" },
        { name: "Café Coffee Day", rating: 4.1, cuisine: "Cafe", address: "222 Mall Complex, MG Road" },
        { name: "Pizza Corner", rating: 4.3, cuisine: "Italian", address: "333 Food Court, PVP Mall" },
        { name: "Biryani House", rating: 4.6, cuisine: "Indian", address: "444 Old City, Kavadiguda" },
        { name: "Sushi Zen", rating: 4.4, cuisine: "Japanese", address: "555 New City, Currency Nagar" }
    ],
    "Hyderabad": [
        { name: "Paradise Biryani", rating: 4.8, cuisine: "Indian", address: "123 Paradise Circle, Secunderabad" },
        { name: "Chili's", rating: 4.5, cuisine: "American", address: "456 Banjara Hills, Hyderabad" },
        { name: "Ohri's", rating: 4.6, cuisine: "Multi-Cuisine", address: "789 Somajiguda, Hyderabad" },
        { name: "The Bombay Store Café", rating: 4.3, cuisine: "Cafe", address: "321 Banjara Hills, Hyderabad" },
        { name: "Karachi Bakery", rating: 4.7, cuisine: "Bakery", address: "654 Basheerbagh, Hyderabad" },
        { name: "The Fisherman's Wharf", rating: 4.4, cuisine: "Seafood", address: "987 Boat Club Rd, Hyderabad" },
        { name: "MoMo Café", rating: 4.2, cuisine: "Asian", address: "111 Jubilee Hills, Hyderabad" },
        { name: "Barbecue by Punjab Grill", rating: 4.5, cuisine: "Indian", address: "222 Hitech City, Hyderabad" }
    ],
    "Chennai": [
        { name: "Saravana Bhavan", rating: 4.6, cuisine: "South Indian", address: "123 T Nagar, Chennai" },
        { name: "Benjarong", rating: 4.4, cuisine: "Thai", address: "456 Express Avenue, Chennai" },
        { name: "The Bombay Canteen", rating: 4.7, cuisine: "Indian", address: "789 Nungambakkam, Chennai" },
        { name: "Cream Centre", rating: 4.3, cuisine: "Ice Cream", address: "321 Mylapore, Chennai" },
        { name: "Peshawri", rating: 4.5, cuisine: "North Indian", address: "654 Nungambakkam, Chennai" },
        { name: "Hamsa", rating: 4.8, cuisine: "South Indian", address: "987 Abhiramapuram, Chennai" }
    ],
    "Bangalore": [
        { name: "Koshy's", rating: 4.5, cuisine: "Multi-Cuisine", address: "123 St Marks Rd, Bangalore" },
        { name: "Toit", rating: 4.6, cuisine: "Brewery", address: "456 Indiranagar, Bangalore" },
        { name: "Koshy's Bar", rating: 4.3, cuisine: "Bar", address: "789 St Marks Rd, Bangalore" },
        { name: "The Only Place", rating: 4.7, cuisine: "European", address: "321 Richmond Rd, Bangalore" },
        { name: "Arbor Brewing Company", rating: 4.4, cuisine: "Brewery", address: "654 Brigade Rd, Bangalore" },
        { name: "The Fatty Bao", rating: 4.5, cuisine: "Asian", address: "987 Koramangala, Bangalore" }
    ],
    "Mumbai": [
        { name: "The Table", rating: 4.7, cuisine: "Multi-Cuisine", address: "123 Colaba, Mumbai" },
        { name: "Aer", rating: 4.5, cuisine: "Fine Dining", address: "456 Four Seasons, Mumbai" },
        { name: "Bombay Canteen", rating: 4.6, cuisine: "Indian", address: "789 Fort, Mumbai" },
        { name: "Masque", rating: 4.8, cuisine: "Indian", address: "321 Mahalaxmi, Mumbai" },
        { name: "The Pantry", rating: 4.4, cuisine: "Cafe", address: "654 Lower Parel, Mumbai" },
        { name: "Bombay Coffee House", rating: 4.2, cuisine: "Cafe", address: "987 Fort, Mumbai" }
    ]
};

// Local attractive restaurant images (replace with your actual images)
const restaurantImages = [
    'images/restaurant1.jpg',
    'images/restaurant2.jpg', 
    'images/restaurant3.jpg',
    'images/restaurant4.jpg',
    'images/restaurant5.jpg',
    'images/restaurant6.jpg',
    'images/restaurant7.jpg',
    'images/restaurant8.jpg',
    'images/restaurant9.jpg',
    'images/restaurant10.jpg',
    'images/restaurant11.jpg',
    'images/restaurant12.jpg'
];

// Generate realistic restaurant data
function generateRealisticRestaurants() {
    const city = userLocation.name;
    const baseRestaurants = cityRestaurants[city] || cityRestaurants["Vijayawada"];

    restaurants = baseRestaurants.map((rest, index) => {
        return {
            id: index + 1,
            name: rest.name,
            rating: rest.rating,
            image: restaurantImages[index % restaurantImages.length] || 'images/restaurant1.jpg',
            address: rest.address,
            cuisine: rest.cuisine
        };
    });
}

// Detect user location
function detectLocation() {
    const loader = document.getElementById('locationLoader');
    if (loader) loader.style.display = 'block';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                // Determine city based on coordinates (simplified)
                let city = "Vijayawada"; // default
                if (lat > 17.3 && lat < 17.5 && lng > 78.3 && lng < 78.6) {
                    city = "Hyderabad";
                } else if (lat > 12.9 && lat < 13.1 && lng > 80.2 && lng < 80.3) {
                    city = "Chennai";
                } else if (lat > 12.9 && lat < 13.1 && lng > 77.5 && lng < 77.7) {
                    city = "Bangalore";
                } else if (lat > 18.9 && lat < 19.1 && lng > 72.8 && lng < 72.9) {
                    city = "Mumbai";
                }

                userLocation = {name: city, latitude: lat, longitude: lng};
                isLocationDetected = true;
                updateLocationDisplay();
                updateMapLocation(lat, lng);
                searchNearbyRestaurants();
            },
            err => {
                console.warn('Geolocation failed:', err);
                updateLocationDisplay();
                updateMapLocation(userLocation.latitude, userLocation.longitude);
                searchNearbyRestaurants();
            }
        );
    } else {
        updateLocationDisplay();
        updateMapLocation(userLocation.latitude, userLocation.longitude);
        searchNearbyRestaurants();
    }
}

// Update location display
function updateLocationDisplay() {
    const loader = document.getElementById('locationLoader');
    const info = document.getElementById('locationInfo');
    if (loader) loader.style.display = 'none';
    if (info) {
        info.style.display = 'block';
        document.getElementById('locationCity').textContent = userLocation.name;
        document.getElementById('locationLat').textContent = userLocation.latitude.toFixed(4);
        document.getElementById('locationLng').textContent = userLocation.longitude.toFixed(4);
        document.getElementById('locationDetectionStatus').textContent = isLocationDetected ? "✓ Detected" : "ⓘ Default";
    }
    const locText = document.getElementById('locationText');
    if (locText) {
        locText.textContent = `Showing restaurants near ${userLocation.name}${!isLocationDetected ? ' (default)' : ''}`;
    }
}

// Initialize services
function initMapServices() {
    // Initialize map with default Vijayawada location
    updateMapLocation(16.5062, 80.6480);
    console.log('Map initialized with Vijayawada location');
}

// Update map location
function updateMapLocation(lat, lng) {
    const map = document.getElementById('restaurantMap');
    if (map) {
        // Show current location with restaurants search
        const cityName = userLocation.name.toLowerCase();
        map.src = `https://maps.google.com/maps?q=restaurants+in+${cityName}&hl=en&z=12&output=embed`;
    }
}

// Show restaurant on map
function showRestaurantOnMap(restaurantName, address) {
    const map = document.getElementById('restaurantMap');
    if (map) {
        const cityName = userLocation.name;
        const query = `${restaurantName} ${address} ${cityName}`;
        map.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=16&output=embed`;
    }
}

// Search for restaurants
function searchNearbyRestaurants() {
    console.log('Generating restaurants');
    generateRealisticRestaurants();
    renderRestaurants();
    populateRestaurantDropdown();
}

function renderRestaurants(items = restaurants) {
    const grid = document.getElementById('restaurantsGrid');
    const noResults = document.getElementById('noResults');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = items.map(r => `
        <div class="restaurant-card">
            <img src="${r.image}" alt="${r.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(r.name)}'">
            <div class="info">
                <h3>${r.name}</h3>
                <p>⭐ ${r.rating ? r.rating.toFixed(1) : 'N/A'}</p>
                <p>${r.cuisine}</p>
                <p style="font-size:12px">${r.address}</p>
                <div style="display:flex; gap:8px; margin-top:10px;">
                    <a href="reservation.html?restaurant=${r.id}" class="btn" style="flex:1;text-align:center;font-size:14px;">Book</a>
                    <button class="btn-secondary" onclick="showRestaurantOnMap('${r.name}', '${r.address}')" style="flex:1;font-size:14px;">📍 Map</button>
                </div>
            </div>
        </div>
    `).join('');
}

function performSearch() {
    const term = (document.getElementById('search')?.value || '').toLowerCase();
    const rating = document.getElementById('rating')?.value || '';

    let filtered = restaurants.filter(r => {
        const match = r.name.toLowerCase().includes(term) || r.cuisine.toLowerCase().includes(term);
        const ratingOk = !rating || r.rating >= parseFloat(rating);
        return match && ratingOk;
    });

    renderRestaurants(filtered);
}

function validateEmail(email) {
    // More robust email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Allow phone numbers with optional country code (+91) or just 10 digits
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s|-/g, '')); // Remove spaces and hyphens
}

function validateDate(date) {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
}

function populateRestaurantDropdown() {
    const select = document.getElementById('restaurantSelect');
    if (!select) return;
    select.innerHTML = '<option>-- Select Restaurant --</option>';
    restaurants.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = r.name;
        select.appendChild(opt);
    });
}

function setMinDate() {
    const input = document.getElementById('reservationDate');
    if (input) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth()+1).padStart(2,'0');
        const date = String(today.getDate()).padStart(2,'0');
        input.min = `${year}-${month}-${date}`;
    }
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => menu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => menu.classList.remove('active'));
        });
    }
}

function setupScrollToTop() {
    const btn = document.getElementById('scrollToTopBtn');
    if (btn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
        btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }
}

function setupReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    // Real-time validation
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');
    const dateInput = document.getElementById('reservationDate');

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const error = this.parentNode.querySelector('.error-message');
            if (this.value && !validateEmail(this.value.trim())) {
                this.classList.add('error');
                if (!error) {
                    const err = document.createElement('div');
                    err.className = 'error-message';
                    err.textContent = 'Please enter a valid email address';
                    err.style.color = 'red';
                    err.style.fontSize = '12px';
                    err.style.marginTop = '5px';
                    this.parentNode.appendChild(err);
                }
            } else {
                this.classList.remove('error');
                if (error) {
                    error.remove();
                }
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const error = this.parentNode.querySelector('.error-message');
            if (this.value && !validatePhone(this.value.trim())) {
                this.classList.add('error');
                if (!error) {
                    const err = document.createElement('div');
                    err.className = 'error-message';
                    err.textContent = 'Please enter a valid 10-digit phone number';
                    err.style.color = 'red';
                    err.style.fontSize = '12px';
                    err.style.marginTop = '5px';
                    this.parentNode.appendChild(err);
                }
            } else {
                this.classList.remove('error');
                if (error) {
                    error.remove();
                }
            }
        });
    }

    if (dateInput) {
        dateInput.addEventListener('change', function() {
            const error = this.parentNode.querySelector('.error-message');
            if (this.value && !validateDate(this.value)) {
                this.classList.add('error');
                if (!error) {
                    const err = document.createElement('div');
                    err.className = 'error-message';
                    err.textContent = 'Please select today or a future date';
                    err.style.color = 'red';
                    err.style.fontSize = '12px';
                    err.style.marginTop = '5px';
                    this.parentNode.appendChild(err);
                }
            } else {
                this.classList.remove('error');
                if (error) {
                    error.remove();
                }
            }
        });
    }

    // Check for restaurant parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurant');
    if (restaurantId) {
        // Wait for restaurants to be loaded, then select the restaurant
        const checkRestaurants = () => {
            if (restaurants.length > 0) {
                const select = document.getElementById('restaurantSelect');
                if (select) {
                    select.value = restaurantId;
                }
            } else {
                setTimeout(checkRestaurants, 100);
            }
        };
        checkRestaurants();
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Clear any existing error messages
        form.querySelectorAll('.error-message').forEach(err => err.remove());

        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const restId = document.getElementById('restaurantSelect').value;
        const guests = document.getElementById('numGuests').value;
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('timeSlot').value;

        let hasErrors = false;

        if (!name) {
            showError('customerName', 'Name is required');
            hasErrors = true;
        }

        if (!email) {
            showError('customerEmail', 'Email is required');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            showError('customerEmail', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!phone) {
            showError('customerPhone', 'Phone number is required');
            hasErrors = true;
        } else if (!validatePhone(phone)) {
            showError('customerPhone', 'Please enter a valid 10-digit phone number');
            hasErrors = true;
        }

        if (!restId) {
            showError('restaurantSelect', 'Please select a restaurant');
            hasErrors = true;
        }

        if (!guests) {
            showError('numGuests', 'Please select number of guests');
            hasErrors = true;
        }

        if (!date) {
            showError('reservationDate', 'Please select a date');
            hasErrors = true;
        } else if (!validateDate(date)) {
            showError('reservationDate', 'Please select today or a future date');
            hasErrors = true;
        }

        if (!time) {
            showError('timeSlot', 'Please select a time');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        const rest = restaurants.find(r => r.id == restId);
        const dateObj = new Date(date);
        const formatted = dateObj.toLocaleDateString('en-IN',{weekday:'long', year:'numeric', month:'long', day:'numeric'});

        const modal = document.getElementById('successModal');
        if (modal) {
            document.getElementById('successMessage').innerHTML = `
                <strong>${rest ? rest.name : 'Selected Restaurant'}</strong><br>
                ${formatted} at ${time}<br>
                ${guests} Guest(s)<br>
                Confirmation sent to ${email}
            `;
            modal.style.display = 'flex';
        }

        form.reset();
        // Clear all error states after successful submission
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        form.querySelectorAll('.error-message').forEach(err => err.remove());
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('error');

    const error = field.parentNode.querySelector('.error-message');
    if (!error) {
        const err = document.createElement('div');
        err.className = 'error-message';
        err.textContent = message;
        err.style.color = 'red';
        err.style.fontSize = '12px';
        err.style.marginTop = '5px';
        field.parentNode.appendChild(err);
    } else {
        error.textContent = message;
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Real-time validation for email
    const emailInput = document.getElementById('contactEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const error = this.parentNode.querySelector('.error-message');
            if (this.value && !validateEmail(this.value.trim())) {
                this.classList.add('error');
                if (!error) {
                    const err = document.createElement('div');
                    err.className = 'error-message';
                    err.textContent = 'Please enter a valid email address';
                    err.style.color = 'red';
                    err.style.fontSize = '12px';
                    err.style.marginTop = '5px';
                    this.parentNode.appendChild(err);
                }
            } else {
                this.classList.remove('error');
                if (error) {
                    error.remove();
                }
            }
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Clear any existing error messages
        form.querySelectorAll('.error-message').forEach(err => err.remove());

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        let hasErrors = false;

        if (!name) {
            showError('contactName', 'Name is required');
            hasErrors = true;
        }

        if (!email) {
            showError('contactEmail', 'Email is required');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            showError('contactEmail', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!subject) {
            showError('contactSubject', 'Subject is required');
            hasErrors = true;
        }

        if (!message) {
            showError('contactMessage', 'Message is required');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        alert(`Thank you, ${name}! We'll contact you soon.`);
        form.reset();
        // Clear all error states after successful submission
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        form.querySelectorAll('.error-message').forEach(err => err.remove());
    });
}

function setupSearchAndFilter() {
    const search = document.getElementById('search');
    const rating = document.getElementById('rating');
    if (search) search.addEventListener('input', performSearch);
    if (rating) rating.addEventListener('change', performSearch);
}

function setupFindRestaurantsBtn() {
    const btn = document.getElementById('findRestaurantsBtn');
    if (btn) btn.addEventListener('click', () => window.location.href = 'restaurants.html');
}

function init() {
    // Initialize services (no external APIs needed)
    initMapServices();

    detectLocation();
    setupMobileMenu();
    setupScrollToTop();
    setupFindRestaurantsBtn();

    if (document.getElementById('restaurantsGrid')) {
        // Restaurants will be loaded after location detection
        renderRestaurants();
        setupSearchAndFilter();
    }

    if (document.getElementById('reservationForm')) {
        // Restaurants will be populated after location detection
        setMinDate();
        setupReservationForm();
    }

    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
}

document.addEventListener('DOMContentLoaded', init);
