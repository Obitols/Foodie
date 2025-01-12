let foodMenu = [];

async function loadFoodMenu() {
    try {
        const response = await fetch('http://localhost:3000/api/food_menu');
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
            const response = await fetch(`http://localhost:3000/api/food_menu/${id}`, { method: 'DELETE' });
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

    const productForm = document.getElementById("productForm");
    const categorySelect = document.getElementById("category");
    const typeSelect = document.getElementById("type");

    const productTypes = {
        salad1: ["Caesar", "Greek", "Garden"],
        salad2: ["Fruit", "Pasta", "Potato"],
        salad3: ["Chicken", "Shrimp", "Vegan"],
    };

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        typeSelect.innerHTML = '<option value="">Select Type</option>';

        if (productTypes[selectedCategory]) {
            productTypes[selectedCategory].forEach(type => {
                const option = document.createElement("option");
                option.value = type;
                option.textContent = type;
                typeSelect.appendChild(option);
            });
        }
    });

    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(productForm);
        const productName = formData.get("productName").trim();
        const productTitle = formData.get("productTitle").trim();
        const category = formData.get("category");
        const type = formData.get("type");
        const price = formData.get("price");
        const image = formData.get("image");

        if (!productName || !productTitle || !category || !type || !price || isNaN(price)) {
            alert("Please fill all fields correctly.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert("Product added successfully!");
                productForm.reset();
                categorySelect.dispatchEvent(new Event("change"));
            } else {
                const error = await response.json();
                alert("Error adding product: " + error.message);
            }
        } catch (error) {
            alert("Failed to add product. Please try again.");
        }
    });


loadFoodMenu();
