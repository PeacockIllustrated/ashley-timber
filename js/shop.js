document.addEventListener('DOMContentLoaded', () => {

    const allProducts = [
        // Acoustic Panels
        { id: 1, name: 'LIGHT OAK Acoustic Panel 2400x605x22mm', category: 'acoustic-panels', price: 76.00, imageSrc: 'assets/product-light-oak.png' },
        { id: 2, name: 'DARK GREY Acoustic Panel 2400x605x22mm', category: 'acoustic-panels', price: 76.00, imageSrc: 'assets/product-dark-grey.png' },
        { id: 3, name: 'WALNUT Acoustic Panel 2400x605x22mm', category: 'acoustic-panels', price: 76.00, imageSrc: 'assets/product-walnut.png' },
        { id: 4, name: 'SMOKED OAK Acoustic Panel 2400x605x22mm', category: 'acoustic-panels', price: 76.00, imageSrc: 'assets/product-smoked-oak.png' },
        
        // Rustins
        { id: 5, name: 'QD Poly Varnish Satin Clear 1 L', category: 'rustins', price: 22.87, imageSrc: 'assets/product-placeholder.png' },
        { id: 6, name: 'QD Poly Varnish Satin Clear 500 ml', category: 'rustins', price: 13.21, imageSrc: 'assets/product-placeholder.png' },
        { id: 7, name: 'QD Poly Varnish Gloss Clear 500 ml', category: 'rustins', price: 13.21, imageSrc: 'assets/product-placeholder.png' },

        // Firewood
        { id: 8, name: 'Net Kindling Bag 3-4 kg', category: 'firewood', price: 4.75, imageSrc: 'assets/product-firewood.png' },
        { id: 9, name: 'Softwood Fire Logs Nett Bag', category: 'firewood', price: 6.50, imageSrc: 'assets/product-firewood.png' },

        // Building
        { id: 10, name: '12.5mm 2400x1200 Plasterboard (Taper Edge)', category: 'building', price: 14.50, imageSrc: 'assets/product-placeholder.png' },
        { id: 11, name: '12.5mm MR 2400x1200 Plasterboard', category: 'building', price: 24.86, imageSrc: 'assets/product-placeholder.png' },
        { id: 12, name: 'Knauf Baseboard 900x1220x9.5 mm', category: 'building', price: 7.10, imageSrc: 'assets/product-placeholder.png' },

        // Decking
        { id: 13, name: 'Sunset Decking Trellis Panel 1130x760mm', category: 'decking', price: 31.99, imageSrc: 'assets/product-placeholder.png' },
        { id: 14, name: 'BOX Deck-Tite Handrail Brackets (12-pack)', category: 'decking', price: 10.80, imageSrc: 'assets/product-placeholder.png' },
        { id: 15, name: 'BOX 4.5x60mm Decking Screws (200)', category: 'decking', price: 6.00, imageSrc: 'assets/product-placeholder.png' },

        // Doors
        { id: 16, name: '78x33" White Colonist 6-Panel', category: 'doors', price: 49.50, imageSrc: 'assets/product-placeholder.png' },
        { id: 17, name: 'Oak Belize Glazed 78x27" (LPD)', category: 'doors', price: 181.16, imageSrc: 'assets/product-placeholder.png' },
        { id: 18, name: '78x33" Fire-Check Ply ½-Hour', category: 'doors', price: 79.85, imageSrc: 'assets/product-placeholder.png' },

        // Fencing
        { id: 19, name: '1800x900mm Superior Closeboard Gate', category: 'fencing', price: 81.60, imageSrc: 'assets/product-placeholder.png' },
        { id: 20, name: '1800x1500mm Elite Meloir Panel', category: 'fencing', price: 81.92, imageSrc: 'assets/product-placeholder.png' },
        { id: 21, name: '1800x1050mm Elite Meloir Panel', category: 'fencing', price: 71.62, imageSrc: 'assets/product-placeholder.png' },

        // Hardware
        { id: 22, name: '4x40mm Performance Plus (200)', category: 'hardware', price: 4.67, imageSrc: 'assets/product-placeholder.png' },
        { id: 23, name: '5x70mm Performance Plus (100)', category: 'hardware', price: 6.13, imageSrc: 'assets/product-placeholder.png' },
        { id: 24, name: '5x100mm Performance Plus (100)', category: 'hardware', price: 10.70, imageSrc: 'assets/product-placeholder.png' },
        
        // Mouldings
        { id: 25, name: '15x15mm White Scotia 2.4 m', category: 'mouldings', price: 4.68, imageSrc: 'assets/product-placeholder.png' },
        { id: 26, name: '18x18mm Sucupira Scotia 2.4 m', category: 'mouldings', price: 3.26, imageSrc: 'assets/product-placeholder.png' },
        { id: 27, name: '15x15mm Scotia Pine 2.4 m', category: 'mouldings', price: 3.50, imageSrc: 'assets/product-placeholder.png' },

        // Sheet Materials
        { id: 28, name: '12mm B/BB Birch Ply 2440x1220mm', category: 'sheet-materials', price: 133.20, imageSrc: 'assets/product-placeholder.png' },
        { id: 29, name: '18mm Chipboard Std 2440x1220mm', category: 'sheet-materials', price: 29.87, imageSrc: 'assets/product-placeholder.png' },
        { id: 30, name: '3.2mm Standard Hardboard 2440x1220mm', category: 'sheet-materials', price: 10.96, imageSrc: 'assets/product-placeholder.png' },

        // Timber
        { id: 31, name: '2.4m 47x150mm KD C24 (6x2)', category: 'timber', price: 11.47, imageSrc: 'assets/product-placeholder.png' },
        { id: 32, name: '4.8m CLS Timber 38x89mm', category: 'timber', price: 9.60, imageSrc: 'assets/product-placeholder.png' },
        { id: 33, name: '3.6m 47x100mm KD C24 (4x2)', category: 'timber', price: 11.47, imageSrc: 'assets/product-placeholder.png' },
    ];

    const productGrid = document.getElementById('product-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    let currentPage = 1;
    const productsPerPage = 8;
    let currentCategory = 'all';

    function displayProducts() {
        // Filter products by category
        const filteredProducts = currentCategory === 'all'
            ? allProducts
            : allProducts.filter(product => product.category === currentCategory);

        // Clear existing grid
        productGrid.innerHTML = '';
        
        // Paginate
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        // Create and append product cards
        paginatedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-card-image">
                    <img src="${product.imageSrc}" alt="${product.name}">
                </div>
                <div class="product-card-info">
                    <p class="product-category">${product.category.replace('-', ' ')}</p>
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

        setupPagination(filteredProducts.length);
        addCardEventListeners();
    }

    function setupPagination(totalProducts) {
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        if (totalPages <= 1) return;

        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.textContent = '« Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayProducts();
        });
        paginationControls.appendChild(prevButton);
        
        // Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = i === currentPage ? 'active' : '';
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
            });
            paginationControls.appendChild(pageButton);
        }

        // Next Button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next »';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayProducts();
        });
        paginationControls.appendChild(nextButton);
    }

    function addCardEventListeners() {
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const quantitySpan = e.target.parentElement.querySelector('.quantity');
                let currentQuantity = parseInt(quantitySpan.textContent);

                if (action === 'increase') {
                    currentQuantity++;
                } else if (action === 'decrease' && currentQuantity > 1) {
                    currentQuantity--;
                }
                quantitySpan.textContent = currentQuantity;
            });
        });
    }

    // Event listeners for category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active class
            categoryFilters.forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');

            // Filter
            currentCategory = e.target.dataset.category;
            currentPage = 1; // Reset to first page on new filter
            displayProducts();
        });
    });

    // Initial display
    displayProducts();
});
