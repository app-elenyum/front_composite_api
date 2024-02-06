<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Max size </label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter max size" type="number" v-model="maxSize"/>
    <template v-for="error in errors['maxSize']">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Extensions </label>
    <Chips separator=" " placeholder="Enter extensions" v-model="extensions"></Chips>
    <template v-for="error in errors['extensions']">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Mime types </label>
    <Chips separator=" " class="mb-2" placeholder="Enter mime types" v-model="mimeTypes"></Chips>
    <template v-for="error in errors['mimeTypes']">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>

  <div class="flex flex-column p-2 mt-3 mb-3">
    <div class="flex-none w">
      <Checkbox v-model="binaryFormat" inputId="binaryFormat" name="binaryFormat" :binary="true" value="false"/>
      <label for="binaryFormat" class="ml-2"> Binary format </label>
    </div>
    <div class="flex-none mt-2">
      <template v-for="error in errors['binaryFormat']">
        <small class="block p-error">{{ error }}</small>
      </template>
    </div>
  </div>

</template>

<script setup>
import Chips from 'primevue/chips';
import Checkbox from 'primevue/checkbox';
import {defineExpose, defineModel, ref} from "vue";

const model = defineModel();

const maxSize = ref(model.value?.maxSize);
const extensions = ref(model.value?.extensions);
const binaryFormat = ref(model.value?.binaryFormat ?? false);
const mimeTypes = ref(model.value?.mimeTypes);

model.value = {
  maxSize: maxSize,
  extensions: extensions,
  binaryFormat: binaryFormat,
  mimeTypes: mimeTypes
}

const errors = ref({
  maxSize: [],
  extensions: [],
  binaryFormat: [],
  mimeTypes: [],
});
function validate()
{
  // errors.value['maxSize'].push('Hello')
  // errors.value['binaryFormat'].push('Error')
  // console.log(model.value)
  // debugger;
  return true;
}

function validateClear()
{
  errors.value['maxSize'] = [];
  errors.value['extensions'] = [];
  errors.value['binaryFormat'] = [];
  errors.value['mimeTypes'] = [];
}

defineExpose({
  validate,
  validateClear
});
</script>

<style>

</style>
