<template>
  <div class="flex flex-column gap-2 px-2 mb-3 w-full">
    <label>Entity name</label>
    <InputText v-model="model" placeholder="Enter entity name" size="small"></InputText>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import {defineExpose, defineModel, ref} from "vue";

const model = defineModel();
const errors = ref([]);
function validate() {
  if (!!model.value === false) {
    errors.value.push('Error: name is empty');
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