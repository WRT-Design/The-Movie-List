import "./assets/main.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
// import { Auth0Plugin } from "./auth0-plugin";

import "/node_modules/primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-amber/theme.css";
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons

const store = createStore({
  state() {
    return {};
  },
});

const app = createApp(App);

app.use(PrimeVue);
import Button from "primevue/button";
app.component("Button", Button);

app.use(router);

app.use(PrimeVue);

app.use(store);

// Vue.use(Auth0Plugin, {
//   domain: "dev-bstn5pi0f5twfr3y.us.auth0.com",
//   clientId: "ubKRwTLiCw3CnVDB3Bdp22LYVdlocBfC",
//   redirectUri: `http://localhost:5173/`,
//   onRedirectCallback: (appState) => {
//     router.push(
//       appState && appState.targetPath
//         ? appState.targetPath
//         : window.location.pathname
//     );
//   },
// });

app.use(
  createAuth0({
    domain: "dev-bstn5pi0f5twfr3y.us.auth0.com",
    clientId: "ubKRwTLiCw3CnVDB3Bdp22LYVdlocBfC",
    authorizationParams: {
      redirect_uri: `http://localhost:5173/`,
    },
  })
);

app.mount("#app");
