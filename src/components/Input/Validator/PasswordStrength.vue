<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Password strength</label>
    <Dropdown placeholder="Enter password strength" :options="optionsTypePasswordStrength"
              option-label="label" option-value="value" display="chip" v-model="model" size="small"></Dropdown>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import {defineExpose, defineModel, ref} from "vue";
const model = defineModel();
const optionsTypePasswordStrength = ref([
  {
    'value': 1,
    'label': 'WEAK'
  },
  {
    'value': 2,
    'label': 'MEDIUM'
  },
  {
    'value': 3,
    'label': 'STRONG'
  },
  {
    'value': 4,
    'label': 'VERY_STRONG'
  }
]);

const errors = ref([]);
function validate() {
  if (!!model.value === false) {
    errors.value.push('Error: password strength is empty');
    return false
  }
  return true;
}

function validateClear() {
  errors.value = [];
}

defineExpose({
  validate,
  validateClear
});
</script>

<style scoped>
</style>