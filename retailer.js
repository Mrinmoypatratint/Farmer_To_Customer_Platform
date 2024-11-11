document.addEventListener("DOMContentLoaded", () => {
    // Function to handle displaying modals
    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("visible");
            modal.classList.remove("hidden");
            modal.style.display = "block";
        }
    };
    
    document.addEventListener("DOMContentLoaded", () => {
        const searchBar = document.getElementById("searchBar");
    
        // Event listener for the search input
        searchBar.addEventListener("input", () => {
            const searchTerm = searchBar.value.trim().toLowerCase();
            searchProducts(searchTerm);
        });
    
        // Function to search and filter products
        const searchProducts = (searchTerm) => {
            const products = document.querySelectorAll(".product-item");
    
            products.forEach(product => {
                const productName = product.querySelector("h3").textContent.toLowerCase();
    
                // Check if the product name includes the search term
                if (productName.includes(searchTerm)) {
                    product.style.display = "block"; // Show product if it matches the search
                } else {
                    product.style.display = "none"; // Hide product if it doesn't match
                }
            });
        };
    });
    
    // Function to handle hiding modals
    const hideModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("visible");
            modal.style.display = "none";
        }
    };

    // Function to handle displaying order status modal
    const showOrderStatus = () => {
        showModal("orderModal");
    };

    // Function to handle displaying product info in a modal
    const displayProductInfo = (product) => {
        const productName = product.querySelector("h3").textContent;
        const productPrice = product.querySelector("p:nth-of-type(1)").textContent;
        const productAvailability = product.querySelector("p:nth-of-type(2)").textContent;
        const productMaxQuantity = product.querySelector("p:nth-of-type(3)").textContent;
        const productQuality = product.querySelector("p:nth-of-type(4)").textContent;

        const productInfo = `
            <strong>Product:</strong> ${productName}<br>
            <strong>Price:</strong> ${productPrice}<br>
            <strong>Availability:</strong> ${productAvailability}<br>
            <strong>Maximum Quantity:</strong> ${productMaxQuantity}<br>
            <strong>Quality:</strong> ${productQuality}
        `;
        

        const productInfoModal = document.getElementById("productInfoModal");
        if (productInfoModal) {
            productInfoModal.querySelector(".modal-body").innerHTML = productInfo;
            showModal("productInfoModal");
        }
    };

    // Function to handle counteroffer submission
    const handleCounterOffer = () => {
        const counterOffer = document.getElementById("counterOffer").value;
        if (counterOffer) {
            alert(`Your counteroffer of ₹${counterOffer} has been submitted.`);
            hideModal("negotiateModal");
        } else {
            alert("Please enter a valid counteroffer.");
        }
    };

    // Attach event listeners to product items
    document.querySelectorAll(".product-item").forEach(item => {
        item.addEventListener("click", () => displayProductInfo(item));
    });

    // Attach event listeners to Buy Now buttons
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering product click event
            showOrderStatus();
        });
    });

    // Attach event listeners to modals' close buttons
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", (e) => {
            hideModal(e.target.closest(".modal").id);
        });
    });

    // Handle negotiation modal and counteroffer submission
    document.querySelectorAll(".negotiate").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering product click event
            const product = button.closest(".product-item");
            const currentPrice = product.querySelector("p:nth-of-type(1)").textContent.split(" ")[1];
            document.getElementById("negotiateInfo").textContent = `Current Price: ₹${currentPrice}`;
            showModal("negotiateModal");
        });
    });

    document.getElementById("submitCounterOffer").addEventListener("click", handleCounterOffer);

    // Hide modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            hideModal(e.target.id);
        }
    });
});
