// --- THEME LOGIC ---

function initTheme() {
    let savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcon();
}

function toggleTheme() {
    let isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('siteTheme', 'light');
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('siteTheme', 'dark');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    let themeIcon = document.getElementById("themeIcon");
    if (!themeIcon) return;

    let isDark = document.body.classList.contains('dark-theme');
    if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Update Navbar Background on Scroll inside index.html or standalone pages
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar-standard");
    if (navbar) {
        if (window.scrollY > 0) {
            navbar.style.backgroundColor = document.body.classList.contains('dark-theme') ? "rgba(18, 18, 18, 0.95)" : "rgba(0, 0, 0, 0.95)";
        } else {
            navbar.style.backgroundColor = document.body.classList.contains('dark-theme') ? "rgba(18, 18, 18, 0.8)" : "rgba(0, 0, 0, 0.4)";
        }
    }
});

// --- SUB-MENU LOGIC ---

const menuData = {
    "Burger": [
        { name: "Classic Chicken Burger", price: 399 },
        { name: "Spicy Paneer Burger", price: 299 },
        { name: "Double Cheese Beef Burger", price: 499 }
    ],
    "Pasta": [
        { name: "White Sauce Alfredo", price: 349 },
        { name: "Red Sauce Arrabbiata", price: 299 },
        { name: "Mixed Herb Macaroni", price: 399 }
    ],
    "Lasagna": [
        { name: "Chicken Lasagna", price: 499 },
        { name: "Three-Cheese Veg Lasagna", price: 449 }
    ],
    "Drink": [
        { name: "Chocolate Milkshake", price: 199 },
        { name: "Strawberry Shake", price: 199 },
        { name: "Fresh Lime Soda", price: 99 },
        { name: "Iced Caramel Macchiato", price: 249 }
    ],
    "Pizza": [
        { name: "Margherita Pizza", price: 399 },
        { name: "Pepperoni Pizza", price: 549 },
        { name: "Farmhouse Veg Pizza", price: 499 }
    ],
    "Hot Dog": [
        { name: "Classic Chicken Hot Dog", price: 299 },
        { name: "Chili Cheese Hot Dog", price: 349 }
    ],
    "Juice": [
        { name: "Fresh Orange Juice", price: 149 },
        { name: "Watermelon Juice", price: 129 },
        { name: "Mixed Fruit Juice", price: 199 }
    ],
    "Biryani": [
        { name: "Chicken Dum Biryani", price: 399 },
        { name: "Mutton Special Biryani", price: 599 },
        { name: "Paneer Tikka Biryani", price: 349 },
        { name: "Egg Biryani", price: 299 }
    ],
    "Chocolate": [
        { name: "Dark Chocolate Truffle", price: 149 },
        { name: "Milk Chocolate Bar", price: 99 },
        { name: "White Chocolate Almonds", price: 199 }
    ],
    "Ice Cream": [
        { name: "Vanilla Bean Scoop", price: 99 },
        { name: "Belgian Chocolate Scoop", price: 149 },
        { name: "Strawberry Swirl", price: 129 }
    ],
    "Spanchi": [
        { name: "Butter Spanchi", price: 199 },
        { name: "Garlic Herb Spanchi", price: 249 }
    ],
    "Sandwich": [
        { name: "Grilled Club Sandwich", price: 299 },
        { name: "Veg Cheese Sandwich", price: 199 },
        { name: "Chicken Tikka Sandwich", price: 349 }
    ]
};

function showSubMenu(category) {
    const subItems = menuData[category];
    if (!subItems) return; // Fallback if not found

    const modal = document.getElementById("subMenuModal");
    const container = document.getElementById("subMenuContainer");

    // Clear previous
    container.innerHTML = "";

    // Set Title
    document.getElementById("subMenuTitle").textContent = `Choose your ${category}`;

    // Generate Buttons
    subItems.forEach(item => {
        const itemBtn = document.createElement("div");
        itemBtn.style.display = "flex";
        itemBtn.style.justifyContent = "space-between";
        itemBtn.style.alignItems = "center";
        itemBtn.style.padding = "10px 15px";
        itemBtn.style.borderBottom = "1px solid #ccc";

        itemBtn.innerHTML = `
            <span style="font-size: 16px; font-weight: bold;">${item.name}</span>
            <div style="display: flex; gap: 15px; align-items: center;">
                <span style="color: #fac031; font-weight: bold; font-size: 16px;">${item.price} Rs</span>
                <button onclick="addToCartAndClose('${item.name}', ${item.price})" style="background-color: #fac031; color: white; padding: 5px 15px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.3s;">Add</button>
            </div>
        `;
        container.appendChild(itemBtn);
    });

    modal.style.display = "flex";
}

