<template>
  <ul class="list-none bg-gray-50 border-1 border-gray-300 p-3 border-round">
    <li>
      <b>Access:</b>
    </li>
    <li v-for="method in methods">
      <div class="flex-column w-full">
        <label :for="method">{{ method }}</label>
        <MultiSelect :id="method" v-model="model[method]" :options="groups"
                     :maxSelectedLabels="3" class="w-full"/>
      </div>
    </li>
  </ul>
</template>

<script setup>
import MultiSelect from 'primevue/multiselect';
import {ref, defineModel, defineProps} from 'vue';

const model = defineModel();

const props = defineProps({
  groups: {
    required: true,
  },
  methods: {
    required: true,
  },
});

const groups = props.groups;
const methods = props.methods;
</script>

<style scoped>
ul.list-none {
  padding: 0;
  margin: 0;
  width: 100%;
}

ul.list-none>li:first-child {
  margin-top: 0;
}
ul.list-none>li {
  margin-top: 0.8rem;
}
</style>