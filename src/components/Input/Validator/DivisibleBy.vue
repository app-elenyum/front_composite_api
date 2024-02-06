<template >
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label >Divisible</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter divisible by" type="number" v-model="model"/>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import {defineExpose, defineModel, ref} from "vue";

const model = defineModel();

const errors = ref([]);
function validate()
{
  if (!!model.value === false) {
    errors.value.push('Error: divisible is empty');
    return false
  }
  return true;
}

function validateClear()
{
  errors.value = [];
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