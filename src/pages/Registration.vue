<template>

  <div class="flexed justifyed aligned vertical background font-N">

    <div>
      <h1 class="font-L txt-cnt">Registration is required to be able to use discount policy</h1>
      <p class="font-S txt-cnt">Already have an account? Please, login
        <my-button class="reg-btn font-S" @myClick="gotoLogin">here</my-button>
      </p>
      <div>
        <form @submit.prevent="submitter">

          <fieldset>
            <legend>Contacts</legend>

            <div class="flexed centred columned aligned col-secondary">

              <div v-if="errMsg">
                <span class="error-msg">{{errMsg}}</span>
              </div>

              <div class="form-item">
                <label class="label" for="login">Name <em>*</em></label>
                <input id="login" name="login" autocomplete="off" type="text" v-model="form.login"
                       placeholder="Ray Bradbury"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field': ($v.form.login.$dirty && (!$v.form.login.required || !$v.form.login.minLength))}"
                >
              </div>

              <div class="input-errors" v-if="$v.form.login.$dirty">
                <span v-if="!$v.form.login.required" class="error-msg">Please input your name </span>
                <span v-else-if="!$v.form.login.minLength" class="error-msg">Please, input longer name  </span>
              </div>

              <div class="form-item">

                <label class="label" for="phone">Phone</label>
                <input id="phone" name="phone" autocomplete="no" ref="phoneRef" v-model="form.phone"
                       placeholder="+7(800) 555-35-35"
                       v-imask="phoneNumberMask"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field': ($v.form.phone.$dirty && (!$v.form.phone.required || !$v.form.phone.minLength))}"
                >
              </div>

              <div class="input-errors" v-if="$v.form.phone.$dirty">
                <span v-if="!$v.form.phone.required" class="error-msg">          Please input your phone number </span>
                <span v-else-if="!$v.form.phone.minLength" class="error-msg">    Please input correct phone number</span>
              </div>

              <div class="form-item">

                <label class="label" for="email">Email <em>*</em></label>
                <input id="email" name="email" autocomplete="off" v-model="form.email"
                       placeholder="test@test.ururu"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field': ($v.form.email.$dirty && (!$v.form.email.required || !$v.form.email.email)) }"
                >
              </div>

              <div class="input-errors" v-if="$v.form.email.$dirty">
                <span v-if="!$v.form.email.required" class="error-msg">Please input your email </span>
                <span v-else-if="!$v.form.email.email" class="error-msg">Please input correct email </span>
              </div>

              <div class="form-item">
                <label class="label" for="password">Password <em>*</em></label>
                <input id="password" name="password" autocomplete="off" v-model="form.password"
                       placeholder="n4P0/Ib"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field': $v.form.password.$dirty && (!$v.form.password.required || !$v.form.password.minLength) }"
                >
              </div>

              <div class="input-errors" v-if="$v.form.password.$dirty">
                <span v-if="!$v.form.password.required" class="error-msg">Please input password </span>
                <span v-else-if="!$v.form.password.minLength" class="error-msg">
                Please, input longer password ({{ form.password.length}} / {{ $v.form.password.$params.minLength.min }})
              </span>
              </div>

              <div class="form-item">
                <label class="label" for="repeatPass">Repeat Password <em>*</em></label>
                <input id="repeatPass" autocomplete="off" v-model="form.repeatPass"
                       placeholder="n0870P173n4P0/Ib"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field':  $v.form.password.$dirty && (!$v.form.repeatPass.required || !$v.form.repeatPass.sameAs) }"
                >
              </div>

              <div class="input-errors" v-if="!$v.form.repeatPass.sameAs">
                <span v-if="!$v.form.repeatPass.sameAs" class="error-msg">Passwords not equal</span>
              </div>



            </div>

          </fieldset>

          <fieldset>
            <legend>Personal</legend>

            <div class="flexed centred columned col-secondary aligned">

              <div class="form-item">
                <label class="label" for="age">Age<em>*</em></label>
                <input id="age" name="age" v-model="form.age"
                       placeholder="42"
                       class="input col-sub-secondary font-S"
                       :class="{ 'error-field':
                        $v.form.age.$dirty && (
                            !$v.form.age.required
                            || !$v.form.age.numeric
                            || $v.form.age.$params.minValue.min > +form.age
                            || +form.age > $v.form.age.$params.maxValue.max
                        ) }"
                >
              </div>

              <div class="input-errors" v-if="$v.form.age.$dirty">
                <span v-if="!$v.form.age.required" class="error-msg">Please, input your age </span>
                <span v-else-if="!$v.form.age.numeric" class="error-msg">Please, enter number </span>
                <span v-else-if="$v.form.age.$params.minValue.min > +form.age"
                      class="error-msg">You must be over 15!</span>
                <span v-else-if="+form.age > $v.form.age.$params.maxValue.max" class="error-msg">You cannot be so old ))</span>
              </div>


              <div class="form-item">

                <label class="label" for="gender">Sex</label>
                <select class="field col-sub-secondary font-S" id="gender" name="gender" v-model="form.gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

            </div>

          </fieldset>

          <fieldset>
            <legend>Preferences</legend>

            <p class="subheader">Please, select your favorite game genres</p>

            <div id="preferences" class="flexed justifyed aligned wrapped col-secondary">

              <div class="form-item">
                <input class="input-chBox" id="shooters" name='genres' type="checkbox" v-model="form.games" value="shooters">
                <label class="label-chBox" for="shooters"> Shooters </label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="stealthActions" name='genres' type="checkbox" v-model="form.games" value="stealthActions">
                <label class="label-chBox" for="stealthActions">Stealth-Actions</label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="survival" name='genres' type="checkbox" v-model="form.games" value="survival">
                <label class="label-chBox" for="survival">Survival </label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="horrors" name='genres' type="checkbox" v-model="form.games" value="horrors">
                <label class="label-chBox" for="horrors">Horrors </label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="indie" name='genres' type="checkbox" v-model="form.games" value="indie">
                <label class="label-chBox" for="indie">Indie </label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="rpg" name='genres' type="checkbox" v-model="form.games" value="rpg">
                <label class="label-chBox" for="rpg">RPG </label>
              </div>

              <div class="form-item">
                <input class="input-chBox" id="racing" name='genres' type="checkbox" v-model="form.games" value="racing">
                <label class="label-chBox" for="racing">Racing </label>
              </div>
            </div>

            <p class="subheader">Let us know if you want to receive news from us </p>

            <div class="flexed justifyed aligned wrapped col-secondary">
              <div class="form-item">
                <input id="news" name="news" type="radio" value="always" v-model="form.receivingNews">
                <label for="news">Always</label>
              </div>

              <div class="form-item">
                <input id="news2" name="news" type="radio" value="monthly" v-model="form.receivingNews">
                <label for="news2">Every month</label>
              </div>

              <div class="form-item">
                <input id="news3" name="news" type="radio" value="quarterly" v-model="form.receivingNews">
                <label for="news3">Every 3 month</label>
              </div>

              <div class="form-item">
                <input id="news4" name="news" type="radio" value="never" v-model="form.receivingNews">
                <label for="news4">Don't send me news</label>
              </div>
            </div>

          </fieldset>

          <my-button type="submit"
                  :disabled="authIsLoading || selected ==='registration'"
                     class="table-btn font"  @myClick="submitter">
          <span class="flexed justifyed aligned">
            <img v-if="authIsLoading" class="loader-icon" :src="loaderPic" alt="err"> Register now
          </span>
          </my-button>


        </form>


      </div>

    </div>

  </div>

