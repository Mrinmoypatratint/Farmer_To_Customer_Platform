document.addEventListener('DOMContentLoaded', () => {
    const products = [];
    const orders = [];
    const bargains = [];

    // DOM Elements
    const addProductBtn = document.getElementById('add-product-btn');
    const addProductModal = document.getElementById('add-product-modal');
    const closeAddProductModalBtn = document.querySelector('#add-product-modal .close-btn');
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');
    
    const bargainModal = document.getElementById('bargain-modal');
    const closeBargainModalBtn = document.querySelector('#bargain-modal .close-btn');
    const bargainDetails = document.getElementById('bargain-details');
    const bargainPriceInput = document.getElementById('bargain-price');
    const acceptBargainBtn = document.getElementById('accept-bargain-btn');
    const counterBargainBtn = document.getElementById('counter-bargain-btn');
    const denyBargainBtn = document.getElementById('deny-bargain-btn');
    const bargainList = document.getElementById('bargain-list');
    
    const orderList = document.getElementById('order-list');
    const feedbackList = document.getElementById('feedback-list');

    let currentBargainIndex = null;

    // Event Listeners
    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'flex';
    });

    closeAddProductModalBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    closeBargainModalBtn.addEventListener('click', () => {
        bargainModal.style.display = 'none';
    });

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productStock = parseInt(document.getElementById('product-stock').value);
        const productQuality = document.querySelector('input[name="product-quality"]:checked').value;

        const product = {
            name: productName,
            price: productPrice,
            stock: productStock,
            quality: productQuality,
            status: productStock > 0 ? 'available' : 'out-of-stock',
        };
        
        products.push(product);
        renderProducts();
        addProductForm.reset();
        addProductModal.style.display = 'none';
    });

    acceptBargainBtn.addEventListener('click', () => {
        if (currentBargainIndex !== null) {
            bargains[currentBargainIndex].status = 'accepted';
            renderBargains();
            bargainModal.style.display = 'none';
        }
    });

    counterBargainBtn.addEventListener('click', () => {
        const counterOffer = parseFloat(bargainPriceInput.value);
        if (currentBargainIndex !== null && !isNaN(counterOffer)) {
            bargains[currentBargainIndex].counterOffer = counterOffer;
            bargains[currentBargainIndex].status = 'countered';
            renderBargains();
            bargainModal.style.display = 'none';
        }
    });

    denyBargainBtn.addEventListener('click', () => {
        if (currentBargainIndex !== null) {
            bargains[currentBargainIndex].status = 'denied';
            renderBargains();
            bargainModal.style.display = 'none';
        }
    });

    // Functions
    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price.toFixed(2)}</p>
                <p>Stock: ${product.stock}</p>
                <p class="status ${product.status}">${product.status.replace('-', ' ')}</p>
                <p class="status ${product.quality}">Quality: ${product.quality.charAt(0).toUpperCase() + product.quality.slice(1)}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    function renderBargains() {
        bargainList.innerHTML = '';
        bargains.forEach((bargain, index) => {
            const bargainDiv = document.createElement('div');
            bargainDiv.classList.add('bargain-item');
            bargainDiv.innerHTML = `
                <h3>${bargain.name}</h3>
                <p>Offer Price: ₹${bargain.offer.toFixed(2)}</p>
                <p>Status: ${bargain.status.charAt(0).toUpperCase() + bargain.status.slice(1)}</p>
                <div class="bargain-actions">
                    <button class="accept-btn" data-index="${index}">Accept</button>
                    <button class="counter-btn" data-index="${index}">Counter</button>
                    <button class="deny-btn" data-index="${index}">Deny</button>
                </div>
            `;
            bargainList.appendChild(bargainDiv);
        });

        document.querySelectorAll('.accept-btn').forEach(button => {
            button.addEventListener('click', () => {
                currentBargainIndex = parseInt(button.getAttribute('data-index'));
                acceptBargain();
            });
        });

        document.querySelectorAll('.counter-btn').forEach(button => {
            button.addEventListener('click', () => {
                currentBargainIndex = parseInt(button.getAttribute('data-index'));
                counterBargain();
            });
        });

        document.querySelectorAll('.deny-btn').forEach(button => {
            button.addEventListener('click', () => {
                currentBargainIndex = parseInt(button.getAttribute('data-index'));
                denyBargain();
            });
        });
    }

    function acceptBargain() {
        bargainDetails.textContent = `You have accepted the offer for ${bargains[currentBargainIndex].name} at ₹${bargains[currentBargainIndex].offer.toFixed(2)}.`;
        bargainPriceInput.value = '';
        bargainModal.style.display = 'flex';
    }

    function counterBargain() {
        bargainDetails.textContent = `You can counter the offer for ${bargains[currentBargainIndex].name}.`;
        bargainPriceInput.value = '';
        bargainModal.style.display = 'flex';
    }

    function denyBargain() {
        bargains[currentBargainIndex].status = 'denied';
        renderBargains();
    }

    // Example of adding products and orders manually
    function addExampleData() {
        products.push(
            { name: 'Tomatoes', price: 20, stock: 100, quality: 'best', status: 'available' },
            { name: 'Potatoes', price: 15, stock: 0, quality: 'good', status: 'out-of-stock' },
            { name: 'Carrots', price: 30, stock: 50, quality: 'bad', status: 'available' }
        );

        orders.push(
            { name: 'Tomatoes', quantity: 50, total: 1000, customer: 'John Doe', status: 'pending' },
            { name: 'Potatoes', quantity: 20, total: 300, customer: 'Jane Smith', status: 'completed' }
        );

        bargains.push(
            { name: 'Tomatoes', offer: 18, status: 'pending' },
            { name: 'Carrots', offer: 25, status: 'pending' }
        );

        renderProducts();
        renderBargains();
    }

    addExampleData();
});
const feedbackList = document.getElementById('feedback-list');
let feedbacks = [];

// Function to add feedback
function addFeedback(feedbackText) {
    const feedback = {
        id: Date.now(),
        text: feedbackText
    };

    feedbacks.push(feedback);
    displayFeedback();
}

// Display feedback
function displayFeedback() {
    feedbackList.innerHTML = '';

    feedbacks.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';

        feedbackItem.innerHTML = `
            <p>${feedback.text}</p>
        `;

        feedbackList.appendChild(feedbackItem);
    });
}
addFeedback('Great quality and fast delivery!');


