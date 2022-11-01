<template>
  <div id="app" :class="cover" >
    <div class="container-wrapper">
      <div v-if="primaryLoading" class="global-loader flexed justifyed">
         <span class="flexed aligned columned centred">
            <img class="preloader" :src="loaderPic" alt="err">
           <h1>Wait we are logging-in...</h1>
          </span>
      </div>

      <div v-if="contentPermission" class="container">
        <header-menu/>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import HeaderMenu from '@/components/HeaderMenu.vue';
  import {mapState, mapActions} from 'vuex'; //@ts-ignore
  import authLoadingPic from '@/dal/images/loaders/authLoader.gif';
  import {getAuth} from "firebase/auth";

  export default defineComponent({
    components: {
      HeaderMenu
    },

    data: () => {
      return {
        cover: 'base' as string,
        primaryLoading: false,
        contentPermission: true,
        loaderPic: authLoadingPic,
      }
    },

    computed: {
      ...mapState({
        authIsLoading: ({login}: any) => login.authIsLoading,
      }),
    },

    methods: {
      coverSelector (name: string): any {

        let randIdx = Math.floor(Math.random() * 3);

        switch (name) {
          case  'about':         return this.cover = ['base-2-a','base-2-b', 'base-2-c'][randIdx];
          case  'cart' :         return this.cover = ['base-3-a','base-3-b', 'base-3-c'][randIdx];
          case  'registration':  return this.cover = ['base-4-a','base-4-b', 'base-4-c'][randIdx];
          case  'page404':       return this.cover = ['base-5-a','base-5-b', 'base-5-c'][randIdx];
          case  'profile':       return this.cover = ['base-6-a','base-6-b', 'base-6-c'][randIdx];
          default:               return this.cover = ['base-1-a','base-1-b', 'base-1-c'][randIdx];
        }
      },

      async primaryEntrance () {
        this.primaryLoading = true;
        await this.authorization();
        this.contentPermission = true;
        this.primaryLoading = false;

      },

      ...mapActions({
        authorization: 'login/authorization'
      })

    },



    mounted(): void {
      this.coverSelector(this.$route.name || '')
      this.primaryEntrance()

      const userId = getAuth()
      console.log('mount userId', userId)


    },
    updated(): void {
      this.coverSelector(this.$route.name || '')
    }

  })

</script>


<style scoped lang="scss">

  #app {
    height: calc(100vh - 16px);
    max-height: calc(100vh - 16px);
    overflow: auto;
    background-size: cover;
  }

  .global-loader {
    outline: 200px solid red;
    height: calc(100vh - 16px);
  }

  .preloader {
    height: 200px;
    width:  200px;
  }

  .base-1-a {
    background: url("./dal/images/backgrounds/wp-1.jpg") no-repeat center center fixed;
  }
  .base-1-b {
    background: url("./dal/images/backgrounds/wp-1b.jpg") no-repeat center center fixed;
  }
  .base-1-c {
    background: url("./dal/images/backgrounds/wp-1c.jpg") no-repeat center center fixed;
  }

  .base-2-a {
    background: url("./dal/images/backgrounds/wp-2.jpg") no-repeat center center fixed;
  }
  .base-2-b {
    background: url("./dal/images/backgrounds/wp-2b.jpg") no-repeat center center fixed;
  }
  .base-2-c {
    background: url("./dal/images/backgrounds/wp-2c.jpg") no-repeat center center fixed;
  }

  .base-3-a {
    background: url("./dal/images/backgrounds/wp-3.jpg") no-repeat center center fixed;
  }
  .base-3-b {
    background: url("./dal/images/backgrounds/wp-3b.jpg") no-repeat center center fixed;
  }
  .base-3-c {
    background: url("./dal/images/backgrounds/wp-3c.jpg") no-repeat center center fixed;
  }


  .base-4-a {
    background: url("./dal/images/backgrounds/wp-4.jpg") no-repeat center center fixed;
  }
  .base-4-b {
    background: url("./dal/images/backgrounds/wp-4b.jpg") no-repeat center center fixed;
  }
  .base-4-c {
    background: url("./dal/images/backgrounds/wp-4c.jpg") no-repeat center center fixed;
  }


  .base-5-a {
    background: url("./dal/images/backgrounds/wp-5.jpg") no-repeat center center fixed;
  }
  .base-5-b {
    background: url("./dal/images/backgrounds/wp-5b.jpg") no-repeat center center fixed;
  }
  .base-5-c {
    background: url("./dal/images/backgrounds/wp-5c.jpg") no-repeat center center fixed;
  }

  .base-6-a {
    background: url("./dal/images/backgrounds/wp-6.jpg") no-repeat center center fixed;
  }
  .base-6-b {
    background: url("./dal/images/backgrounds/wp-6b.jpg") no-repeat center center fixed;
  }
  .base-6-c {
    background: url("./dal/images/backgrounds/wp-6c.jpg") no-repeat center center fixed;
  }

  .container-wrapper {
  }

  .container {
    max-width: 1920px;
    margin: 0 auto;


  }

   /*8 495 539 36 81 */

</style>
