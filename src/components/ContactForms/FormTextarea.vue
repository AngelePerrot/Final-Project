<script setup>
const { modelValue, label, placeholder, rows, error } = defineProps([
  'modelValue',
  'label',
  'placeholder',
  'rows',
  'error',
])

const emit = defineEmits(['update:modelValue'])

const updateValue = $event => {
  emit('update:modelValue', $event.target.value)
}
</script>

<template>
  <div class="form-group mb-3">
    <label :for="label">{{ label }}</label>
    <textarea
      class="form-control"
      :class="{ 'is-invalid': error }"
      :name="label"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      :rows="rows"
    ></textarea>

    <div v-if="error">
      <small class="text-danger">{{ error }}</small>
    </div>
  </div>
</template>
