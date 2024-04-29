import "./assets/main.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// import { Auth0Plugin } from "./auth0-plugin";
import { useAuthStore } from "@/stores/auth-store";

import "/node_modules/primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-amber/theme.css";
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

app.use(PrimeVue);
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";

app.directive("tooltip", Tooltip);
app.component("Button", Button);
// app.component("Tooltip", Tooltip);
const authStore = useAuthStore();

app.use(router);

router.beforeEach((to) => {
  const auth = useAuthStore(pinia);
});

app.use(
  createAuth0({
    domain: "dev-bstn5pi0f5twfr3y.us.auth0.com",
    clientId: "ubKRwTLiCw3CnVDB3Bdp22LYVdlocBfC",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);

app.mount("#app");
