<template>
  <nav class="flexed jus-between navbar aligned">
      <span class="font-N link"> Game Store </span>
    <div class="flexed jus-between aligned">

      <router-link class="link font-N" :class="{active: selected === 'main'}"    to="/">
        Home         </router-link>
      <router-link class="link font-N" :class="{active: selected === 'about'}"   to="/about">
        About        </router-link>
      <router-link  class="link font-N":class="{active: selected === 'profile'}" to="/profile" v-if="isAuth">
        User         </router-link>
      <router-link class="link font-N" :class="{active: selected === 'cart'}"    to="/cart">
        <cart-icon/> </router-link>

      <my-button v-if="isAuth" @myClick="logout" >
        LogOut </my-button>
      <my-button :disabled="authIsLoading || selected ==='registration'"
                 class="table-btn"  v-else @myClick="loginModalToggle">
          <span class="flexed justifyed aligned">
            <img v-if="authIsLoading" class="loader-icon" :src="loaderPic" alt="err"> Login
          </span>
      </my-button>
    </div>
  </nav>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';
  import CartIcon from '@/components/CartIcon/CartIcon.vue';
  import {mapState, mapMutations, mapActions} from 'vuex'; //@ts-ignore
  import authLoadingPic from '@/dal/images/loaders/authLoader.gif';


  export default defineComponent({
    name: "HeaderMenu",
    components: { CartIcon },

    data: () => ({
      selected: '',
      loaderPic: authLoadingPic,
    }),

    computed: {
      ...mapState({
        isAuth: ({login}: any) => login.isAuth,
        authIsLoading: ({login}: any) => login.authIsLoading,
      })
    },

    methods: {
      ...mapMutations({
        loginModalToggle: 'login/loginModalToggle',
      }),
      ...mapActions({
        logout:           'login/logout',
      }),
    },

    watch: {
      $route: function () {
        this.selected = this.$route.name || '';
      }
    },

    mounted(): void {
      this.selected = this.$route.name || '';
    },

  })
</script>

<style src="@/components/mixins/mixins.scss" lang="scss"/>

<style scoped lang="scss">

  .navbar {
    padding: 0 15px;
    font-weight: 600;
    background: black;
    height: 70px;
  }

  .link {
    color: white;
    text-decoration: none;
    padding: 0 5px;
  }

  .active {
    color: red
  }

  .slash {
    width: 10px;
  }

  .table-btn {
    min-height: 40px;
    background: sandybrown;
  }

  .loader-icon {
    height: 20px;
    width:  20px;
  }

</style>