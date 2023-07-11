import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/pages/MainPage.vue"),
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
    path: "/PreviousMovie",
    name: "PreviousMovie",
    component: () => import("@/pages/PreviousMovie.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
