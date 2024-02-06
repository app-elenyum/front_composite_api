<script setup>
import Divider from 'primevue/divider';
import Chart from 'primevue/chart';
import Card from 'primevue/card';
import {ref, onMounted} from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
  chartData2.value = setChartData2();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [540, 325, 702, 620, 220, 120, 20.4],
        backgroundColor: ['rgba(6, 182, 212, 0.2)'],
        borderColor: ['rgba(6, 182, 212, 0.5)'],
        borderWidth: 1
      }
    ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}


// NEXT SECTION
const chartData2 = ref();

const setChartData2 = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(6, 182, 212, 0.5)',
        tension: 0.4
      },
    ]
  };
};
</script>

<template>
  <h2>Dashboard</h2>
  <Divider/>
  <div class="grid">
    <div class="col-6 card">
      <Card>
        <template #title>
          20.4 MB
          <div class="text-color-secondary text-xs font-normal">Data volume</div>
        </template>
        <template #content>
          <Chart type="bar" :data="chartData" :options="chartOptions"/>
        </template>
      </Card>
    </div>
    <div class="col-6 card">
      <Card>
        <template #title>
          40
          <div class="text-color-secondary text-xs font-normal">Requests</div>
        </template>
        <template #content>
          <Chart type="line" :data="chartData2" :options="chartOptions"/>
        </template>
      </Card>
    </div>
    <div class="col-4 card">
      <Card>
        <template #title>
          <div class="text-color-secondary text-xs font-normal"><i class="pi pi-database mr-2 text-xs"></i>Databases</div>
        </template>
        <template #content>
          <div class="text-xl">5</div>
        </template>
        <template #footer>
          <div class="text-color-secondary text-xs text-right">Total tables: 20</div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #title>
          <div class="text-color-secondary text-xs font-normal"><i class="pi pi-user-edit mr-2 text-xs"></i>Authentications</div>
        </template>
        <template #content>
          <div class="text-xl">22</div>
        </template>
        <template #footer>
          <div class="text-color-secondary text-xs text-right">Sessions: 200</div>
        </template>
      </Card>
    </div>
    <div class="col-4 card">
      <Card>
        <template #title>
          <div class="text-color-secondary text-xs font-normal"><i class="pi pi-table mr-2 text-xs"></i>Module</div>
        </template>
        <template #content>
          <div class="text-xl">5</div>
        </template>
        <template #footer>
          <div class="text-color-secondary text-xs text-right">Max entity: 10</div>
        </template>
      </Card>
      <Card class="mt-3">
        <template #title>
          <div class="text-color-secondary text-xs font-normal"><i class="pi pi-align-left mr-2 text-xs"></i> Users</div>
        </template>
        <template #content>
          <div class="text-xl">20</div>
        </template>
        <template #footer>
          <div class="text-color-secondary text-xs text-right">Groups: 10</div>
        </template>
      </Card>
    </div>
    <div class="col-4 card">
      <Card>
        <template #title>
          20
          <div class="text-color-secondary text-xs font-normal">Realtime connections</div>
        </template>
        <template #content>
          <Chart type="bar" :data="chartData" :options="chartOptions"/>
        </template>
      </Card>
    </div>
  </div>

</template>

<style>
</style>
