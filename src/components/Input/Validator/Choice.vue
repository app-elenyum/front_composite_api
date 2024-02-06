<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label >Choices</label>
    <Chips separator=" " placeholder="Enter choices" v-model="model"></Chips>
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
function validate()
{
  if (!!model.value === false) {
    errors.value.push('Error: choices is empty');
    return false
  }
  return true;
}

function validateClear()
{
  errors.value = null;
}

defineExpose({
  validate,
  validateClear
});
</script>

<style>

</style>