</template>

<script lang="ts">

  import {defineComponent} from '@vue/composition-api';
  import {required, minLength, email, sameAs, numeric, minValue, maxValue,} from 'vuelidate/lib/validators'; //@ts-ignore
  import authLoadingPic from '@/dal/images/loaders/authLoader.gif';
  //@ts-ignore
  import {IMaskDirective} from 'vue-imask'
  import {normalizeFormValues} from "@/utils/helpers";
  import {mapState, mapActions, mapMutations} from 'vuex'
  import messages from "@/utils/messages";

  export default defineComponent({
    name: "Registration",

    data() {
      return {
        form: {
          login:         '' as string,
          phone:         '' as string,
          email:         '' as string,
          password:      '' as string,
          repeatPass:    '' as string,
          age:           '' as string,
          gender:        'male' as string,
          games:         [] as string[],
          receivingNews: '' as string,
        },

        loaderPic: authLoadingPic,

        errMsg: '',

        phoneNumberMask: {
          mask: '+{7}(000) 000-00-00',
          lazy: true,
        }
      }

    },

    computed: {
      ...mapState({
        isAuth: ({login}: any) => login.isAuth,
        authIsLoading: ({login}: any) => login.authIsLoading,

      })
    },

    validations() {
      return {
        form: {
          login:      {required, minLength: minLength(1)},
          phone:      {required, minLength: minLength(17)},
          email:      {required, email},
          password:   {required, minLength: minLength(6)},
          repeatPass: {required, sameAs: sameAs('password')},
          age:        {required, numeric, minValue: minValue(15), maxValue: maxValue(100)},
        },
      }
    },

    methods: {
      ...mapMutations({
        loginModalToggle: 'login/loginModalToggle',
      }),

      gotoLogin () {
        this.$router.push('/')
        this.loginModalToggle()
      },

    async submitter(): Promise<any> {

      this.errMsg = '';

      if (this.$v.$invalid) {
          this.$v.$touch();
        } else {
          const values = JSON.parse(JSON.stringify({...this.form}));
          delete values.repeatPass;
          const normValues = normalizeFormValues(values);
        let res = await this.createNewUser(normValues)
          if(res.authSuccess) {
            let prevPage = (this.$route.query.from as string) || '/' ;
            this.$router.push(prevPage)
          } else {//@ts-ignore
            this.errMsg = messages[res.error.message] || 'Unknown error occured..'
          }
        }
      },

      ...mapActions({
        createNewUser: 'login/createNewUser'
      })
    },


    directives: {
      imask: IMaskDirective
    },

    mounted(): void {
      if (this.isAuth) {
        let prevPage = (this.$route.query.from as string) || '/' ;
        this.$router.push(prevPage)
      }


    },

  })
