<template>
  <div class="mood-screen poker">
    <div class="content">
      <h1>😐</h1>
      <p>Lendo piadas para ver se a vida faz sentido...</p>
    </div>

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
import axios from "axios";
import JokeModal from "../components/JokeModal.vue";

const router = useRouter();

const currentJoke = ref("Carregando piada...");
const moodLevel = ref(1);
const loading = ref(false);
const showModal = ref(true);

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";

const canClose = computed(() => moodLevel.value >= 3);

async function fetchJoke() {
  loading.value = true;
  try {
    const response = await axios.get<{ joke: string }>(
      `${API_BASE_URL}/jokes/random`,
    );
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

  // Quando atinge 3, mudamos a rota para /feliz
  if (moodLevel.value >= 3) {
    router.push({ name: "feliz" });
  }
}

function handleClose() {
  if (!canClose.value) return;
  showModal.value = false;
  // Vai voltar pra indecisão /inicial
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
