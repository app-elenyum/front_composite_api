<script setup>
import ConfirmDialog from 'primevue/confirmdialog';
import Button from "primevue/button"

import {ref} from "vue";

let type = ref('Settings');

function routeTo(to) {
  window.location.href = '/' + to;
}
</script>


<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="grid">
    <div style="background: #06b6d4; position: fixed; height: 100%; max-width: 50px">
      <Button icon="pi pi-desktop" @click="routeTo('')"/>
      <Button icon="pi pi-table" @click="routeTo('editor')"/>
      <Button icon="pi pi-code" @click="routeTo('doc')"/>
<!--      <Button icon="pi pi-users" style="border: none; border-radius: 0" @click="routeTo('group')"/>-->
<!--      <Button icon="pi pi-cog" style="border: none; border-radius: 0" @click="type='Settings'; visible = true"/>-->
    </div>
    <div class="col-offset-2 col-9">
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped>
div.grid Button {
  border: none;
  border-radius: 0;
  width: 100%
}
</style>
