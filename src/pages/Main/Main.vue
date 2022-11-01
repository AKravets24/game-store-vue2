<template>
  <div class="main-wrapper">
    <div class="search flexed aligned">
      <span class="input-wrapper">
        <my-input v-model:value="searchValue" class="search-input" @input="setInput" placeholder='Search...'/>
      </span>
    </div>
    <div class="content-wrapper flexed">
      <login-modal v-if="mdl_LoginShown" @closeModal="loginModalToggle()"/>

      <div class="navbar-wrapper">
        <nav-bar/>
      </div>

      <div class="game-list-wrapper">
        <div class="pag-wrapper">
          <paginator @setPage="setPage"
                     @setDiapasone="setDiapasone"
                     @setSize="setSize"
                     :currentPage="currentPage"
                     :totalItems="searchedPosts.length"
                     :selectedSize="selectedSize"
          />
        </div>

        <div class="card-wrapper1 flexed justifyed wrapped">
          <template v-for="(game, idx) in searchedPosts">
            <game-card v-if="idx >= cardsFrom && idx <= cardsTill" :game="game"/>
          </template>
        </div>

        <div class="pag-wrapper">
          <paginator @setPage="setPage"
                     @setDiapasone="setDiapasone"
                     @setSize="setSize"
                     :currentPage="currentPage"
                     :totalItems="searchedPosts.length"
                     :selectedSize="selectedSize"
          />
        </div>

      </div>

    </div>


  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';
  import {mapState, mapActions, mapMutations, mapGetters} from 'vuex';
  import NavBar from "@/pages/Main/components/NavBar.vue";
  import {GameCard_Type} from '@/dal/gameCards';
  import GameCard from '@/pages/Main/components/GameCard.vue'
  import Paginator from "@/pages/Main/components/Paginator.vue";
  import LoginModal from '@/pages/Login.vue';

  export default defineComponent({
    name: "Main",

    components: {NavBar, GameCard, Paginator, LoginModal},

    data: () => ({
      searchValue: ''    as string,
      cardsFrom:    0    as number,
      cardsTill:    9    as number,
      currentPage:  1    as number,
      selectedSize: '10' as string,
    }),

    computed: {
      ...mapState({
        games:          ({game}:  any) => game.games as GameCard_Type,
        isLoading:      ({game}:  any) => game.isLoading,
        isError:        ({game}:  any) => game.isError,
        mdl_LoginShown: ({login}: any) => login.mdl_LoginShown,
      }),
      ...mapGetters({searchedPosts: 'game/searchedPosts'}),
    },

    methods: {

      setPage(page: number): number {
        // console.log('setPage', page)
        return this.currentPage = page;
      },
      setDiapasone({cardsFrom, cardsTill}: { cardsFrom: number, cardsTill: number }) {
        this.cardsFrom = cardsFrom;
        this.cardsTill = cardsTill;
      },
      setSize(value: string) {
        this.selectedSize = value
      },

      ...mapActions({getGames: 'game/getGames'}),
      ...mapMutations({
        setDebounce: 'game/setDebounce',
        loginModalToggle: 'login/loginModalToggle',
      }),

      setInput(value: string) {
        this.searchValue = value;
        this.setDebounce({value, delay: 1000})
      },
    },

    async mounted(): Promise<void> {
      const { page = '1', pageSize = '10' } = this.$route.query;

      if ( pageSize && this.selectedSize !== pageSize) {
        (this.selectedSize as any) = pageSize;
      }

      await this.getGames();

      if (page && this.currentPage !== +page) {
        this.currentPage = +page;
      }

    },

  })
</script>

<style scoped>

  .main-wrapper {
  }

  .input-wrapper {
    width: 100%;
  }

  .search {
    height: 150px;
    padding: 0 10%;
  }

  .search-input {
    height: 40px;
    font-size: 25px;
  }

  .content-wrapper {
    /*outline: 2px solid red;*/
    min-height: 95vh;
    width: auto;
  }

  .navbar-wrapper {
    min-height: 95vh;
    /*outline: 2px solid blue;*/
    min-width: 350px;
    padding: 0 15px;
    /*background: rgba(106, 125, 128, 0.84);*/
    position: relative;
  }

  .pag-wrapper {
    max-width: 500px;
    width: 50%;
    min-width: 440px;
    margin: 0 auto;
  }

  .game-list-wrapper {
    padding-bottom: 30px;
  }


</style>