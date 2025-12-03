<template>
  <div class="login-wrapper">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="12" class="pa-6 login-card">
            <div class="text-center mb-4">
              <h1 class="text-h5 mb-1">Bem-vindo(a)</h1>
              <p class="text-body-2 text-grey-lighten-1">
                Faça login para começar o drama emocional da SPA 😈
              </p>
            </div>

            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="E-mail"
                type="email"
                variant="outlined"
                density="comfortable"
                :disabled="auth.loading"
                prepend-inner-icon="mdi-email"
                required
              />

              <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                variant="outlined"
                density="comfortable"
                :disabled="auth.loading"
                prepend-inner-icon="mdi-lock"
                :rules="[passwordRule]"
                required
              />

              <div v-if="auth.error" class="error-text">
                {{ auth.error }}
              </div>

              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
                :loading="auth.loading"
              >
                Entrar
              </v-btn>
            </v-form>

            <div class="mt-4 helper-text">
              <p class="text-caption text-grey-lighten-1">
                Use o e-mail <strong>cliente@incuca.com.br</strong><br />
                e a senha enorme definida pelo teste 😅
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const auth = useAuthStore();

const email = ref("cliente@incuca.com.br");
const password = ref(
  "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga.",
);

const passwordRule = (value: string) => {
  if (!value || value.length < 8) {
    return "Senha deve ter pelo menos 8 caracteres.";
  }
  return true;
};

const handleSubmit = async () => {
  if (password.value.length < 8) {
    auth.error = "Senha deve ter pelo menos 8 caracteres.";
    return;
  }

  await auth.login(email.value, password.value);

  if (auth.isAuthenticated) {
    router.push({ name: "inicial" });
  }
};
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
}

.login-card {
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.96);
  backdrop-filter: blur(16px);
}

.error-text {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #f97373;
}

.helper-text {
  margin-top: 0.5rem;
}
</style>
