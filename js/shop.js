// js/shop.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, limit, startAfter, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCohDKOlNxyD9ckIZdTM0GE8RjS9_Bw_tI",
    authDomain: "ashley-timber.firebaseapp.com",
    projectId: "ashley-timber",
    //... rest of config
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

    const productGrid = document.getElementById('product-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    const productsPerPage = 12; // Increased for a better grid view
    let lastVisible = null; // Used for cursor-based pagination
    let currentCategory = 'all';

    async function fetchProducts(category, direction = 'next') {
        try {
            const productsCollection = collection(db, 'products');
            let q;

            // Base query with ordering
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
            querySnapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
            
            // Update the cursor for the next page
            lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

            displayProducts(products);
            setupPagination(querySnapshot.size);

        } catch (error) {
            console.error("Error fetching products:", error);
            productGrid.innerHTML = `<p>Error loading products. Please try again later.</p>`;
        }
    }
    
    function displayProducts(products) {
        productGrid.innerHTML = ''; // Clear existing grid

        if (products.length === 0) {
            productGrid.innerHTML = `<p>No products found in this category.</p>`;
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const categoryDisplay = product.categoryPath ? product.categoryPath[0] : 'Uncategorized';
            
            card.innerHTML = `
                <div class="product-card-image">
                    <img src="${product.imageSrc}" alt="${product.name}">
                </div>
                <div class="product-card-info">
                    <p class="product-category">${categoryDisplay}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">£${product.price.toFixed(2)} <span>inc VAT</span></p>
                    <div class="quantity-selector">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                    <button class="add-to-cart-btn">Add to Basket</button>
                </div>
            `;
            productGrid.appendChild(card);
        });
        addCardEventListeners();
    }
    
    function setupPagination(count) {
        // More advanced pagination needed for Firestore, for now we just show a "Next" button.
        paginationControls.innerHTML = '';
        if (count < productsPerPage) return; // Don't show "Next" if it's the last page

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Load More';
        nextButton.addEventListener('click', () => {
            // NOTE: This basic implementation appends products. A true "Next Page" would replace them.
            // For simplicity, we'll stick to a Load More flow here.
            fetchProducts(currentCategory, 'next'); 
        });
        paginationControls.appendChild(nextButton);
    }

    function addCardEventListeners() { /* The same function as before */ }

    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            categoryFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = e.target.dataset.category;
            lastVisible = null; // Reset pagination cursor
            fetchProducts(currentCategory);
        });
    });

    // Initial Load
    fetchProducts('all');
});
