<template>
  <ul class="list-none bg-gray-50 border-1 border-gray-300 p-3 border-round">
    <TieredMenu ref="menu" id="overlay_menu" :model="items" :popup="true"/>
    <div class="flex ">
      <b class="flex-grow-1 flex align-items-center ">Validator:</b>
      <div class="flex-none flex align-items-end"><Button severity="secondary" style="border: none" outlined rounded type="button" icon="pi pi-plus" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"/>
      </div>
    </div>
    <li v-for="(validator, validatorName) in model">
      <div class="bg-white m-1 px- border-1 border-round border-gray-200">
        <div class="flex ">
          <div class="flex-grow-1 flex align-items-center px-3 py-2 border-round" style="word-break: break-all; word-wrap: break-word;">
            {{validatorName}}
          </div>
          <div class="flex-none flex align-items-center justify-content-center font-bold m-1 px-1 py-1 border-round">
            <Button type="button"  icon="pi pi-times" style="border: none;" @click="onDeleteValidator(validatorName)" rounded outlined class="h-2rem w-2rem text-color-secondary"></Button>
          </div>
        </div>
        <component ref="refComponents" :is="components[validatorName]" v-model="model[validatorName]"></component>
      </div>
    </li>
  </ul>
</template>

<script setup>
import Button from 'primevue/button';
import TieredMenu from 'primevue/tieredmenu';
import {useConfirm} from "primevue/useconfirm";
import {ref, defineModel, shallowRef, defineExpose} from 'vue';
import Expression from "@/components/Input/Validator/Expression.vue";
import UniqueEntity from "@/components/Input/Validator/UniqueEntity.vue";

const model = defineModel();
const menu = ref();
const confirm = useConfirm();
const components = shallowRef({
  Expression: Expression,
  UniqueEntity: UniqueEntity
})

function onDeleteValidator(validator) {
  confirm.require({
    message: `Are you sure you want to delete validator: ${validator}?`,
    header: 'Confirmation delete validator',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      delete model.value[validator]
    },
  });
}

function addValidator(event) {
  model.value[event.item.label] = ref();
}

const items = ref([
  {
    label: 'Expression',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  },
  {
    label: 'Cascade',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  },
  {
    label: 'Traverse',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  },
  {
    label: 'UniqueEntity',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  },
  {
    label: 'EnableAutoMapping',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  },
  {
    label: 'DisableAutoMapping',
    icon: 'pi pi-arrow-circle-right',
    command: (e) => addValidator(e),
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const refComponents = ref()
function validate() {
  if (typeof refComponents.value !== 'object') {
    return true
  }
  let result = [];
  for (const ref of refComponents.value) {
    if (typeof ref.validate === 'function') {
      result.push(ref.validate())
    }
  }
  return result.every((value) => value === true)
}
function validateClear() {
  if (typeof refComponents.value !== 'object') {
    return true
  }
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
ul.list-none {
  padding: 0;
  margin: 0;
  width: 100%;
}

ul.list-none > li:first-child {
  margin-top: 0;
}

ul.list-none > li {
  margin-top: 0.8rem;
}

</style>