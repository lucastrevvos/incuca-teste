import { defineStore } from "pinia";
import { api } from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") as string | null,
    loading: false,
    error: "" as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        const token = response.data.token as string;

        this.token = token;
        localStorage.setItem("token", token);
      } catch (err: any) {
        console.error(err);
        this.error = "Credenciais inválidas ou erro ao logar.";
        this.token = null;
        localStorage.removeItem("token");
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.error = null;
      localStorage.removeItem("token");
    },
  },
});
