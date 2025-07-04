const foodCalories = {
  rice: 130,
  soymilk: 50,
  dutchmilk: 126,
  egg: 170,
  sandwich: 13,
  tomato: 20,
  vegetable: 430,
};

function changeQuantity(foodId, change) {
  const input = document.getElementById(foodId);
  const newValue = Math.max(0, parseInt(input.value) + change);
  input.value = newValue;
  updateTotal();
}

function updateTotal() {
  let total = 0;

  for (const [foodId, caloriesPerUnit] of Object.entries(foodCalories)) {
    const quantity = parseInt(document.getElementById(foodId).value) || 0;
    const itemTotal = quantity * caloriesPerUnit;
    total += itemTotal;

    document.getElementById(foodId + "-total").textContent =
      itemTotal + " calo";
  }

  document.getElementById("total-calories").textContent = total;

  // Thêm hiệu ứng khi tổng calories thay đổi
  const totalElement = document.getElementById("total-calories");
  totalElement.style.transform = "scale(1.1)";
  setTimeout(() => {
    totalElement.style.transform = "scale(1)";
  }, 200);
}

function resetAll() {
  for (const foodId of Object.keys(foodCalories)) {
    document.getElementById(foodId).value = 0;
  }
  updateTotal();
}
function addNewFood() {
  const name = document.getElementById("newFoodName").value.trim();
  const calories = parseInt(document.getElementById("newFoodCalories").value);
  const unit = document.getElementById("newFoodUnit").value.trim();

  if (!name || isNaN(calories) || !unit) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  const id = name.toLowerCase().replace(/\s+/g, "_");

  if (foodCalories[id]) {
    alert("Thực phẩm đã tồn tại.");
    return;
  }

  const newItem = {
    id,
    name,
    calories,
    unit,
  };

  // Lưu vào LocalStorage
  const savedFoods = JSON.parse(localStorage.getItem("customFoods")) || [];
  savedFoods.push(newItem);
  localStorage.setItem("customFoods", JSON.stringify(savedFoods));

  // Cập nhật UI và dữ liệu
  renderFoodItem(newItem);
  document.getElementById("newFoodName").value = "";
  document.getElementById("newFoodCalories").value = "";
  document.getElementById("newFoodUnit").value = "";
}
function renderFoodItem({ id, name, calories, unit }) {
  foodCalories[id] = calories;

  const container = document.querySelector(".food-grid");

  const newItem = document.createElement("div");
  newItem.className = "food-item";
  newItem.innerHTML = `
        <div class="food-name">${name}</div>
        <div class="food-calories">${calories} calo/${unit}</div>
        <div class="quantity-control">
            <button class="quantity-btn" onclick="changeQuantity('${id}', -1)">-</button>
            <input type="number" class="quantity-input" id="${id}" value="0" min="0" onchange="updateTotal()">
            <button class="quantity-btn" onclick="changeQuantity('${id}', 1)">+</button>
            <span style="margin-left: 10px;">${unit}</span>
        </div>
        <div class="item-total" id="${id}-total">0 calo</div>
    `;

  container.appendChild(newItem);

  // Đăng ký sự kiện cập nhật
  document.getElementById(id).addEventListener("input", updateTotal);
}

// Thêm event listener cho tất cả các input
document.addEventListener("DOMContentLoaded", function () {
  for (const foodId of Object.keys(foodCalories)) {
    const input = document.getElementById(foodId);
    input.addEventListener("input", updateTotal);
  }
  // Tải thực phẩm tuỳ chỉnh từ localStorage và hiển thị
  const savedFoods = JSON.parse(localStorage.getItem("customFoods")) || [];
  savedFoods.forEach(renderFoodItem);
});
