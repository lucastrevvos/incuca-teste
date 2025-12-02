<template>
  <div class="login-page">
    <div class="card">
      <h1>Login</h1>

      <form @submit.prevent="handleSubmit">
        <label>
          E-mail
          <input v-model="email" type="email" required />
        </label>

        <label>
          Senha
          <input v-model="password" type="password" required minlength="8" />
        </label>

        <p v-if="auth.error" class="error">{{ auth.error }}</p>

        <button type="submit" :disabled="auth.loading">
          <span v-if="auth.loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();

const email = ref("cliente@incuca.com.br");
const password = ref(
  "seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga.",
);

const handleSubmit = () => {
  if (password.value.length < 8) {
    auth.error = "Senha deve ter pelo menos 8 caracteres.";
    return;
  }

  auth.login(email.value, password.value);
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #e5e7eb;
}

.card {
  background: #020617;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

label {
  display: block;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

input {
  margin-top: 0.3rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
}
button {
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #22c55e;
  color: #022c22;
  font-weight: 600;
  cursor: pointer;
}
button:disabled {
  opacity: 0.7;
  cursor: wait;
}
.error {
  color: #f97373;
  font-size: 0.85rem;
}
</style>
