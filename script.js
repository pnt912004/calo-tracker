const foodCalories = {
    rice: 130,
    soymilk: 50,
    dutchmilk: 126,
    egg: 170,
    sandwich: 13,
    tomato: 20,
    vegetable: 430
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
        
        document.getElementById(foodId + '-total').textContent = itemTotal + ' calo';
    }
    
    document.getElementById('total-calories').textContent = total;
    
    // Thêm hiệu ứng khi tổng calories thay đổi
    const totalElement = document.getElementById('total-calories');
    totalElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        totalElement.style.transform = 'scale(1)';
    }, 200);
}

function resetAll() {
    for (const foodId of Object.keys(foodCalories)) {
        document.getElementById(foodId).value = 0;
    }
    updateTotal();
}

// Thêm event listener cho tất cả các input
document.addEventListener('DOMContentLoaded', function() {
    for (const foodId of Object.keys(foodCalories)) {
        const input = document.getElementById(foodId);
        input.addEventListener('input', updateTotal);
    }
});