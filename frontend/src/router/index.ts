import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import MoodInicialView from "../views/MoodInicialView.vue";
import MoodTristeView from "../views/MoodTristeView.vue";
import MoodPokerFaceView from "../views/MoodPokerFaceView.vue";
import MoodFelizView from "../views/MoodFelizView.vue";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/inicial",
      name: "inicial",
      component: MoodInicialView,
      meta: { requiresAuth: true },
    },
    {
      path: "/triste",
      name: "triste",
      component: MoodTristeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/poker-face",
      name: "poker-face",
      component: MoodPokerFaceView,
      meta: { requiresAuth: true },
    },
    {
      path: "/feliz",
      name: "feliz",
      component: MoodFelizView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
});

// Guard global para exigir login
router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: "login" });
  }

  if (to.name === "login" && auth.isAuthenticated) {
    return next({ name: "inicial" });
  }

  return next();
});

export default router;
