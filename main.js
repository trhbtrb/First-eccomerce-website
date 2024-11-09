// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Toast Notification Function
function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: type === 'success' ? "green" : "red",
    }).showToast();
}

// Newsletter Form Validation and Feedback
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterFeedback = document.getElementById('newsletter-feedback');
const newsletterError = document.getElementById('newsletter-error');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValue = newsletterEmail.value.trim();

        if (validateEmail(emailValue)) {
            // Simulate form submission (e.g., send data to server)
            showToast('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        } else {
            showToast('Please enter a valid email address.', 'error');
        }

        // Optionally hide messages after a delay
        setTimeout(() => {
            newsletterFeedback.classList.add('hidden');
            newsletterError.classList.add('hidden');
        }, 5000);
    });
}

function validateEmail(email) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

// Add to Cart Functionality
document.addEventListener('click', function(e) {
    if (e.target && (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart'))) {
        e.preventDefault();
        let button = e.target;
        if (button.tagName !== 'BUTTON') {
            button = button.parentElement;
        }

        // Simulate adding to cart
        let cartCount = document.getElementById('cart-count');
        let currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;

        // Show toast notification
        showToast('Item added to cart!', 'success');
    }
});

// Dynamic Product Listing (Example for Trending Now)
const trendingProducts = [
    {
        image: 'assets/images/product1.jpg',
        name: 'Trending Product 1',
        price: 99.99,
        rating: 5,
        reviews: 24,
        label: 'Featured'
    },
    {
        image: 'assets/images/product2.jpg',
        name: 'Trending Product 2',
        price: 79.99,
        originalPrice: 99.99,
        rating: 4,
        reviews: 18,
        label: 'Best Seller'
    },
    {
        image: 'assets/images/product3.jpg',
        name: 'Trending Product 3',
        price: 149.99,
        rating: 5,
        reviews: 31,
        label: 'New Arrival'
    },
    {
        image: 'assets/images/product4.jpg',
        name: 'Trending Product 4',
        price: 129.99,
        rating: 4,
        reviews: 27,
        label: 'Popular'
    }
];

function displayTrendingProducts() {
    const trendingContainer = document.getElementById('trending-products');

    trendingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'group');

        let productLabel = '';
        if (product.label) {
            productLabel = `<span class="text-sm text-blue-600 font-semibold">${product.label}</span>`;
        }

        let productPrice = `<span class="text-xl font-bold">$${product.price.toFixed(2)}</span>`;
        if (product.originalPrice) {
            productPrice += `<span class="text-sm text-gray-500 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>`;
        }

        let productRating = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                productRating += '<i class="fas fa-star text-yellow-400"></i>';
            } else {
                productRating += '<i class="far fa-star text-yellow-400"></i>';
            }
        }

        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover" loading="lazy">
                <div class="absolute top-2 right-2">
                    <button class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100" aria-label="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                ${product.originalPrice ? `<div class="absolute top-2 left-2"><span class="bg-red-500 text-white px-2 py-1 rounded-md text-sm">Sale</span></div>` : ''}
            </div>
            <div class="p-4">
                ${productLabel}
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400">${productRating}</div>
                    <span class="text-sm text-gray-500 ml-1">(${product.reviews})</span>
                </div>
                <div class="flex justify-between items-center">
                    ${productPrice}
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        trendingContainer.appendChild(productCard);
    });
}

// Display Trending Products on Page Load
document.addEventListener('DOMContentLoaded', displayTrendingProducts);

// Product Filtering and Sorting (Basic Example)
const sortBySelect = document.getElementById('sort-by');
const searchInput = document.getElementById('product-search');
const trendingContainer = document.getElementById('trending-products');

sortBySelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase();
    const sortBy = sortBySelect.value;

    // Filter products based on search query
    let filteredProducts = trendingProducts.filter(product => product.name.toLowerCase().includes(searchQuery));

    // Sort products based on selected option
    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        // Assuming the products array is ordered from oldest to newest
        filteredProducts.reverse();
    } // else 'featured' - no sorting

    // Clear current products
    trendingContainer.innerHTML = '';

    // Display filtered and sorted products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden', 'group');

        let productLabel = '';
        if (product.label) {
            productLabel = `<span class="text-sm text-blue-600 font-semibold">${product.label}</span>`;
        }

        let productPrice = `<span class="text-xl font-bold">$${product.price.toFixed(2)}</span>`;
        if (product.originalPrice) {
            productPrice += `<span class="text-sm text-gray-500 line-through ml-2">$${product.originalPrice.toFixed(2)}</span>`;
        }

        let productRating = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                productRating += '<i class="fas fa-star text-yellow-400"></i>';
            } else {
                productRating += '<i class="far fa-star text-yellow-400"></i>';
            }
        }

        productCard.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover" loading="lazy">
                <div class="absolute top-2 right-2">
                    <button class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100" aria-label="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                ${product.originalPrice ? `<div class="absolute top-2 left-2"><span class="bg-red-500 text-white px-2 py-1 rounded-md text-sm">Sale</span></div>` : ''}
            </div>
            <div class="p-4">
                ${productLabel}
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400">${productRating}</div>
                    <span class="text-sm text-gray-500 ml-1">(${product.reviews})</span>
                </div>
                <div class="flex justify-between items-center">
                    ${productPrice}
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        trendingContainer.appendChild(productCard);
    });

    // If no products match, display a message
    if (filteredProducts.length === 0) {
        trendingContainer.innerHTML = '<p class="text-center text-gray-600">No products found.</p>';
    }
}

