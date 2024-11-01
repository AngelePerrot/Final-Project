<script setup>
import { ref, computed } from 'vue';

const foodList = ref([
    { name: "Turkey", quantity: 1, bought: false },
    { name: "Ham", quantity: 1, bought: false },
    { name: "Potatoes (Kg)", quantity: 2, bought: false },
    { name: "Chocolate", quantity: 4, bought: false },
    { name: "Spices (cinammon, nutmeg, rosemary)", quantity: 1, bought: false },
]);

const drinkList = ref([
    { name: "Red Wine", quantity: 2, bought: false },
    { name: "White Wine", quantity: 2, bought: false },
    { name: "Eggnog", quantity: 1, bought: false },
    { name: "Sparkling Water", quantity: 4, bought: false },
    { name: "Hot chocolate mix", quantity: 4, bought: false },
]);

const newFoodItem = ref('');
const newDrinkItem = ref('');
const currentPage = ref('food');

const newItem = computed({
    get() {
        return currentPage.value === 'food' ? newFoodItem.value : newDrinkItem.value;
    },
    set(value) {
        if (currentPage.value === 'food') {
            newFoodItem.value = value;
        } else {
            newDrinkItem.value = value;
        }
    }
});

function toggleBought(item) {
    item.bought = !item.bought;
}

function addItem(type) {
    if (type === 'food' && newFoodItem.value) {
        foodList.value.push({ name: newFoodItem.value, quantity: 1, bought: false });
        newFoodItem.value = '';
    } else if (type === 'drink' && newDrinkItem.value) {
        drinkList.value.push({ name: newDrinkItem.value, quantity: 1, bought: false });
        newDrinkItem.value = '';
    }
}

function removeItem(item, type) {
    if (type === 'food') {
        foodList.value = foodList.value.filter(i => i !== item);
    } else if (type === 'drink') {
        drinkList.value = drinkList.value.filter(i => i !== item);
    }
}

function incrementQuantity(item) {
    item.quantity += 1;
}

function togglePage() {
    currentPage.value = currentPage.value === 'food' ? 'drink' : 'food';
}
</script>

<template>
    <div class="shopping-list">

        <div class="content">
            <!-- Left Side: Introduction -->
            <div class="intro">
                <h2>Christmas Culinary Essentials</h2>
                <p>
                    This grocery list is your go-to guide for holiday essentials. Every family member can contribute to
                    making this season special. Let's ensure nothing is missed!
                </p>
            </div>

            <!-- Right Side: Shopping List in a Box with Page Toggle -->
            <div class="lists">
                <div class="list-box">
                    <h2 style="text-align: center;">{{ currentPage === 'food' ? 'Ingredients' : 'Drinks' }}</h2>

                    <!-- Display Food or Drink List Based on Current Page -->
                    <ul v-if="currentPage === 'food'">
                        <li v-for="(item, index) in foodList" :key="index" :class="{ bought: item.bought }">
                            <div class="quantity-display">{{ item.quantity }}</div>
                            <span @click="toggleBought(item)" class="item-name">
                                {{ item.name }}
                            </span>
                            <div class="action-icons">
                                <button @click="incrementQuantity(item)" class="icon-button">
                                    <i class="bi bi-plus"></i>
                                </button>
                                <button @click="removeItem(item, 'food')" class="remove-button">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <ul v-else>
                        <li v-for="(item, index) in drinkList" :key="index" :class="{ bought: item.bought }">
                            <div class="quantity-display">{{ item.quantity }}</div>
                            <span @click="toggleBought(item)" class="item-name">
                                {{ item.name }}
                            </span>
                            <div class="action-icons">
                                <button @click="incrementQuantity(item)" class="icon-button">
                                    <i class="bi bi-plus"></i>
                                </button>
                                <button @click="removeItem(item, 'drink')" class="remove-button">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </li>
                    </ul>

                    <!-- Input for Adding New Item -->
                    <div class="add-item-container">
                        <input v-model="newItem" :placeholder="`Add new ${currentPage} item`" class="add-item-input" />
                        <button @click="addItem(currentPage)" class="icon-button">
                            <i class="bi bi-plus-square"></i>
                        </button>
                    </div>

                    <!-- Toggle Button for Pages -->
                    <div class="toggle-page-container">
                        <button class="toggle-page" @click="togglePage">
                            Go to {{ currentPage === 'food' ? 'Drinks' : 'Food' }} Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Style for entire ShoppingList page*/
.shopping-list {
    background-image: url('/src/assets/img/ShoppingListBcg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 50vh;
    /* Full viewport height would be 100vh */
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

/* Style for the introduction and actual shopping list */
.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%; /* Originally was set to 80% */
    margin-top: 20px;
}

.intro,
.lists {
    width: 45%;
}

.intro h2 {
    color: #7b0a0a;
    text-align: center;
}

.intro p {
    color: #213c18;
    font-size: 16px;
    text-align: justify;
}

/* Style for the shopping list box*/
.list-box {
    background-image: url('/src/assets/img/PaperBcg.jpg');
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.list-box h2 {
    color: #7b0a0a;
    font-size: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.bought .item-name {
    text-decoration: line-through;
    color: #668c6f;
}

.quantity-display {
    font-size: 14px;
    color: #668c6f;
    border-bottom: 1px solid #7b0a0a;
    margin-right: 10px;
    padding-bottom: 2px;
    min-width: 20px;
    text-align: center;
}

.item-name {
    flex-grow: 1;
    color: #213c18;
}

.action-icons {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Style for add buttons */
.icon-button {
    background: none;
    border: none;
    color: #668c6f;
    cursor: pointer;
    font-size: 18px;
}

.icon-button:hover {
    color: #213c18;
}

/* Style for remove buttons */
.remove-button {
    background: none;
    border: none;
    color: #7b0a0a;
    cursor: pointer;
    font-size: 18px;
}

.remove-button:hover {
    color: #9e1212;
}

.add-item-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.add-item-input {
    padding: 5px;
    font-size: 14px;
    color: #213c18;
    width: 70%;
    margin-right: 10px;
}

/* Style to change from Food list to Drinks list */
.toggle-page {
    margin-top: 20px;
    background-color: #7b0a0a;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.toggle-page:hover {
    background-color: #9e1212;
}

/* Style to center the toggle page button */
.toggle-page-container {
  display: flex;
  justify-content: center;
}
</style>