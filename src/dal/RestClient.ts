import gameCards from "@/dal/gameCards";
//@ts-ignore
import {v4 as uuidv4} from 'uuid';
import {existMail, existName, existPhone, wrongCredentials, messageValidator} from '@/dal/RestClientUtils';
import {getDatabase, ref, child, get, set} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {UserProfile_Type} from "@/store/loginModule";


export async function getGameList() {
  // const apiKey = "AIzaSyAVcU0XYmn34b9eEX2augLRZWbBbIuFCEc";
  return fetch('https://vue-game-store-default-rtdb.europe-west1.firebasedatabase.app/gameData.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
      .then((res) => res.json())
}

export async function getCurrentUser(userId: string) {
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `users/${userId}`))
}

async function regUser(email: string, password: string) {

  const auth = await getAuth();
  const {apiKey} = auth.config;

  return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {method: 'POST', body: JSON.stringify({auth, email, password})}).then((raw) => raw.json())
}

export async function createUser(userData: UserProfile_Type) {
  try {
    return regUser(userData.email, userData.password)

        .then(res => {
          if (res.localId) {
            return set(ref(getDatabase(), 'users/' + res.localId), userData)
                .then(() => {
                  return {authSuccess: true, userId: res.localId}
                })
                .catch(e => {
                  console.log(e)
                  return {
                    authSuccess: false, error: {
                      code: 400,
                      errors: [{
                        message: 'An error occured, ask administrator',
                        domain: 'global',
                        reason: 'cannot set user body info'
                      }]
                    }
                  }
                })
          } else {
            console.log('err1', res)
            return {...res, authSuccess: false,}
          }

        })
        .catch(e => {
          console.log('err2', e)
          return {...e, authSuccess: false}
        })
  } catch (e) {
    console.log('err3', e)
    return {
      authSuccess: false,
      error: e
    }
  }
}

export async function loginUser(email: string, password: string) {
  const auth = getAuth();
  const {apiKey} = auth.config;
  return await signInWithEmailAndPassword(auth, email, password);
  // return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({email, password})
  //     }).then((raw) => raw.json())


}

