const restaurants = [
    {id:1, name:"The Golden Fork", rating:4.7, image:"https://via.placeholder.com/300x200?text=Golden+Fork", address:"456 Main St", cuisine:"Italian", distance:0.5},
    {id:2, name:"Spice Garden", rating:4.5, image:"https://via.placeholder.com/300x200?text=Spice+Garden", address:"789 Raja Vari", cuisine:"Indian", distance:0.8},
    {id:3, name:"Dragon Palace", rating:4.3, image:"https://via.placeholder.com/300x200?text=Dragon+Palace", address:"321 Besant Rd", cuisine:"Chinese", distance:1.2},
    {id:4, name:"Burger Hub", rating:4.4, image:"https://via.placeholder.com/300x200?text=Burger+Hub", address:"654 Brahmananda", cuisine:"Fast Food", distance:0.3},
    {id:5, name:"Pasta Paradise", rating:4.6, image:"https://via.placeholder.com/300x200?text=Pasta+Paradise", address:"987 Mall", cuisine:"Italian", distance:0.9},
    {id:6, name:"Tandoor Express", rating:4.5, image:"https://via.placeholder.com/300x200?text=Tandoor", address:"234 Dwaraka", cuisine:"Indian", distance:1.1},
    {id:7, name:"Seafood Shack", rating:4.8, image:"https://via.placeholder.com/300x200?text=Seafood", address:"567 Canal", cuisine:"Seafood", distance:1.5},
    {id:8, name:"Simply Vegan", rating:4.2, image:"https://via.placeholder.com/300x200?text=Vegan", address:"111 Park", cuisine:"Vegan", distance:0.7}
];

const defaultLocation = {name:"Vijayawada", latitude:16.5062, longitude:80.6480};
let userLocation = defaultLocation;
let isLocationDetected = false;

function detectLocation() {
    const loader = document.getElementById('locationLoader');
    if (loader) loader.style.display = 'block';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const dist = Math.sqrt(Math.pow(lat-16.5062,2) + Math.pow(lng-80.6480,2));
                const city = dist < 0.1 ? "Vijayawada" : dist < 2 ? "Vijayawada Region" : "Your Location";
                userLocation = {name:city, latitude:lat, longitude:lng};
                isLocationDetected = true;
                updateLocationDisplay();
                updateMapLocation(lat, lng);
            },
            err => {
                updateLocationDisplay();
                updateMapLocation(defaultLocation.latitude, defaultLocation.longitude);
            }
        );
    } else {
        updateLocationDisplay();
        updateMapLocation(defaultLocation.latitude, defaultLocation.longitude);
    }
}

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
        locText.textContent = `Showing near ${userLocation.name}${!isLocationDetected ? ' (default)' : ''}`;
    }
}

function updateMapLocation(lat, lng) {
    const map = document.getElementById('restaurantMap');
    if (map) {
        map.src = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=13&output=embed`;
    }
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
            <img src="${r.image}" alt="${r.name}">
            <div class="info">
                <h3>${r.name}</h3>
                <p>⭐ ${r.rating} | 📍 ${r.distance}km</p>
                <p>${r.cuisine}</p>
                <p style="font-size:12px">${r.address}</p>
                <a href="reservation.html" class="btn" style="display:block;text-align:center">Book</a>
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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

function validateDate(date) {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
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

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const restId = document.getElementById('restaurantSelect').value;
        const guests = document.getElementById('numGuests').value;
        const date = document.getElementById('reservationDate').value;
        const time = document.getElementById('timeSlot').value;

        if (!name || !email || !phone || !restId || !guests || !date || !time) {
            alert('All fields required!');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email!');
            return;
        }

        if (!validatePhone(phone)) {
            alert('Phone must be 10 digits!');
            return;
        }

        if (!validateDate(date)) {
            alert('Date cannot be in past!');
            return;
        }

        const rest = restaurants.find(r => r.id == restId);
        const dateObj = new Date(date);
        const formatted = dateObj.toLocaleDateString('en-IN',{weekday:'long', year:'numeric', month:'long', day:'numeric'});

        const modal = document.getElementById('successModal');
        if (modal) {
            document.getElementById('successMessage').innerHTML = `
                <strong>${rest.name}</strong><br>
                ${formatted} at ${time}<br>
                ${guests} Guest(s)<br>
                Confirmation sent to ${email}
            `;
            modal.style.display = 'flex';
        }

        form.reset();
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !subject || !message) {
            alert('All fields required!');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email!');
            return;
        }

        alert(`Thank you, ${name}! We'll contact you soon.`);
        form.reset();
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
    detectLocation();
    setupMobileMenu();
    setupScrollToTop();
    setupFindRestaurantsBtn();

    if (document.getElementById('restaurantsGrid')) {
        populateRestaurantDropdown();
        renderRestaurants();
        setupSearchAndFilter();
    }

    if (document.getElementById('reservationForm')) {
        populateRestaurantDropdown();
        setMinDate();
        setupReservationForm();
    }

    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
}

document.addEventListener('DOMContentLoaded', init);
