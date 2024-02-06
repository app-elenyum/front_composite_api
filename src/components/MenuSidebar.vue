<script setup>
import Sidebar from "primevue/sidebar"
import Button from "primevue/button"
import JsonToFormGenerator from "@/components/JsonToFormGenerator.vue";
import {reactive, defineProps, watch, defineEmits, ref} from "vue";

const emit = defineEmits(['save'])

const props = defineProps({
  formFields: {
    required: true,
  },
  formData: {
    required: true,
  }
})

let formData = reactive({})
let oldData = null;
let jtfg = ref()
// const formData = props.formData
// let formFields = props.formFields

function onSave() {
  jtfg.value.validateClear();
  let isValid = jtfg.value.validate();
  if (isValid) {
    emit('save', props.formData, oldData);
  }
}

watch(() => props.formData, (first, second) => {
  formData = first['data'];
  oldData = JSON.parse(JSON.stringify(first))
});

</script>
<template>
  <Sidebar>
    <template #container="{ closeCallback }">
      <div class="flex flex-column h-full">
        <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
          <span class="inline-flex align-items-center gap-2">
            <span class="font-semibold text-2xl">Elenyum</span>
          </span>
          <span>
            <Button type="button" @click="onSave" icon="pi pi-save" rounded outlined class="h-2rem w-2rem" style="border: none"></Button>
            <Button type="button" icon="pi pi-cog" rounded outlined class="h-2rem w-2rem" style="border: none"></Button>
            <Button type="button" @click="closeCallback" icon="pi pi-times" style="border: none" rounded outlined class="h-2rem w-2rem"></Button>
          </span>
        </div>
        <div class="overflow-y-auto">
          <JsonToFormGenerator ref="jtfg" :formFields="formFields" v-model="formData" ></JsonToFormGenerator>
        </div>
      </div>
    </template>
  </Sidebar>
</template>


<style scoped>

</style>