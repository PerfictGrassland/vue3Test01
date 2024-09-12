import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      // beforeEnter: (to, from, next) => {
      //   console.log('%c [ home beforeEnter ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', to, from)
      //   next()
      //   // 检查用户是否有管理员权限
      //   // if (hasAdminPermission()) {
      //   //   next()
      //   // } else {
      //   //   next('/403')
      //   // }
      // },
      // beforeLeave (to, from, next) {
      //   // ...
      //   next()
      // }
    },
    {
      path: "/login/:id",
      name: "login",
      meta: {
        csj: true
      },
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      // beforeEnter: (to, from, next) => {
      //   console.log('%c [ about beforeEnter ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', to, from)
      //   next()
      //   // 检查用户是否有管理员权限
      //   // if (hasAdminPermission()) {
      //   //   next()
      //   // } else {
      //   //   next('/403')
      //   // }
      // },
    },
  ],
});

const isLoggedIn = function () {
  return true;
};

// router.beforeEach((to, from, next) => {
//   // 检查用户登录状态
//   console.log('%c [ beforeEach ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'beforeEach', to, from)
//   if (to.meta.requiresAuth && !isLoggedIn()) {
//     next("/login");
//   } else {
//     next();
//   }
// });


// // main.js
// router.beforeResolve(async (to, from, next) => {
//   try {
//     // 预取需要的数据
//     // await store.dispatch('fetchPageData', to.params.id)
//     console.log('%c [ beforeResolve ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', 'beforeResolve', to, from)
//     next()
//   } catch (error) {
//     next('/error')
//   }
// })

// // main.js
// router.afterEach((to, from) => {
//   console.log('%c [ afterEach ]-57', 'font-size:13px; background:pink; color:#bf2c9f;', to, from)
//   // 记录页面跳转日志
//   // logPageVisit(to.path)
// })

export default router;
