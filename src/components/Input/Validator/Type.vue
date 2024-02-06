<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Type</label>
    <MultiSelect placeholder="Selected type" :options="optionsType" display="chip" v-model="model"
                 size="small"></MultiSelect>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {defineExpose, defineModel, ref} from "vue";
const model = defineModel();

const optionsType = ref([
  'boolean',
  'integer',
  'long',
  'float',
  'double',
  'real',
  'numeric',
  'string',
  'scalar',
  'array',
  'iterable',
  'countable',
  'callable',
  'object',
  'resource',
  'null',
  'alnum',
  'alpha',
  'cntrl',
  'digit',
  'graph',
  'lower',
  'print',
  'punct',
  'space',
  'upper',
  'xdigit',
  'locale',
]);

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