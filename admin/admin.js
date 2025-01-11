let foodMenu = [];

async function loadFoodMenu() {
    try {
        const response = await fetch('http://localhost:3005/api/food_menu');
        foodMenu = await response.json();
        displayMenu(foodMenu);
    } catch (error) {
        console.error('Error loading menu:', error);
    }
}

function displayMenu(items) {
    const products = document.getElementById("allitems");
    products.innerHTML = items.map(item => `
        <tr class="row">
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td><button onclick="removeItem(${item.id}, this)">Delete</button></td>
        </tr>
    `).join('');
}

async function removeItem(id, button) {
    if (confirm('Are you sure you want to delete this item?')) {
            const response = await fetch(`http://localhost:3005/api/food_menu/${id}`, { method: 'DELETE' });
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

loadFoodMenu();
