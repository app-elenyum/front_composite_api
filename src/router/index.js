import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from "@/views/TestView.vue";
import SwaggerView from "@/views/SwagerView.vue";
import EditorView from "@/views/EditorView.vue";
import GroupView from "@/views/GroupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView
    },
    {
      path: '/group',
      name: 'group',
      component: GroupView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/doc',
      name: 'doc',
      component: SwaggerView
    },

  ]
})

export default router
