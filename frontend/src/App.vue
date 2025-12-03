<template>
  <v-app>
    <v-app-bar v-if="showAppBar" flat color="transparent">
      <v-toolbar-title class="text-subtitle-1">
        SPA Piadas Geek - Teste Incuba by Lucas Amaral
      </v-toolbar-title>

      <v-spacer />

      <v-btn variant="text" @click="handleLogout"> Sair </v-btn>
    </v-app-bar>

    <v-main>
      <Transition name="fade-slide" mode="out-in">
        <router-view />
      </Transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const showAppBar = computed(
  () => auth.isAuthenticated && route.name !== "login",
);

const handleLogout = () => {
  auth.logout();
  router.push({ name: "login" });
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

#app {
  height: 100%;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
