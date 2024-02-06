<template>
  <div class="flex flex-column gap-2 px-2 mb-3">
    <label>Card type</label>
    <MultiSelect placeholder="Selected type" :options="options" display="chip" v-model="payload" size="small"></MultiSelect>
    <template v-for="error in errors">
      <small class="p-error">{{ error }}</small>
    </template>
  </div>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {defineExpose, defineModel, ref} from "vue";
const model = defineModel();
const payload = ref(model?.payload);

const options = ref([
  'AMEX',
  'CHINA_UNIONPAY',
  'DINERS',
  'DISCOVER',
  'INSTAPAYMENT',
  'JCB',
  'LASER',
  'MAESTRO',
  'MASTERCARD',
  'MIR',
  'UATP',
  'VISA',
]);

const errors = ref([]);
function validate()
{
  return true;
}

function validateClear()
{
  errors.value = [];
}

defineExpose({
  validate,
  validateClear
});
</script>

<style scoped>

</style>