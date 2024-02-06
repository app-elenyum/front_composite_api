<template>
  <JsonToFormGenerator :formFields="formFields" v-model="formData" ></JsonToFormGenerator>
</template>

<script setup>
import {ref, reactive} from "vue";
import JsonToFormGenerator from "@/components/JsonToFormGenerator.vue";
let formData = reactive({});

let formFields = ref([
  {
    "type": "InputText",
    "label": "Email",
    "model": "email",
    "placeholder": "Введите ваш email",
    "required": true
  },
  {
    "type": "Dropdown",
    "label": "city",
    "model": "city",
    "placeholder": "Выберите ваш город",
    "required": true,
    "props": {
      "optionLabel": "name",
      "options": [
        {"name": "New York", "code": "NY"},
        {"name": "Rome", "code": "RM"},
        {"name": "London", "code": "LDN"},
        {"name": "Istanbul", "code": "IST"},
        {"name": "Paris", "code": "PRS"}
      ]
    }
  },
  {
    "type": "Checkbox",
    "label": "Согласен с условиями",
    "model": "agree",
    "props": {
      "binary": true,
      "value": "agree"
    },
    "labelProps": {
      "class": "ml-4"
    },
    "required": true
  },
  {
    "type": "MultiSelect",
    "label": "Select Cities",
    "model": "multi",
    "props": {
      "display": "chip",
      "optionLabel": "name",
      "options": [
        {"name": "New York", "code": "NY"},
        {"name": "Rome", "code": "RM"},
        {"name": "London", "code": "LDN"},
        {"name": "Istanbul", "code": "IST"},
        {"name": "Paris", "code": "PRS"}
      ]
    },
    "required": true
  }
])
</script>

<style scoped>

</style>