<template>

  <div class="cart-wrapper">

    <div v-if="orders.length" class="order-wrapper flexed columned aligned">

      <h2 class="header">
        Order details
      </h2>

      <form ref="formElem" @submit.prevent="submitter">

        <table>
          <tr>
            <td class="table-header font-N"></td>
            <td class="table-header font-N">Name</td>
            <td class="text-center table-header font-N">Price $</td>
            <td class="text-center table-header font-N">Amount</td>
            <td class="text-center table-header font-N">Quantity</td>
            <td class="text-center table-header font-N">Discount</td>
            <td class="text-center table-header font-N">Platform</td>
          </tr>
          <tr :key="order.id" v-for="( order, idx ) in orders">
            <td class="font-N"> {{ idx + 1 }}</td>
            <td class="font-N"> {{ order.fullName }}</td>
            <td class="text-center font-N"> {{ order.price }}</td>
            <td>
              <div class="cell-wrapper">
                <my-button class="btn-amount" @myClick="cartItemsAmountDec(idx)"><span class="span font-S">-</span>
                </my-button>
                <span class="font-N"> {{ order.amount }} </span>
                <my-button class="btn-amount" @myClick="cartItemsAmountInc(idx)"><span class="span font-S">+</span>
                </my-button>
              </div>

            </td>
            <td class="text-center font-N"> {{ order.price * order.amount }}</td>

            <td class="text-center font-N">{{ order.discount }}</td>
            <td>
              <div class="select-wrapper">
                <my-select
                        name="platforms"
                        defaultValue="Select platform"
                        v-model:value="order.platforms[0]"
                        :options="order.platforms"
                        class="cart-select"
                />
              </div>
            </td>
            <td>
              <my-button class="table-btn" @myClick="deleteItemFromCart(idx)">
                <img class="icon" :src="basketIcon" alt="Err">
              </my-button>
            </td>
          </tr>
        </table>

        <div class="order-footer flexed columned aligned font-N" v-if="orders.length">
          <div>Total price: {{ totalPrice }} $</div>
          <div>Total items: {{ orders.length }}</div>
          <div>
            <my-button class="table-btn font-N"
                       type="submit"
            >Buy
            </my-button>
          </div>
        </div>

      </form>

    </div>

    <div class="order-wrapper flexed columned aligned" v-if="!orders.length">
      <div class="empty-block flexed aligned">
        <img :src="basketPic" alt="Err">
      </div>
    </div>
    <login-modal v-if="mdl_LoginShown"  @closeModal="loginModalToggle()"/>
  </div>

</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';
  import {mapState, mapMutations} from 'vuex';
  import {CartItem_Type} from "@/store/storeModule";      //@ts-ignore
  import basketIcon from "@/dal/images/icons/basket.png"; //@ts-ignore
  import basketPic from "@/dal/images/pictures/emptyCart.png";
  import {normalizeFormValues} from "@/utils/helpers";
  import LoginModal from '@/pages/Login.vue';

  export default defineComponent({
    name: "Cart",
    components: { LoginModal, },

    data: () => {
      return {
        selectedOption: 'Microsoft Windows',
        basketIcon, basketPic
      }
    },

    computed: {
      totalPrice() {
        let total = 0;
        this.orders.forEach((el) => total += el.price * el.amount);
        return total;
      },

      ...mapState({
        mdl_LoginShown: ({login}: any) => login.mdl_LoginShown,
        orders: ({game}: any) => game.orders as CartItem_Type[],
      })
    },
    methods: {
      submitter() {
        const formElement = this.$refs.formElem;
        const formData = new FormData(formElement as HTMLFormElement);
        const selectedPlatforms = formData.getAll('platforms');
        const transformedValues = this.orders.map((el,i) => {
          return {...el, platforms: selectedPlatforms[i]}
        });

        const normValues = normalizeFormValues(transformedValues)
        console.log('normValues', normValues)
      },

      ...mapMutations({
        addNewCartItem:     'game/addNewCartItem',
        cartItemsAmountInc: 'game/cartItemsAmountInc',
        cartItemsAmountDec: 'game/cartItemsAmountDec',
        deleteItemFromCart: 'game/deleteItemFromCart',
        loginModalToggle:   'login/loginModalToggle',
      })
    },


  })
</script>

<style scoped lang="scss">

  .span {
    width: 10px;
    display: block;
  }

  /*.cart-wrapper {*/
  /*  height: calc(98vh - 70px);*/
  /*}*/

  .order-wrapper {
    border-radius: 10px;
    max-width: 90%;
    padding: 20px 20px;
    position: sticky;
    top: 50px;
    left: 45px;
    background: rgba(19, 11, 12, 0.9);
    color: white;
    margin-top: 40px;
    min-height: 80vh;
  }

  .header {
    text-align: center;
  }

  .table-header {
    color: wheat;
    min-width: 30px;
  }

  .text-center {
    text-align: center;
    padding: 0 15px;
  }

  .cell-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-amount {
    border-radius: 50% !important;
    border: none;
    background: sandybrown;
    font-weight: bold;
    /*font-family: monospace;*/
    height: 30px;
    width: 30px;
  }

  .select-wrapper {
    width: 250px;
    margin: 0 auto;
  }

  .table-btn {
    min-height: 40px;
    background: sandybrown;
  }

  .icon {
    width: 15px;
    height: 15px;
  }

  .cart-select {
    color: sandybrown;
    background: transparent;
  }

  .cart-select option {
    background: red;
  }

  .order-footer {
    margin: 40px auto;
  }

  .empty-block {
    height: 80vh;
  }


</style>