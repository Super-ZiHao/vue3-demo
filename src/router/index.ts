import { RouteRecordRaw, createWebHashHistory, createRouter } from 'vue-router';

import Login from '@/components/Login.vue';
import List from '@/components/List.vue';
import { ElMessage } from 'element-plus';
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/list',
    component: List
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authPage = ['/list']
  if (authPage.includes(to.path)) {
    const token = localStorage.getItem('user-token')
    if (!token) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    return next()
  }
})

export default router