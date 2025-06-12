// js/shop.js (FINAL VERSION)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, limit, startAfter, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCohDKOlNxyD9ckIZdTM0GE8RjS9_Bw_tI",
    authDomain: "ashley-timber.firebaseapp.com",
    projectId: "ashley-timber",
    storageBucket: "ashley-timber.firebasestorage.app",
    messagingSenderId: "140036393619",
    appId: "1:140036393619:web:d3c39435e5f31f533d9b66",
    measurementId: "G-H9KXBKDNNT"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

    const productGrid = document.getElementById('product-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const categoryLinks = document.querySelectorAll('.sidebar-nav a');
    
    const productsPerPage = 12;
    let lastVisible = null;
    let currentCategory = 'all';
    let isFetching = false;

    // --- ACCORDION LOGIC ---
    categoryLinks.forEach(link => {
        if (link.dataset.toggle === 'submenu') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                link.parentElement.classList.toggle('active');
            });
        }
    });

    async function fetchProducts(category, direction = 'next') {
        if (isFetching) return;
        isFetching = true;

        try {
            const productsCollection = collection(db, 'products');
            let q;

            // Define the base query with filtering and ordering
            const baseQuery = category === 'all'
                ? query(productsCollection, orderBy('name'))
                : query(productsCollection, where('categoryPath', 'array-contains', category), orderBy('name'));
            
            // Add pagination logic
            if (direction === 'next' && lastVisible) {
                q = query(baseQuery, startAfter(lastVisible), limit(productsPerPage));
            } else {
                q = query(baseQuery, limit(productsPerPage));
            }
            
            const querySnapshot = await getDocs(q);
            const products = [];
            querySnapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));

            lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            displayProducts(products, direction); // Pass direction to know if we append or replace
            setupPagination(querySnapshot.size);

        } catch (error) {
            console.error("Error fetching products:", error);
            productGrid.innerHTML = `<p>Error loading products. This may be due to a required database index that is still building. Please try again in a few minutes.</p>`;
        } finally {
            isFetching = false;
        }
    }
    
    function displayProducts(products, direction) {
        if (direction !== 'next') {
            productGrid.innerHTML = ''; // Clear only if it's a new filter, not for 'Load More'
        }

        if (products.length === 0 && productGrid.innerHTML === '') {
            productGrid.innerHTML = `<p>No products found in this category.</p>`;
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const categoryDisplay = product.categoryPath ? product.categoryPath[0] : 'Uncategorized';
            
            card.innerHTML = `
                <div class="product-card-image"><img src="${product.imageSrc}" alt="${product.name}"></div>
                <div class="product-card-info">
                    <p class="product-category">${categoryDisplay}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">£${product.price.toFixed(2)} <span>inc VAT</span></p>
                    <div class="quantity-selector"><button class="quantity-btn" data-action="decrease">-</button><span class="quantity">1</span><button class="quantity-btn" data-action="increase">+</button></div>
                    <button class="add-to-cart-btn">Add to Basket</button>
                </div>`;
            productGrid.appendChild(card);
        });
        addCardEventListeners();
    }
    
    function setupPagination(count) {
        paginationControls.innerHTML = '';
        if (count < productsPerPage) return;

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Load More';
        nextButton.id = 'load-more-btn';
        nextButton.addEventListener('click', () => {
            fetchProducts(currentCategory, 'next');
        });
        paginationControls.appendChild(nextButton);
    }

    function addCardEventListeners() { /* Same function as before */ }

    // Setup filter links
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();

            // Style the active link
            document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Set state and fetch
            currentCategory = e.currentTarget.dataset.category;
            lastVisible = null; // Reset pagination
            productGrid.innerHTML = '<p>Loading products...</p>'; // Show loading state
            fetchProducts(currentCategory);
        });
    });

    // Initial Load
    fetchProducts('all');
});
