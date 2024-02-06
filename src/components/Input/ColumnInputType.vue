<template>
  <div class="flex flex-column gap-2 px-2 mb-3 w-full">
    <label>Column type</label>
    <Dropdown v-model="model" placeholder="Selected column type" :options="options" size="small"></Dropdown>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import {defineExpose, defineModel, ref} from "vue";

const options = [
  "integer",
  "float",
  "text",
  "string"
];

const model = defineModel();
const errors = ref([]);
function validate() {
  if (!!model.value === false) {
    errors.value.push('Error: type is empty');
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