import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

interface User {
  id: number;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    initFromStorage() {
      const token = localStorage.getItem("auth_token");
      const user = localStorage.getItem("auth_user");

      if (token) {
        this.token = token;
        axios.defaults.baseURL = API_BASE_URL;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (user) {
        this.user = JSON.parse(user) as User;
      }
    },

    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        axios.defaults.baseURL = API_BASE_URL;

        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password,
        });

        const { token, user } = response.data as { token: string; user: User };

        this.token = token;
        this.user = user;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        router.push({ name: "inicial" });
      } catch (error: any) {
        this.error =
          error?.response?.data?.message ||
          "Erro ao fazer login. Verifique suas credenciais.";
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.error = null;

      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      delete axios.defaults.headers.common["Authorization"];

      router.push({ name: "login" });
    },
  },
});