function closeSubMenu() {
    const modal = document.getElementById("subMenuModal");
    modal.style.display = "none";
}

function addToCartAndClose(itemName, itemPrice) {
    addToCart(itemName, itemPrice);
    closeSubMenu();
}

// --- CART LOGIC ---

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartBadge();
}

// Update Cart Badge globally
function updateCartBadge() {
    let cart = getCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let badge = document.getElementById("cartBadge");
    if (badge) {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Ensure badge and theme updates on page load
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateCartBadge();
});

// Add item to cart
function addToCart(itemName, itemPrice) {
    let cart = getCart();

    // Check if item already exists in cart
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: parseInt(itemPrice), quantity: 1 });
    }

    saveCart(cart);
    alert(`${itemName} added to your cart!`);
}

// Remove item from cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart(); // Re-render the cart page
}

// Change quantity in cart
function changeQuantity(index, delta) {
    let cart = getCart();
    if (cart[index].quantity + delta > 0) {
        cart[index].quantity += delta;
        saveCart(cart);
        renderCart();
    }
}

// Render Cart on cart.html
function renderCart() {
    const isCartPage = window.location.pathname.includes("cart.html");
    if (!isCartPage) return;

    const cart = getCart();
    const container = document.getElementById('cartItemsContainer');
    const summary = document.getElementById('cartSummary');
    const emptyMsg = document.getElementById('emptyCartMessage');
    const totalDisplay = document.getElementById('cartTotalDisplay');

    if (cart.length === 0) {
        container.style.display = 'none';
        summary.style.display = 'none';
        emptyMsg.style.display = 'block';
        return;
    }

    container.style.display = 'block';
    summary.style.display = 'block';
    emptyMsg.style.display = 'none';

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd; padding: 15px 0;">
                <div style="flex: 2;">
                    <h3 style="margin: 0;">${item.name}</h3>
                    <p style="margin: 5px 0 0 0; color: #666;">${item.price} Rs each</p>
                </div>
                <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <button onclick="changeQuantity(${index}, -1)" style="padding: 5px 10px; cursor: pointer; background: #ddd; border: none; border-radius: 3px;">-</button>
                    <span style="font-weight: bold; font-size: 18px;">${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)" style="padding: 5px 10px; cursor: pointer; background: #ddd; border: none; border-radius: 3px;">+</button>
                </div>
                <div style="flex: 1; text-align: right;">
                    <p style="font-weight: bold; margin: 0;">${itemTotal} Rs</p>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: red; cursor: pointer; margin-top: 5px; text-decoration: underline;">Remove</button>
                </div>
            </div>
        `;
    });

    totalDisplay.textContent = total;
}

// Initialize on load
document.addEventListener("DOMContentLoaded", renderCart);


// --- ORDER PAGE LOGIC ---

// Load cart data into the order page
document.addEventListener("DOMContentLoaded", () => {
    const isOrderPage = window.location.pathname.includes("order.html");
    if (!isOrderPage) return;

    const cart = getCart();
    const tableBody = document.getElementById("orderTableBody");
    const totalDisplay = document.getElementById("orderTableTotal");
    const totalInput = document.getElementById("totalAmountInput");

    if (cart.length > 0) {
        let itemsHtml = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsHtml += `
                <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 10px 5px; font-weight: bold;">${item.name}</td>
                    <td style="padding: 10px 5px; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px 5px; text-align: right; color: #666;">${itemTotal} Rs</td>
                </tr>
            `;
        });

        tableBody.innerHTML = itemsHtml;
        totalDisplay.textContent = total;
        totalInput.value = total;
    } else {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 20px;">Cart is empty</td></tr>';
        totalDisplay.textContent = "0";
        totalInput.value = "0";
        alert("Your cart is empty. Please add items from the menu first!");
        window.location.href = "menu.html";
    }
});

// Process mock payment
function processPayment(e) {
    e.preventDefault();

    // Total computation
    const totalAmount = document.getElementById("totalAmountInput").value;
    const cart = getCart();

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let itemsHtml = cart.map(item => `<li>${item.quantity}x ${item.name}</li>`).join('');

    // Hide form, show receipt
    document.getElementById("orderFormContainer").style.display = "none";

    document.getElementById("rItem").innerHTML = `<ul style="margin: 0; padding-left: 20px;">${itemsHtml}</ul>`;
    document.getElementById("rQty").textContent = cart.reduce((sum, item) => sum + item.quantity, 0) + " items total";
    document.getElementById("rTotal").textContent = totalAmount;

    document.getElementById("receiptContainer").style.display = "block";

    // Clear cart after successful payment
    saveCart([]);
}
