<template>
  <div class="mood-screen poker">
    <JokeModal
      v-if="showModal"
      :joke="currentJoke"
      :moodLevel="moodLevel"
      :canClose="canClose"
      :loadingMore="loading"
      @another="handleAnotherJoke"
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import JokeModal from "../components/JokeModal.vue";

import { api } from "../services/api";

const router = useRouter();

const currentJoke = ref("Carregando piada...");
const moodLevel = ref(1);
const loading = ref(false);
const showModal = ref(true);

const canClose = computed(() => moodLevel.value >= 3);

async function fetchJoke() {
  loading.value = true;
  try {
    const response = await api.get<{ joke: string }>("/jokes/random");

    currentJoke.value = response.data.joke;
  } catch (err) {
    console.error(err);
    currentJoke.value = "Ops, não deu pra carregar uma piada agora. :( ";
  } finally {
    loading.value = false;
  }
}

async function handleAnotherJoke() {
  if (loading.value) return;

  await fetchJoke();

  if (moodLevel.value < 3) {
    moodLevel.value += 1;
  }

  if (moodLevel.value >= 3) {
    router.push({ name: "feliz" });
  }
}

function handleClose() {
  if (!canClose.value) return;
  showModal.value = false;

  router.push({ name: "inicial" });
}

onMounted(async () => {
  await fetchJoke();
});
</script>

<style scoped>
.mood-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.poker {
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
