<template>
  <div class="mood-screen neutral" @click="goTriste">
    <div class="content">
      <h1>:|</h1>
      <p>Clique em qualquer lugar para revelar a tristeza...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goTriste = () => {
  router.push({ name: "triste" });
};
</script>

<style scoped>
.mood-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.neutral {
  background: radial-gradient(circle at top, #1f2937, #020617);
  color: #e5e7eb;
}
.content {
  text-align: center;
}
h1 {
  font-size: 6rem;
  margin-bottom: 0.5rem;
}
</style>
