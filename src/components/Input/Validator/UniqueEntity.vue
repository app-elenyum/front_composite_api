<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Fields</label>
    <Chips separator=" " placeholder="Enter fields" v-model="model"></Chips>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import Chips from 'primevue/chips';
import {defineExpose, defineModel, ref} from "vue";

const model = defineModel();

const errors = ref([]);
function validate() {
  if (!!model.value === false) {
    errors.value.push('Error: fields is empty');
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
