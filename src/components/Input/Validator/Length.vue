<template >
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Min</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter min" type="number" v-model="min"/>
    <template v-for="error in errors['min']">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Max</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter max" type="number" v-model="max"/>
    <template v-for="error in errors['max']">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import {defineExpose, defineModel, ref} from "vue";

const model = defineModel();

const min = ref(model.value?.min);
const max = ref(model.value?.max);

model.value = {
  min: min,
  max: max
}

const errors = ref({
  min: [],
  max: []
});

function validate() {
  if (!!min.value === false && !!max.value === false) {
    errors.value.min.push('Error: min is empty (enter min or max)');
    errors.value.max.push('Error: max is empty (enter max or min)');
    return false
  }
  return true;
}

function validateClear() {
  errors.value.min = [];
  errors.value.max = [];
}

defineExpose({
  validate,
  validateClear
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>