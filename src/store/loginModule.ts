import * as firebase from "firebase/app";
import {initializeAuth, signInWithEmailAndPassword, getAuth, signOut,} from "firebase/auth";
import {getDatabase, ref, set, get} from 'firebase/database';
import {createUser, getCurrentUser, loginUser} from '@/dal/RestClient';
import messages from "@/utils/messages";

const STORAGE_TYPE = window.localStorage;

export type UserProfile_Type = {
  age: string,
  email: string,
  games?: string[],
  gender: 'male' | 'female',
  login: string,
  password: string,
  phone: string,
  receivingNews?: string
}

export const loginModule = {
  state: () => {
    return {
      isAuth: false as boolean,
      user: {},
      onUserError: null,

      authIsLoading: false,
      isError: false,

      mdl_LoginShown: false,
      errMsg: '',


    }
  },

  mutations: {
    setIsAuth        (state: any, flag: boolean) {state.isAuth = flag},
    setAuthLoading   (state: any, loading: boolean) {
      state.authIsLoading = loading
    },
    loginModalToggle (state: any) {
      state.mdl_LoginShown = !state.mdl_LoginShown;
    },
    setError         (state: any, error: any) { //@ts-ignore
      console.log('error', error) //@ts-ignore
      state.errMsg = messages[error.error.message]
      console.log(state.errMsg)
    },
    setUser          (state: any, payload: UserProfile_Type) { state.user = payload; },
    setUserErr       (state: any, payload: any) { state.onUserError = payload }

  },

  actions: {

    async createNewUser({state, commit, dispatch}: any, userData: UserProfile_Type) {
      commit('setAuthLoading', true);
      return createUser(userData)
          .then((res: any) => {
            console.log('res', res);
            if (res.authSuccess) {
              return dispatch('getUser', res.userId)
            } else {
              commit('setError', res);
              return state.errMsg || 'Unknown error'
            }
          })
          .catch(e => e)
          .finally(() => {
            commit('setAuthLoading', false);
          })
    },

    async authorization({commit, dispatch}: any) {
      commit('setAuthLoading', true);

      const userId = await getAuth().currentUser?.uid || null;
      if (userId) { return dispatch('getUser', userId) }

      commit('setAuthLoading', false);
    },

    async getUser({state, commit, dispatch}: any, userId: string) {
      console.log('getUser!!!', userId)
      commit('setUserErr', null);
      return getCurrentUser(userId)
          .then((res) => {
            console.log(res.exists())
            console.log(res.val())
            if (res.exists()) {
              commit('setIsAuth', true);
              return commit('setUser', res.val())
            } else {
              console.log("No data available");
              return commit('setUser', {})
            }
          })
          .catch(e => {
            console.log('getUser', e)
            return commit('setUserErr', e);
          })
    },

    async login({state, commit, dispatch}: any, credentials: { userName: string, password: string }) {
      commit('setAuthLoading', true);

      return loginUser(credentials.userName, credentials.password)

          .then((res: any) => {
            console.log('ressss', res)
            if (res.localId) {
              const auth  = getAuth();
              console.log(auth)
              // signInWithEmailAndPassword(auth, credentials.userName, credentials.password)
              dispatch('getUser', res.localId)
              return { authSuccess: true, userId: res.localId }
            }
            else { console.log('err1', res)
              return {...res, authSuccess: false,}
            }
          })
          .catch(e =>{ console.log('err2', e)
            return {...e, authSuccess: false,}
          })
          .finally(()=> {
            commit('setAuthLoading', false);
          })

    },

    async logout({commit}: any) {
      commit('setAuthLoading', true);

      const auth = await getAuth();
      const res  = await signOut(auth)
      console.log('logout', res)

      commit('setIsAuth', false);
      commit('setUser', {});

      commit('setAuthLoading', false);

    },

  },

  namespaced: true

};