<template>
  <div class="mood-screen sad" @click="goPokerFace">
    <div class="content">
      <h1 class="face">:(</h1>
      <p>Clique para ver se uma piada ajuda...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goPokerFace = () => {
  router.push({ name: "poker-face" });
};
</script>

<style scoped>
.mood-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background 0.5s ease;
}
.sad {
  background: radial-gradient(circle at top, #111827, #020617);
  color: #fca5a5;
}
.content {
  text-align: center;
}
h1 {
  font-size: 6rem;
  margin-bottom: 0.5rem;
}

.face {
  font-size: 6rem;
  margin-bottom: 0.5rem;
  animation: sadPulse 1.5s ease-in-out infinite;
}

@keyframes sadPulse {
  0% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(0.96);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
}
</style>
