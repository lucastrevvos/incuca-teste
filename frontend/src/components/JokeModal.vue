<template>
  <div class="backdrop">
    <div class="modal">
      <h2>Piada Geek 😏</h2>
      <p class="joke">{{ joke }}</p>

      <p class="mood">Nível de felicidade: {{ moodLevel }}/3</p>

      <div class="actions">
        <button type="button" @click="$emit('another')" :disabled="loadingMore">
          {{ loadingMore ? "Carregando..." : "Mais uma piada" }}
        </button>

        <button
          type="button"
          @click="$emit('close')"
          :disabled="!canClose"
          class="close-btn"
        >
          Fechar
        </button>
      </div>

      <p v-if="!canClose" class="hint">
        A tela só vai ficar realmente feliz depois de algumas boas risadas… 😌
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  joke: string;
  moodLevel: number;
  canClose: boolean;
  loadingMore: boolean;
}>();

defineEmits<{
  (e: "another"): void;
  (e: "close"): void;
}>();
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #020617;
  padding: 1.5rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  color: #e5e7eb;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
}
.joke {
  margin: 1rem 0;
}
.mood {
  font-size: 0.9rem;
  color: #a5b4fc;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
button {
  flex: 1;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.close-btn {
  background: #22c55e;
  color: #022c22;
}
button:not(.close-btn) {
  background: #4b5563;
  color: #e5e7eb;
}
.hint {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #9ca3af;
}
</style>
