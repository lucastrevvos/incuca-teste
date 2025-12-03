<template>
  <v-dialog :model-value="true" persistent max-width="520">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Piada Geek 😏</span>
        <v-chip size="small" color="secondary" label class="text-white">
          Humor: {{ moodLevel }}/3
        </v-chip>
      </v-card-title>

      <v-card-text>
        <p class="joke-text">
          {{ joke }}
        </p>

        <div class="mt-4">
          <v-progress-linear
            :model-value="moodProgress"
            color="primary"
            height="8"
            rounded
          />
          <p class="progress-hint">
            {{ progressLabel }}
          </p>
        </div>

        <p v-if="!canClose" class="hint">
          A tela ainda não está totalmente feliz com a vida… leia mais uma
          piada. 😌
        </p>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          variant="outlined"
          @click="$emit('another')"
          :loading="loadingMore"
        >
          Mais uma piada
        </v-btn>

        <v-btn color="primary" @click="$emit('close')" :disabled="!canClose">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  joke: string;
  moodLevel: number;
  canClose: boolean;
  loadingMore: boolean;
}>();

defineEmits<{
  (e: "another"): void;
  (e: "close"): void;
}>();

const moodProgress = computed(() => {
  const max = 3;
  const clamped = Math.max(0, Math.min(props.moodLevel, max));
  return (clamped / max) * 100;
});

const progressLabel = computed(() => {
  if (props.moodLevel <= 1) return "Ainda em modo poker-face…";
  if (props.moodLevel === 2) return "Tá melhorando, continue! 😄";
  return "Agora sim, liberado pra ser feliz! ✨";
});
</script>

<style scoped>
.joke-text {
  font-size: 0.98rem;
  line-height: 1.4rem;
}

.progress-hint {
  margin-top: 0.3rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

.hint {
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: #f97373;
}
</style>
