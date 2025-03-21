async function loadFoodMenu() {
    try {
        const response1 = await fetch(`http://localhost:3000/food_menu`);
        const foodMenu = await response1.json();
        displayMenu(foodMenu);
        const response2 = await fetch(`http://localhost:3000/address`);
        const address = await response2.json();
        const response3 = await fetch('http://localhost:3000/orders');
        const orders = await response3.json();
        displayOrders(address, orders);
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

function displayMenu(items) {
    const products = document.getElementById("allitems");
    products.innerHTML = items.map(item => `
        <tr class="row">
            <td><img src='http://localhost:3000/food_menu/${item.id}' alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td><button onclick="removeItem(${item.id}, this)">Delete</button></td>
        </tr>
    `).join('');
}

async function removeItem(id, button) {
    if (confirm('Are you sure you want to delete this item?')) {
        const response = await fetch(`http://localhost:3000/food_menu/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (response.ok) {
            const row = button.closest('.row');
            row.remove();
            alert(data.message);
        } else {
            alert('Error deleting item: ' + data.message);
        }
    }
}

function showDiv(classname) {
    document.querySelectorAll('.box1, .box2, .box3').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelector('.' + classname).style.display = 'block';
}

const categorySelect = document.getElementById("category");
const typeSelect = document.getElementById("type");
const productTypes = {
    breakfast: ["Pancake", "Waffle", "Sandwich", "Burger", "Dosa"],
    dinner: ["Pizza", "Soups", "chicken 65", "Pasta", "Chapathi"],
    lunch: ["Biriyani", "Salads", "Grill", "Noodles", "Meals"],
    dessert: ["Cake", "Ice Cream", "Brownie", "Doughnut", "Chocolate"],
    beverage: ["Tea", "Juice", "Coffee", "Lassi", "Soda"]
  };

categorySelect.addEventListener("change", () => {
    typeSelect.innerHTML = '<option value="">Select Type</option>';
    productTypes[categorySelect.value]?.forEach(type => {
        typeSelect.add(new Option(type, type));
    });
});

async function displayOrders(addresses, orders) {
    const orderPage = document.querySelector('.orderpage');
    orderPage.innerHTML = orders.map((order, index) => {
        const userAddress = addresses[index];
        return `
                <div class="order" data-order-id="${order.id}">
                    <img src="/images/order.jpeg" alt="image" width="50%">
                    <div>
                        <p>${order.items}</p>
                        <address>
                            <h5>${userAddress.fname} ${userAddress.lname}</h5>
                            <p>${userAddress.street}<br>
                            ${userAddress.city}, ${userAddress.state} ${userAddress.zipcode}</p>
                            <p>${userAddress.pnumber}</p>
                        </address>
                    </div>
                    <p>Item: ${order.total_quantity}</p>
                    <span>$${order.total_price}</span>
                    <select name="process" class="process-select" id="process" data-order-id="${order.id}">
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Food Processing</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="out_of_order" ${order.status === 'out_of_order' ? 'selected' : ''}>Out of Order</option>
                    </select>
                </div>
            `;
    }).join('');

    const selects = document.querySelectorAll('.process-select');
    selects.forEach(select => {
        select.addEventListener('change', async (event) => {
            const orderId = event.target.dataset.orderId;
            const newStatus = event.target.value;
            try {
                const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (response.ok) {
                    alert(`Order ${orderId} status updated to ${newStatus}`);
                } else {
                    alert(`Failed to update order ${orderId}`);
                }
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        });
    });
}

loadFoodMenu();
