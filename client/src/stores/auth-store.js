import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      username: "",
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user) {
      console.log("Store SetUser()");
      // set user in state
      this.user = user;
      // set user state into localstorage
      localStorage.setItem("user", JSON.stringify(user));
    },
    clear() {
      console.log("Store Clear()");
      // clear user in state
      this.user = {
        username: "",
      };
      // clear user state from localstorage
      localStorage.removeItem("user");
    },
  },
});
