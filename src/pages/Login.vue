<template>

  <div class="login-wrapper flexed justifyed aligned vertical"  @click="closeModal" id="back">

    <div class="background">
      <div class="flexed jus-between aligned">
        <span>Please, login friend</span>
        <my-button id="btn" @myClick="closeModal" :disabled="authIsLoading">X</my-button>
      </div>


      <form @submit.prevent="submitter">

        <fieldset>
          <legend>Sign in</legend>

          <div class="flexed centred columned aligned col-secondary">

            <div class="form-item">
              <label class="label" for="email">Login <em>*</em></label>
              <input id="email" name="email" autocomplete="off" type="text" v-model="form.email"
                     placeholder="Ray Bradbury"
                     class="input col-sub-secondary"
                     :class="{ 'error-field': $v.form.email.$dirty && !$v.form.email.required }"
              >
            </div>

            <div class="input-errors" v-if="$v.form.email.$dirty">
              <span v-if="!$v.form.email.required" class="error-msg">Please input your name </span>
            </div>


            <div class="form-item">
              <label class="label" for="pass">Password <em>*</em></label>
              <input id="pass" name="pass" autocomplete="off" v-model="form.pass"
                     placeholder="n4P0/Ib"
                     class="input col-sub-secondary"
                     :class="{ 'error-field': $v.form.pass.$dirty && !$v.form.pass.required}"
              >
            </div>

            <div class="input-errors" v-if="$v.form.pass.$dirty">
              <span v-if="!$v.form.pass.required" class="error-msg">Please input password </span>
            </div>

            <div class="input-errors" v-if="validateMessages.message">
              <span v-if="validateMessages.message" class="error-msg"> {{ validateMessages.message }}</span>
            </div>

          </div>

        </fieldset>

        <my-button class="table-btn" type="submit" :disabled="authIsLoading">
          <span class="flexed justifyed aligned">
            <img v-if="authIsLoading" class="loader-icon" :src="loaderPic" alt="err"> Sign in!
          </span>
        </my-button>
      </form>

      <p>
        Do not have account? Please, register
        <my-button class="reg-btn font-S" @myClick="gotoRegistration">here</my-button>
      </p>

    </div>

  </div>

</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';
  import {normalizeFormValues} from "@/utils/helpers";
  import {required, email} from "vuelidate/lib/validators";
  import {mapState, mapActions, mapMutations} from 'vuex'; //@ts-ignore
  import authLoadingPic from '@/dal/images/loaders/authLoader.gif';
  import messages from "@/utils/messages";

  export default defineComponent({
    name: "LoginModal",
    data() {
      return {
        form: {
          email:     '',
          password: '',
        },
        validateMessages: {
          message: '',
        },
        loaderPic: authLoadingPic,
      }
    },

    emits:['closeModal'],


    validations() {
      return {
        form: {
          email: {required, email},
          pass: {required},
        }
      }

    },

    computed: {
      ...mapState({
        isAuth:        ({login}: any) => login.isAuth,
        authIsLoading: ({login}: any) => login.authIsLoading,
      }),
    },

    methods: {

      gotoRegistration () {
        this.$emit('closeModal');
        this.$router.push(`/registration?from=${this.$route.name}`)
      },

      closeModal({target}: { target: HTMLElement }) {
        if ( !this.authIsLoading && (target.id === 'back' || target.id === 'btn') ) {
          this.$emit('closeModal')
        }
      },

      ...mapMutations({loginModalToggle: 'game/loginModalToggle'}),
      ...mapActions({login: 'login/login'}),

      async submitter(): Promise<any> {
        this.validateMessages.message = '';

        if (this.$v.$invalid) {
          this.$v.$touch();
        } else {
          const values = JSON.parse(JSON.stringify({...this.form}));
          const normValues = normalizeFormValues(values);

          let {email, pass} = normValues;
          let res = await this.login({userName: email, password: pass})
          console.log('res', res);

          if (res.authSuccess) {
            this.$emit('closeModal')
          } else {            //@ts-ignore
            this.validateMessages.message = messages[res.code] || 'Unknown error occured..'
          }

        }
      },


    },
  })
</script>


<style scoped lang="scss">

  .login-wrapper {
    height: 100vh;
    width: 100%;
    background: rgba(190, 191, 195, .7);
    top: 0;
    left: -10px;
    position: fixed;
    z-index: 5;
  }

  .vertical {
    min-width: fit-content;
  }

  fieldset {
    margin-bottom: 15px;
    padding: 10px;
  }

  .label {
    width: 140px;
    display: inline-block;
    vertical-align: top;
    margin: 6px;
  }

  em {
    font-weight: bold;
    font-style: normal;
    color: #f00;
  }

  input[type=submit] {
    width: 170px;
    padding: 10px;
  }

  .table-btn {
    min-height: 40px;
    background: sandybrown;
  }

  .loader-icon {
    height: 20px;
    width:  20px;
  }

  .input-errors {
    height: 25px;
    width: 250px;
    margin-left: 150px;
  }

  .error-msg {
    color: red
  }

  .reg-btn {
    background: transparent;
    outline: none;
    border: none;
    color: red;
    padding: 0 !important;
    text-decoration: underline
  }


</style>