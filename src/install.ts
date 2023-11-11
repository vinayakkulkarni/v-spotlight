import { App as Application } from 'vue';
import VSpotlight from './components/VSpotlight.vue';

let installed = false;

const install = (app: Application) => {
  if (!installed) {
    app.component('VSpotlight', VSpotlight);
    installed = true;
  }
};

export default install;
