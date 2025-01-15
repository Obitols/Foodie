async function loadFoodMenu() {
    try {
        const response1 = await fetch(`http://localhost:3000/food_menu`);
       const foodMenu = await response1.json();
        displayMenu(foodMenu);
        const response2 = await fetch(`http://localhost:3000/address`);
       const orders = await response2.json();
        displayorders(orders);
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
        breakfast: ["Bread-1", "Bread-2", "Bread-3", "Bread-4", "Bread-5", "Bread-6"],
        dinner: ["Sandwich-1", "Sandwich-2", "Sandwich-3", "Sandwich-4", "Sandwich-5", "Sandwich-6"],
        lunch: ["Burger-1", "Burger-2", "Burger-3", "Burger-4", "Burger-5", "Burger-6"],
        dessert: ["Pasta-1", "Pasta-2", "Pasta-3", "Pasta-4", "Pasta-5", "Pasta-6"],
        beverage: ["Pizza-1", "Pizza-2", "Pizza-3", "Pizza-4", "Pizza-5", "Pizza-6"]
    };

    categorySelect.addEventListener("change", () => {
        typeSelect.innerHTML = '<option value="">Select Type</option>';
        productTypes[categorySelect.value]?.forEach(type => {
            typeSelect.add(new Option(type, type));
        });
    });
    function displayorders(items) {
    const orderpage =document.querySelector('.orderpage');
    orderpage.innerHTML =items.map(item => 
        `<div class="order">
            <img src="/images/bubble.png" alt="">
            <div>
                <p>greek salad x 2, peri peri rolls x 3</p>
                <address>
                    <h5>${item.fname}${item.lname}</h5>
                    <p>${item.street}<br>
                     ${item.city} ${item.state} ${item.zipcode}</p>
                    <p>${item.pnumber}</p>
                </address>
            </div>
            <p>item:2</p>
            <span>$65</span>
            <select name="" id="process">
                <option value="">Food processing</option>
                <option value="">Deliverd</option>
                <option value="">out of order</option>
            </select>
        </div>
    `).join('');
}

loadFoodMenu();
