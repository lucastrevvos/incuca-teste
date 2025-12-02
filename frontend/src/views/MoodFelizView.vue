<template>
  <div class="mood-screen happy">
    <div class="content">
      <h1>:D</h1>
      <p class="title">Agora sim, 100% feliz com a vida!</p>

      <p class="subtitle">
        Você pode começar tudo de novo e ver até onde a sua paciência com piadas
        geek aguenta.
      </p>

      <div class="actions">
        <button type="button" @click="restartCycle">Recomeçar ciclo</button>
      </div>

      <p class="hint">
        Dica: ao recomeçar, você volta para a tela indecisa e todo o drama
        emocional começa de novo. :)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const restartCycle = () => {
  router.push({ name: "inicial" });
};
</script>

<style scoped>
.mood-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.happy {
  background: radial-gradient(circle at top, #22c55e, #16a34a);
  color: #022c22;
}
.content {
  text-align: center;
  max-width: 500px;
  padding: 1.5rem;
}
h1 {
  font-size: 6rem;
  margin-bottom: 0.5rem;
}
.title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.actions {
  margin-bottom: 1rem;
}
button {
  padding: 0.7rem 1.6rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #022c22;
  color: #bbf7d0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
button:hover {
  transform: translateY(-1px);
}
.hint {
  font-size: 0.85rem;
  opacity: 0.9;
}
</style>
