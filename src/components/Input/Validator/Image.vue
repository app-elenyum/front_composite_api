<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Min width</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter min width" type="number"
           v-model="minWidth"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Max width</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter max width" type="number"
           v-model="maxWidth"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Min height</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter min height" type="number"
           v-model="minHeight"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Max height</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter max height" type="number"
           v-model="maxHeight"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Min pixels</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter min pixels" type="number"
           v-model="minPixels"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Min ratio</label>
    <input class="p-inputtext p-component p-inputtext-sm" placeholder="Enter min ratio" type="number"
           v-model="minRatio"/>
  </div>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Mime types</label>
    <Chips separator=" " placeholder="Enter mime types" v-model="mimeTypes"></Chips>
  </div>

  <div class="flex align-items-center p-2 mt-3 mb-3">
    <Checkbox v-model="allowLandscape" inputId="allowLandscape" name="allowLandscape" value="true" />
    <label for="allowLandscape" class="ml-2">Allow landscape</label>
  </div>
  <div class="flex align-items-center p-2 mt-3 mb-3">
    <Checkbox v-model="allowPortrait" inputId="allowPortrait" name="allowPortrait" value="true" />
    <label for="allowPortrait" class="ml-2">Allow portrait</label>
  </div>
  <div class="flex align-items-center p-2 mt-3 mb-3">
    <Checkbox v-model="allowSquare" inputId="allowSquare" name="allowSquare" value="true" />
    <label for="allowSquare" class="ml-2">Allow square</label>
  </div>
  <div class="flex align-items-center p-2 mt-3 mb-3">
    <Checkbox v-model="detectCorrupted" inputId="detectCorrupted" name="detectCorrupted" value="true" />
    <label for="detectCorrupted" class="ml-2">Detect corrupted</label>
  </div>
  <div class="flex align-items-center p-2 mt-3 mb-3">
    <Checkbox v-model="detectCorrupted" inputId="detectCorrupted" name="detectCorrupted" value="true" />
    <label for="detectCorrupted" class="ml-2">Detect corrupted</label>
  </div>
</template>

<script setup>
import Chips from 'primevue/chips';
import Checkbox from 'primevue/checkbox';
import {defineModel, ref} from "vue";

const model = defineModel();

const minWidth = ref(model.value?.minWidth);
const maxWidth = ref(model.value?.maxWidth);
const minHeight = ref(model.value?.minHeight);
const maxHeight = ref(model.value?.maxHeight);
const minPixels = ref(model.value?.minPixels);
const minRatio = ref(model.value?.minRatio);
const allowLandscape = ref(model.value?.allowLandscape);
const allowPortrait = ref(model.value?.allowPortrait);
const allowSquare = ref(model.value?.allowSquare);
const detectCorrupted = ref(model.value?.detectCorrupted);
const mimeTypes = ref(model.value?.mimeTypes);

model.value = {
  minWidth: 'minWidth',
  maxWidth: 'maxWidth',
  minHeight: 'minHeight',
  maxHeight: 'maxHeight',
  minPixels: 'minPixels',
  minRatio: 'minRatio',
  allowLandscape: 'allowLandscape',
  allowPortrait: 'allowPortrait',
  allowSquare: 'allowSquare',
  detectCorrupted: 'detectCorrupted',
  mimeTypes: 'mimeTypes',
}
</script>

<style>
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
