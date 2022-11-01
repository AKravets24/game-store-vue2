import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vuelidate from 'vuelidate'
import components from './components/ui-kit';
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

components.forEach(component => {
  Vue.component(component.name, component)
});


firebase.initializeApp({
  apiKey: "AIzaSyAVcU0XYmn34b9eEX2augLRZWbBbIuFCEc",
  authDomain: "vue-game-store.firebaseapp.com",
  databaseURL: "https://vue-game-store-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-game-store",
  storageBucket: "vue-game-store.appspot.com",
  messagingSenderId: "908557041747",
  appId: "1:908557041747:web:4ea52abfdb8d60ba5c46a6"
});

let app: any;


getAuth().onAuthStateChanged(() => {
  if (!app) {
   app = new Vue({
      store,
      router,
      render: h => h(App) })
        .$mount('#app')
  }

} )

// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app');


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
// const app = initializeApp({
//   apiKey: "AIzaSyAVcU0XYmn34b9eEX2augLRZWbBbIuFCEc",
//   authDomain: "vue-game-store.firebaseapp.com",
//   databaseURL: "https://vue-game-store-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "vue-game-store",
//   storageBucket: "vue-game-store.appspot.com",
//   messagingSenderId: "908557041747",
//   appId: "1:908557041747:web:4ea52abfdb8d60ba5c46a6"
// });
