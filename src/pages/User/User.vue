<template>

  <div class="user-wrapper ">
    <div class="user-page background flexed columned centred">
      <div class="header">
        <h2 class="txt-cnt">Your profile</h2>
      </div>
      <div class="description flexed">
        <div class="avatar">
          <div>avatar</div>
          <my-button>Change avatar</my-button>

        </div>
        <div class="user-info">

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex';
    export default {
        name: "User",

        computed: {
            ...mapState({
                isAuth: ({login}) => login.isAuth,
            })
        },

        mounted() {
            if (!this.isAuth) {
                // window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/main')
                this.$router.push('/main')
            }
        },
    }
</script>

<style scoped>

  .user-wrapper {
    width: 80%;
    margin: 40px auto;
  }

</style>