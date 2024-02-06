<template>
  <div class="flex flex-column gap-2 px-2 mb-3 w-full">
    <label>Access for groups</label>
    <Chips v-model="model" placeholder="Enter groups and press enter" separator=" " size="small"></Chips>
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

<style>
.p-chips ul {
  width: 100%;
}
</style>