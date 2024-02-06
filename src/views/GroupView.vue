<script setup>
import Divider from 'primevue/divider';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { ref } from 'vue';


const group = [
  {
    id: 1,
    name: 'admin',
    description: 'Для администраторов',
  },
  {
    id: 2,
    name: 'user',
    description: 'Для пользователей',
  },
  {
    id: 3,
    name: 'manager',
    description: 'Для менеджеров',
  },
];

const onRowEditSave = (event) => {
  let { newData, index } = event;

  products.value[index] = newData;
};
const editingRows = ref([]);
</script>

<template>
  <h2>
    Group
    <button class="p-panel-header-icon p-link ml-3">
      <span style="color: #262628; font-weight: 700" class="pi pi-plus"></span>
    </button>
  </h2>
  <Divider />
  <DataTable v-model:editingRows="editingRows" :value="group" size="small" dataKey="id" @row-edit-save="onRowEditSave" editMode="row" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
    <Column field="id" header="Id"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="description" header="Description"></Column>
    <Column :exportable="false" style="max-width:2rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" size="small" outlined rounded class="mr-2 border-0"  />
        <Button icon="pi pi-trash"  size="small" outlined rounded severity="danger border-0"  />
      </template>
    </Column>
  </DataTable>
</template>

<style>
</style>
