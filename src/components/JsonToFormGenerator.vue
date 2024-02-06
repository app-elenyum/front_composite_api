<template>
  <form>
    <ul class="list-none p-3 m-0">
      <li class="mt-5" v-for="(field, index) in props.formFields" :key="index">
        <span :class="{'p-float-label flex-column': field.floatLabel !== false, 'mt-5 flex': true}">
          <component
              :inputId="field.model"
              :is="component[field.type]"
              v-model="modelValue[field.model]"
              v-bind="field.props"
              :placeholder="field.placeholder"
              :required="field.required"
              :label="field.label"
              :class="field.class"
              ref="refComponents"
          ></component>
          <label v-bind="field.labelProps" :for=field.model>{{ field.label }}</label>
        </span>
      </li>
    </ul>
  </form>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Chips from 'primevue/chips';
import AccessInput from "@/components/Input/AccessInput.vue";
import ValidatorColumnInput from "@/components/Input/ValidatorColumnInput.vue";
import ValidatorEntityInput from "@/components/Input/ValidatorEntityInput.vue";
import ColumnInputName from "@/components/Input/ColumnInputName.vue";
import ColumnInputType from "@/components/Input/ColumnInputType.vue";
import EntityInputGroups from "@/components/Input/EntityInputGroups.vue";
import EntityInputName from "@/components/Input/EntityInputName.vue";
import ModuleInputName from "@/components/Input/ModuleInputName.vue";

import {defineExpose, defineProps, ref} from 'vue';

const component = {
  InputText: InputText,
  Checkbox: Checkbox,
  Button: Button,
  Dropdown: Dropdown,
  MultiSelect: MultiSelect,
  Chips: Chips,
  AccessInput: AccessInput,
  ValidatorColumnInput: ValidatorColumnInput,
  ValidatorEntityInput: ValidatorEntityInput,
  ColumnInputName: ColumnInputName,
  ColumnInputType: ColumnInputType,
  EntityInputGroups: EntityInputGroups,
  EntityInputName: EntityInputName,
  ModuleInputName: ModuleInputName,
}


const modelValue = defineModel()
const props = defineProps({
  formFields: {
    required: true,
  }
})

const refComponents = ref()
function validate() {
  let result = [];
  for (const ref of refComponents.value) {
    if (typeof ref.validate === 'function') {
      result.push(ref.validate())
    }
  }
  return result.every((value) => value === true) // no validation
}
function validateClear() {
  for (const ref of refComponents.value) {
    if (typeof ref.validateClear === 'function') {
      ref.validateClear()
    }
  }
}
defineExpose({
  validate,
  validateClear,
});
</script>
<style scoped>

</style>