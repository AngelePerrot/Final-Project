<script setup>
import { ref, computed } from 'vue'

// Gift List
const giftList = ref([
  { name: 'Gift Angele', quantity: 1, bought: false },
  { name: 'Gift Ana', quantity: 1, bought: false },
  { name: 'Gift Ionela', quantity: 1, bought: false },
  { name: 'Gift Raneem', quantity: 1, bought: false },
  { name: 'Gift Elise', quantity: 1, bought: false },
])

// Ingredients List
const ingredientsList = ref([
  { name: 'Turkey', quantity: 1, bought: false },
  { name: 'Ham', quantity: 1, bought: false },
  { name: 'Potatoes (Kg)', quantity: 2, bought: false },
  { name: 'Chocolate', quantity: 4, bought: false },
  { name: 'Spices (cinnamon, nutmeg, rosemary)', quantity: 1, bought: false },
])

// Drink List
const drinkList = ref([
  { name: 'Red Wine', quantity: 2, bought: false },
  { name: 'White Wine', quantity: 2, bought: false },
  { name: 'Eggnog', quantity: 1, bought: false },
  { name: 'Sparkling Water', quantity: 4, bought: false },
  { name: 'Hot chocolate mix', quantity: 4, bought: false },
])

const newGiftItem = ref('')
const newIngredientItem = ref('')
const newDrinkItem = ref('')
const currentPage = ref('gift') // Start with Gift list

const newItem = computed({
  get() {
    if (currentPage.value === 'gift') {
      return newGiftItem.value
    } else if (currentPage.value === 'ingredients') {
      return newIngredientItem.value
    } else {
      return newDrinkItem.value
    }
  },
  set(value) {
    if (currentPage.value === 'gift') {
      newGiftItem.value = value
    } else if (currentPage.value === 'ingredients') {
      newIngredientItem.value = value
    } else {
      newDrinkItem.value = value
    }
  },
})

function toggleBought(item) {
  item.bought = !item.bought
}

function addItem(type) {
  if (type === 'gift' && newGiftItem.value) {
    giftList.value.push({ name: newGiftItem.value, quantity: 1, bought: false })
    newGiftItem.value = ''
  } else if (type === 'ingredients' && newIngredientItem.value) {
    ingredientsList.value.push({
      name: newIngredientItem.value,
      quantity: 1,
      bought: false,
    })
    newIngredientItem.value = ''
  } else if (type === 'drink' && newDrinkItem.value) {
    drinkList.value.push({
      name: newDrinkItem.value,
      quantity: 1,
      bought: false,
    })
    newDrinkItem.value = ''
  }
}

function removeItem(item, type) {
  if (type === 'gift') {
    giftList.value = giftList.value.filter(i => i !== item)
  } else if (type === 'ingredients') {
    ingredientsList.value = ingredientsList.value.filter(i => i !== item)
  } else if (type === 'drink') {
    drinkList.value = drinkList.value.filter(i => i !== item)
  }
}

function incrementQuantity(item) {
  item.quantity += 1
}

function togglePage() {
  if (currentPage.value === 'gift') {
    currentPage.value = 'ingredients'
  } else if (currentPage.value === 'ingredients') {
    currentPage.value = 'drink'
  } else {
    currentPage.value = 'gift'
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
          This magical list is your go-to guide for holiday gifts, scrumptious
          groceries, and delightful drinks. Let’s make this season unforgettable
          and ensure we don’t miss a thing!
        </p>
      </div>

      <!-- Right Side: Shopping List with Scrollable Feature -->
      <div class="lists">
        <div class="list-box">
          <h2 style="text-align: center">
            {{
              currentPage === 'gift'
                ? 'Gift List'
                : currentPage === 'ingredients'
                  ? 'Ingredients'
                  : 'Drinks'
            }}
          </h2>

          <!-- Display Gift, Food or Drink List with Scrollable Container -->
          <div class="scrollable-list">
            <ul v-if="currentPage === 'gift'">
              <li
                v-for="(item, index) in giftList"
                :key="index"
                :class="{ bought: item.bought }"
              >
                <div class="quantity-display">{{ item.quantity }}</div>
                <span @click="toggleBought(item)" class="item-name">{{
                  item.name
                }}</span>
                <div class="action-icons">
                  <button @click="incrementQuantity(item)" class="icon-button">
                    <i class="bi bi-plus"></i>
                  </button>
                  <button
                    @click="removeItem(item, 'gift')"
                    class="remove-button"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>

            <ul v-else-if="currentPage === 'ingredients'">
              <li
                v-for="(item, index) in ingredientsList"
                :key="index"
                :class="{ bought: item.bought }"
              >
                <div class="quantity-display">{{ item.quantity }}</div>
                <span @click="toggleBought(item)" class="item-name">{{
                  item.name
                }}</span>
                <div class="action-icons">
                  <button @click="incrementQuantity(item)" class="icon-button">
                    <i class="bi bi-plus"></i>
                  </button>
                  <button
                    @click="removeItem(item, 'ingredients')"
                    class="remove-button"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>

            <ul v-else>
              <li
                v-for="(item, index) in drinkList"
                :key="index"
                :class="{ bought: item.bought }"
              >
                <div class="quantity-display">{{ item.quantity }}</div>
                <span @click="toggleBought(item)" class="item-name">{{
                  item.name
                }}</span>
                <div class="action-icons">
                  <button @click="incrementQuantity(item)" class="icon-button">
                    <i class="bi bi-plus"></i>
                  </button>
                  <button
                    @click="removeItem(item, 'drink')"
                    class="remove-button"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <!-- Input for Adding New Item -->
          <div class="add-item-container">
            <input
              v-model="newItem"
              :placeholder="`Add new ${currentPage} item`"
              class="add-item-input"
            />
            <button @click="addItem(currentPage)" class="icon-button">
              <i class="bi bi-plus-square"></i>
            </button>
          </div>

          <!-- Toggle Button for Pages -->
          <div class="toggle-page-container">
            <button class="toggle-page" @click="togglePage">
              Go to
              {{
                currentPage === 'gift'
                  ? 'Ingredients'
                  : currentPage === 'ingredients'
                    ? 'Drinks'
                    : 'Gifts'
              }}
              Page
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General styles for the shopping list layout */
.shopping-list {
  background-image: url('/src/assets/img/ShoppingListBcg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 50vh; /* Full viewport size would be 100vh or could try with pixels */
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Style for the introduction and actual shopping list */
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin-top: 20px;
}

.intro,
.lists {
  width: 45%;
}

.intro h3 {
  color: #7b0a0a;
  text-align: center;
}

.intro p {
  color: #213c18;
  font-size: 16px;
  text-align: justify;
}

/* Style for the shopping list box */
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

/* Scrollable list with maximum height and scrollbar */
.scrollable-list {
  max-height: 200px; /* Adjust height as needed */
  overflow-y: auto; /* Enables vertical scrolling */
}

.scrollable-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Style for the scrollbar (only for Chrome and Safari) */
.scrollable-list::-webkit-scrollbar {
  width: 6px; /* Makes the scrollbar thinner */
}

/* The draggable part of the scrollbar */
.scrollable-list::-webkit-scrollbar-thumb {
  background-color: #7b0a0a;
  border-radius: 5px;
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

/* Style for adding new products */
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
