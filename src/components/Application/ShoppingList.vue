<script setup>
import { ref, computed } from 'vue';
// Gift List
const giftList = ref([
    { name: "Gift Angele", quantity: 1, bought: false },
    { name: "Gift Ana", quantity: 1, bought: false },
    { name: "Gift Ionela", quantity: 1, bought: false },
    { name: "Gift Raneem", quantity: 1, bought: false },
    { name: "Gift Elise", quantity: 1, bought: false },
]);
// Ingredients List
const ingredientsList = ref([
    { name: "Turkey", quantity: 1, bought: false },
    { name: "Ham", quantity: 1, bought: false },
    { name: "Potatoes (Kg)", quantity: 2, bought: false },
    { name: "Chocolate", quantity: 4, bought: false },
    { name: "Spices (cinnamon, nutmeg, rosemary)", quantity: 1, bought: false },
]);
// Drink List
const drinkList = ref([
    { name: "Red Wine", quantity: 2, bought: false },
    { name: "White Wine", quantity: 2, bought: false },
    { name: "Eggnog", quantity: 1, bought: false },
    { name: "Sparkling Water", quantity: 4, bought: false },
    { name: "Hot chocolate mix", quantity: 4, bought: false },
]);
const newGiftItem = ref('');
const newIngredientItem = ref('');
const newDrinkItem = ref('');
const currentPage = ref('gift'); // Start with Gift list
const newItem = computed({
    get() {
        if (currentPage.value === 'gift') {
            return newGiftItem.value;
        } else if (currentPage.value === 'ingredients') {
            return newIngredientItem.value;
        } else {
            return newDrinkItem.value;
        }
    },
    set(value) {
        if (currentPage.value === 'gift') {
            newGiftItem.value = value;
        } else if (currentPage.value === 'ingredients') {
            newIngredientItem.value = value;
        } else {
            newDrinkItem.value = value;
        }
    }
});
function toggleBought(item) {
    item.bought = !item.bought;
}
function addItem(type) {
    if (type === 'gift' && newGiftItem.value) {
        giftList.value.push({ name: newGiftItem.value, quantity: 1, bought: false });
        newGiftItem.value = '';
    } else if (type === 'ingredients' && newIngredientItem.value) {
        ingredientsList.value.push({ name: newIngredientItem.value, quantity: 1, bought: false });
        newIngredientItem.value = '';
    } else if (type === 'drink' && newDrinkItem.value) {
        drinkList.value.push({ name: newDrinkItem.value, quantity: 1, bought: false });
        newDrinkItem.value = '';
    }
}
function removeItem(item, type) {
    if (type === 'gift') {
        giftList.value = giftList.value.filter(i => i !== item);
    } else if (type === 'ingredients') {
        ingredientsList.value = ingredientsList.value.filter(i => i !== item);
    } else if (type === 'drink') {
        drinkList.value = drinkList.value.filter(i => i !== item);
    }
}
function incrementQuantity(item) {
    item.quantity += 1;
}
function togglePage() {
    if (currentPage.value === 'gift') {
        currentPage.value = 'ingredients';
    } else if (currentPage.value === 'ingredients') {
        currentPage.value = 'drink';
    } else {
        currentPage.value = 'gift';
    }
}
</script>
<template>
    <!-- Container for the entire components' content -->
    <div class="shopping-list">
        <div class="content">
            <!-- Left Side: Introduction -->
            <div class="intro">
                <h3>Your Christmas Wish List Awaits!</h3>
                <p>
                    This magical list is your go-to guide for holiday gifts, scrumptious groceries, and delightful drinks. Let’s make this season unforgettable and ensure we don’t miss a thing!
                </p>
            </div>
            <!-- Right Side: Shopping List with Scrollable Feature -->
            <div class="lists">
                <div class="list-box">
                    <h2 style="text-align: center;">{{ currentPage === 'gift' ? 'Gift List' : currentPage === 'ingredients' ?
                        'Ingredients' : 'Drinks' }}</h2>
                        <!-- Display Gift, Food or Drink List with Scrollable Container -->
                    <div class="scrollable-list">
                        <ul v-if="currentPage === 'gift'">
                            <li v-for="(item, index) in giftList" :key="index" :class="{ bought: item.bought }">
                                <div class="quantity-display">{{ item.quantity }}</div>
                                <span @click="toggleBought(item)" class="item-name">{{ item.name }}</span>
                                <div class="action-icons">
                                    <button @click="incrementQuantity(item)" class="icon-button"><i
                                            class="bi bi-plus"></i></button>
                                    <button @click="removeItem(item, 'gift')" class="remove-button"><i
                                            class="bi bi-trash"></i></button>
                                </div>
                            </li>
                        </ul>
                        <ul v-else-if="currentPage === 'ingredients'">
                            <li v-for="(item, index) in ingredientsList" :key="index" :class="{ bought: item.bought }">
                                <div class="quantity-display">{{ item.quantity }}</div>
                                <span @click="toggleBought(item)" class="item-name">{{ item.name }}</span>
                                <div class="action-icons">
                                    <button @click="incrementQuantity(item)" class="icon-button"><i
                                            class="bi bi-plus"></i></button>
                                    <button @click="removeItem(item, 'ingredients')" class="remove-button"><i
                                            class="bi bi-trash"></i></button>
                                </div>
                            </li>
                        </ul>
                        <ul v-else>
                            <li v-for="(item, index) in drinkList" :key="index" :class="{ bought: item.bought }">
                                <div class="quantity-display">{{ item.quantity }}</div>
                                <span @click="toggleBought(item)" class="item-name">{{ item.name }}</span>
                                <div class="action-icons">
                                    <button @click="incrementQuantity(item)" class="icon-button"><i
                                            class="bi bi-plus"></i></button>
                                    <button @click="removeItem(item, 'drink')" class="remove-button"><i
                                            class="bi bi-trash"></i></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- Input for Adding New Item -->
                    <div class="add-item-container">
                        <input v-model="newItem" :placeholder="`Add new ${currentPage} item`" class="add-item-input" />
                        <button @click="addItem(currentPage)" class="icon-button"><i
                                class="bi bi-plus-square"></i></button>
                    </div>
                    <!-- Toggle Button for Pages -->
                    <div class="toggle-page-container">
                        <button class="toggle-page" @click="togglePage">
                            Go to {{ currentPage === 'gift' ? 'Ingredients' : currentPage === 'ingredients' ? 'Drinks' : 'Gifts' }}
                            Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shopping-list {
    background-image: url('/src/assets/img/ShoppingListBcg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 500px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px;
}
/* Style for the introduction and actual shopping list */
.content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 90%;
    max-width: 800px;
    margin-top: 20px;
}
.intro {
    position: relative;
    background-color: rgba(247, 247, 247, 0.85);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 350px;
    margin: 20px auto;
    text-align: center;
}
/* Gradient line styling at the top of the box */
.intro::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #30661E, #5C9C4A, #30661E);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.intro, .lists {
    width: 100%;
    max-width: 350px;
    margin-bottom: 15px;
    text-align: center;
}
.intro h3 {
    color: #7B0A0A;
    font-size: 1.5em;
}
.intro p {
    color: #213C18;
    font-size: 1em;
    line-height: 1.4;
}
/* Style for the shopping list box */
.list-box {
    background-image: url('/src/assets/img/PaperBcg.jpg');
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
}
.list-box h2 {
    color: #7B0A0A;
    font-size: 1.4em;
    text-align: center;
}
.scrollable-list {
    max-height: 200px;
    overflow-y: auto;
}
.scrollable-list::-webkit-scrollbar {
    width: 8px;
    border-radius: 4px;
}
.scrollable-list::-webkit-scrollbar-thumb {
    background-color: #7B0A0A;
    border-radius: 4px;
    border: 1px solid #fff;
}
.scrollable-list::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
.scrollable-list ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
li {
    display: flex;
    align-items: center;
    margin: 8px 0;
}
.bought .item-name {
    text-decoration: line-through;
    color: #668C6F;
}
.quantity-display {
    font-size: 1em;
    color: #668C6F;
    border-bottom: 1px solid #7B0A0A;
    margin-right: 10px;
    min-width: 20px;
    text-align: center;
}
.item-name {
    flex-grow: 1;
    color: #213C18;
}
.action-icons {
    display: flex;
    align-items: center;
    gap: 6px;
}
/* Style for action buttons */
.icon-button, .remove-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
}
.icon-button {
    color: #668C6F;
}
.icon-button:hover {
    color: #213C18;
}
.remove-button {
    color: #7B0A0A;
}
.remove-button:hover {
    color: #9E1212;
}
/* Input for adding items */
.add-item-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.add-item-input {
    padding: 8px;
    font-size: 1em;
    color: #213C18;
    width: 70%;
    margin-right: 10px;
    flex-grow: 1;
}
/* Toggle page button */
.toggle-page {
    margin-top: 15px;
    background-color: #7B0A0A;
    color: white;
    border: none;
    padding: 8px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 5px;
}
.toggle-page:hover {
    background-color: #9E1212;
}
/* Center toggle page button */
.toggle-page-container {
    display: flex;
    justify-content: center;
}
/* For Extra Small Screens (max 480px) */
@media (max-width: 480px) {
    .shopping-list {
        padding: 15px;
    }
    .intro h3 {
        font-size: 1.2em;
    }
    .intro p {
        font-size: 0.9em;
    }
}
/* For Small Screens (481px to 640px) */
@media (max-width: 640px) {
    .content {
        flex-direction: column;
        align-items: center;
    }
    .intro p {
        font-size: 0.95em;
    }
    .add-item-input {
        width: 200px;
    }
}
/* For Medium Screens (641px to 800px) */
@media (max-width: 800px) {
    .content {
        max-width: 500px;
    }
    .intro p {
        font-size: 1em;
    }
    .add-item-input {
        width: 250px;
    }
}
/* For Large Screens (801px to 1024px) */
@media (max-width: 1024px) {
    .content {
        max-width: 700px;
    }
    .intro p {
        font-size: 1.1em;
    }
}
</style>