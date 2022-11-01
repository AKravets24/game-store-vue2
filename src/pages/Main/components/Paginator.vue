<template>
  <div v-if="totalItems" class="paginator flexed justifyed aligned ">
    <my-button
            :disabled="pagesFrom <= 0"
            class="pag-btn font-N"
            :class="{denied: pagesFrom <= 0}"
            @myClick="pagesDec"
    > << </my-button>
    <template v-for="( page, idx ) in pagesAmount">
      <my-button
              v-if="idx >= pagesFrom && idx <= pagesTill"
              class="pag-btn font-N"
              :class="{ active: currentPage === page }"
              @myClick="setPage(page)"> {{ page }}
      </my-button>
    </template>
    <my-button
            class="pag-btn font-N"
            :class="{denied: pagesTill >= pagesAmount - 1}"
            :disabled="pagesTill >= pagesAmount - 1"
            @myClick="pagesInc"
    > >> </my-button>
    <div>
      <my-select
              class="select-custom font-N"
              defaultValue="Set size"
              :value="selectedSize"
              @change="setSize"
              :options="pageSizes"/>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Paginator",

        props: {
            currentPage:  { type: Number, required: true },
            totalItems:   { type: Number, required: true },
            selectedSize: { type: String, required: true },
        },
        emits: ['setPage'],

        data: () => {
            return {
                pageSizes: [
                    { name: '5',  value: 5  },
                    { name: '10', value: 10 },
                    { name: '15', value: 15 },
                    { name: '20', value: 20 },
                ],
                pagesFrom: 0,
                pagesTill: 4,
            }
        },

        methods: {
            setPage(page) {
                this.$emit('setPage', page);
                const queryPage = this.$router.history.current.query?.page || '0';
                if (queryPage !== page) {
                    this.$router.push({query: {...this.$router.history.current.query, page}})
                }

                // this.$router.push({query: {...this.$router.history.current.query, page}});
            },

            setSize(value) {
                this.$emit('setSize', value)
                this.pagesFrom = 0;
                this.pagesTill = 4;
                // this.$router.push({query: {...this.$router.query, pageSize: value, page: 1}})
                this.$router.push({query: {...this.$router.history.current.query, pageSize: value, page: 1}})
            },

            setDiapasone() {
                const cardsTill = (this.currentPage * this.selectedSize) - 1;
                const cardsFrom = (cardsTill + 1) - this.selectedSize;
                this.$emit('setDiapasone', {cardsFrom, cardsTill})
            },

            pagesDec() {
                this.pagesFrom --;
                this.pagesTill --;
            },

            pagesInc() {
                this.pagesFrom ++;
                this.pagesTill ++;
            },

        },

        computed: {
            pagesAmount: function () {
                return Math.ceil(this.totalItems / this.selectedSize)
            },
        },

        watch: {
            currentPage: function () {
                this.setDiapasone();
            },

            selectedSize: function () {
                this.setDiapasone();
                this.$emit('setPage', 1);
            },

            totalItems: function () {
                this.$emit('setPage', 1);
            },
        },

    }
</script>

<style scoped>
  .paginator {
    width: 100%;
    height: 40px;
  }
  .select-custom,
  .pag-btn {
    height: 40px;
    min-width:  40px;
    font-weight: 700;
    color: sandybrown;
    border: 1px solid sandybrown;
  }

  .active {
    background: sandybrown;
    color: white;
  }

  .denied:hover {
    cursor: not-allowed;
  }


</style>