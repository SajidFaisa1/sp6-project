const modal = document.getElementById('signup-modal');
        const openModalBtn = document.getElementById('open-modal');
        const closeModalBtn = document.getElementById('close-modal');

        openModalBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        // Add event listeners to the buttons
 
// Real-time password match validation
document.getElementById("confirmPassword").addEventListener("input", function() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("password-error");

    if (password !== confirmPassword) {
        errorMessage.style.display = "inline";
    } else {
        errorMessage.style.display = "none";
    }
});

// Prevent form submission if passwords don't match
document.getElementById("signup-form").addEventListener("submit", function(event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        event.preventDefault(); // Prevent form submission
        alert("Passwords do not match!");
    }
});
document.querySelectorAll('.purchase-btn').forEach((button) => {
    button.addEventListener('click', () => {
        alert('Purchase functionality will be implemented!');
        // Add logic here to handle purchasing functionality
    });
});
// Initialize an empty array to hold cart items
const cart = [];

// Select floating cart elements
const floatingCart = document.getElementById('floating-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const hidTotal =document.getElementById('cart-total-input')
const hidcartTotal=document.getElementById('cart-total-items');
// Function to add item to the cart
function addToCart(itemName, itemPrice) {
    // Convert price to number and add the item to the cart array
    const price = parseFloat(itemPrice.replace('৳', '').trim());
    cart.push({ name: itemName, price });

    // Display the floating cart
    floatingCart.style.display = 'block';

    // Update the cart UI
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    // Clear the current list
    cartItemsList.innerHTML = '';

    // Populate the list with cart items
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - ${item.price}৳
            <button class="remove-btn" data-index="${index}">&times;</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const itemIndex = e.target.dataset.index;
            cart.splice(itemIndex, 1); // Remove the item from the cart array
            updateCartUI(); // Refresh the UI
            if (cart.length === 0) {
                floatingCart.style.display = 'none'; // Hide cart if empty
            }
        });
    });

    // Update total price
    updateTotalPrice();
}

// Function to calculate and display total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Total: ${total.toFixed(2)}৳`;
    hidTotal.value = total.toFixed(2);
     
}
 
// Add event listeners to Add to Cart buttons
document.querySelectorAll('.cart-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const flowerItem = button.closest('.flower-item');
        const itemName = flowerItem.querySelector('img').alt;
        const itemPrice = flowerItem.querySelector('.font-medium').textContent.split(':')[1].trim();

        addToCart(itemName, itemPrice);
    });
});
// Login Modal functionality
const loginModal = document.getElementById("login-modal");
const openLoginModalBtn = document.getElementById("open-login-modal");
const closeLoginModalBtn = document.getElementById("close-login-modal");

// Open Login Modal
openLoginModalBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
});

// Close Login Modal
closeLoginModalBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("login.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
            console.log(data); // For debugging
            alert(data); // Show login response
            if (data.includes("success")) {
                loginModal.style.display = "none"; // Close modal on successful login
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred during login.");
        });
});
function fetchUsers() {
    console.log('Fetching users...'); // Check if the function is being called
    fetch('data.php')
        .then((response) => {
            console.log('Response:', response); // Check if the fetch request was successful
            return response.json();
        })
        .then((data) => {
            console.log('Fetched Data:', data); // Log the data here
            const tbody = document.querySelector('#user-table tbody');
            tbody.innerHTML = ''; // Clear the table

            data.forEach((user) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td> <!-- Display password as well -->
                    <td>
                        <button class="edit-btn" data-id="${user.id}" data-username="${user.name}" data-email="${user.email}" data-password="${user.password}">Edit</button>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                document.getElementById('user-table').querySelector('tbody').appendChild(row);
                
            });

            attachActionListeners(); // Attach event listeners for edit and delete buttons
        })
        .catch((error) => console.error('Error fetching users:', error));
}


// Function to delete a user
function deleteUser(userId) {
    fetch('remove_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after deletion
        })
        .catch((error) => console.error('Error deleting user:', error));
}

// Function to attach listeners to edit and delete buttons
// Function to attach listeners to edit and delete buttons
function attachActionListeners() {
    document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            if (confirm('Confirm Delete.')) {
                deleteUser(userId);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            const username = e.target.dataset.name;
            const email = e.target.dataset.email;
            const password = e.target.dataset.password;

            const newUsername = prompt('Edit Username:', username);
            const newEmail = prompt('Edit Email:', email);
            const newPassword = prompt('Edit Password:', password);

            if (newUsername && newEmail && newPassword) {
                updateUser(userId, newUsername, newEmail, newPassword);
            }
        });
    });
}


// Function to update user
// Function to update user
function updateUser(userId, username, email, password) {
    fetch('update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${userId}&name=${username}&email=${email}&password=${password}`
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            fetchUsers(); // Refresh the user table after update
        })
        .catch((error) => console.error('Error updating user:', error));
}


// Fetch users when the page loads
document.addEventListener('DOMContentLoaded', fetchUsers);


 