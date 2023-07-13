import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage.vue"),
  },
  {
    path: "/Movie",
    name: "MovieMain",
    component: () => import("@/pages/MovieMain.vue"),
  },
  {
    path: "/Tv",
    name: "TvMain",
    component: () => import("@/pages/TvMain.vue"),
  },
  {
    path: "/Movie/Detail",
    name: "MovieDetail",
    component: () => import("@/pages/MovieDetail.vue"),
  },
  {
    path: "/Tv/Detail",
    name: "TvDetail",
    component: () => import("@/pages/TvDetail.vue"),
  },
  {
    path: "/Search",
    name: "SearchMain",
    component: () => import("@/pages/SearchMain.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
