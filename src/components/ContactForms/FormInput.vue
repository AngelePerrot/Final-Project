<script setup>
const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: String,
  placeholder: String,
  error: String,
})

const emit = defineEmits(['update:modelValue'])

const onInput = $event => {
  emit('update:modelValue', $event.target.value)
}
</script>

<template>
  <div class="form-group mb-3">
    <label :for="label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :name="label"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <div v-if="error">
      <small class="text-danger"> {{ error }}</small>
    </div>
  </div>
</template>
