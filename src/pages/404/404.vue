<template>
  <div class="not-found-wrapper  flexed columned centred aligned">
    <div class="not-found background">
      <img :src="notFoundPic" alt="Err">
      <h1 class="col-primary txt-cnt">Page your looking is not found!</h1>
      <h2 class="txt-cnt"><router-link class="link  col-sub-secondary" to="/">Back to home</router-link></h2>
    </div>

  </div>
</template>

<script>
  import Page404Img from '@/dal/images/pictures/404.png'

    export default {
        name: "Page404",
        data: () => ({notFoundPic: Page404Img})
    }
</script>

<style scoped>

  .not-found-wrapper {
    height: calc(100vh - 100px);
  }

  .not-found {

  }

  .not-found-wrapper img {
    height: 500px;
    width:  600px;
    opacity: 0.25;
    border-radius: 10px;
  }

</style>