</script>

<style scoped>

  .vertical {
    max-width: 50%;
    min-width: fit-content;
    margin: 40px auto 0 auto;
  }

  .form-item {
    display: flex;
    align-items: center;
  }

  .input {
    width: 249px;
  }

  .error-field {
    border: 2px solid red;
    border-radius: 3px;
  }


  .input-errors {
    height: 25px;
    width: 250px;
    margin-left: 150px;
  }

  .error-msg {
    color: red
  }

  .field {
    width: 255px;
    height: 25px;
  }

  .subheader {
    margin-top: 15px;
  }

  h1 {
    margin-bottom: 0px;
  }

  p {
    margin-top: 0px;
  }

  fieldset {
    margin-bottom: 15px;
    padding: 10px;
  }

  legend {
    padding: 0px 3px;
    font-weight: bold;
    font-variant: small-caps;
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

  input:focus {
    /*background: #eaeaea;*/
    outline: none;
  }

  input[type=checkbox] {
    width: 10px;
  }

  input[type=submit] {
    width: 170px;
    padding: 10px;
  }

  .table-btn {
    min-height: 40px;
    background: sandybrown;
  }

  .reg-btn {
    background: transparent;
    outline: none;
    border: none;
    color: red;
    padding: 0 !important;
  }


  .loader-icon {
    height: 20px;
    width:  20px;
  }

</style>