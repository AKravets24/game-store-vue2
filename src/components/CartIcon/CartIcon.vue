<template>

  <div class="cart-wrapper">

    <div class="cart-icon">

      <div v-if="orderSize === 0" class="flexed justifyed aligned cart-icon-wrapper">
        <img :src="CartEmpty_Pic" alt="Err">
        <span>{{ orderSize }}</span>
      </div>

      <div v-else-if="orderSize === 1" class="flexed justifyed aligned cart-icon-wrapper">
        <img :src="CartLevel_1_Pic" alt="Err">
        <span>{{ orderSize }}</span>
      </div>

      <div v-else-if="orderSize === 2" class="flexed justifyed aligned cart-icon-wrapper">
        <img :src="CartLevel_2_Pic" alt="Err">
        <span>{{ orderSize }}</span>
      </div>

      <div v-else-if="orderSize === 3" class="flexed justifyed aligned cart-icon-wrapper">
        <img :src="CartLevel_3_Pic" alt="Err">
        <span>{{ orderSize }}</span>
      </div>

      <div v-else-if="orderSize >= 4" class="flexed justifyed aligned cart-icon-wrapper">
        <img :src="CartLevel_4_Pic" alt="Err">
        <span>{{ orderSize }}</span>
      </div>

    </div>

  </div>

</template>

<script lang="ts">

  import {defineComponent} from '@vue/composition-api';             //@ts-ignore
  import CartEmpty_Pic     from '@/dal/images/icons/cart-empty.png' //@ts-ignore
  import CartLevel_1_Pic   from '@/dal/images/icons/cart-lv-1.png'  //@ts-ignore
  import CartLevel_2_Pic   from '@/dal/images/icons/cart-lv-2.png'  //@ts-ignore
  import CartLevel_3_Pic   from '@/dal/images/icons/cart-lv-3.png'  //@ts-ignore
  import CartLevel_4_Pic   from '@/dal/images/icons/cart-lv-4.png'  //@ts-ignore

  import {mapState} from 'vuex';
  import {CartItem_Type} from "@/store/storeModule";


  export default defineComponent({
    name: "CartIcon",

    data: () => ({CartEmpty_Pic, CartLevel_1_Pic, CartLevel_2_Pic, CartLevel_3_Pic, CartLevel_4_Pic,}),

    computed: {
      ...mapState({
        orderSize: ({game}: any) => game.orders.length,
      })
    }
  })
</script>

<style scoped>
  .cart-wrapper {
    height: 100%;
    width: 65px;
  }

  .cart-icon-wrapper {

  }

  .cart-icon-wrapper img {
    height: 30px;
    width:  30px;
  }

  .cart-icon-wrapper span {
  }

</style>