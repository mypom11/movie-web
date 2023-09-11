import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import mixin from "./mixin";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far);

const app = createApp(App);

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Access-Control-Allow-Origin": "https://movie-web-pearl.vercel.app",
  "Access-Control-Allow-Credentials": "true",
};

app.config.globalProperties.$axios = axios;

app
  .component("font-awesome-icon", FontAwesomeIcon)
  .mixin(mixin)
  .use(store)
  .use(router)
  .mount("#app");
