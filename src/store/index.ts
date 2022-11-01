import Vue from 'vue';
import Vuex from 'vuex';
import { storeModule } from '@/store/storeModule'
import { loginModule}  from "@/store/loginModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game:  storeModule,
    login: loginModule,
  }
})

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
