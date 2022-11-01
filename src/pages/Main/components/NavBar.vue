<template>
  <div class="navbar background flexed columned colored font-N">

    <div class="section-wrapper flexed columned">
      <span class="sub-header col-secondary font-L">Criterion</span>
      <my-select
              class="select-custom"
              defaultValue="Select criterion..."
              v-model:value="selectedCriteria"
              @change="criterionChange"
              :options="sortCriteria"/>

    </div>

    <div class="section-wrapper flexed columned">
      <span class="sub-header col-secondary font-L">Sort by</span>
      <my-select
              class="select-custom"
              defaultValue="Select type..."
              v-model:value="selectedOption"
              @change="sortChange"
              :options="sortOptions"/>
    </div>

    <div class="flexed columned margined">
      <span class="sub-header col-secondary font-L">Game modes</span>

      <div class="form-item" v-for="mode in modes">

        <input
                type="checkbox"
                :value="mode"
                class="input-chBox"
                :id="mode"
                name='modes'
                v-model="selectedModes"
        >
        <label class="label-chBox" :for="mode"> {{mode}} </label>
      </div>
    </div>

    <div class="flexed columned margined">
      <span class="sub-header col-secondary font-L">Genres</span>

      <div class="form-item" v-for="genre in genres">

        <input
                type="checkbox"
                :value="genre"
                class="input-chBox"
                :id="genre"
                name='genres'
                v-model="selectedGenres"
               >
        <label class="label-chBox" :for="genre"> {{genre}} </label>
      </div>
    </div>

    <div class="flexed columned margined">
      <span class="sub-header col-secondary font-L">Platforms</span>
      <div class="form-item" v-for="platform in platforms">
        <input class="input-chBox" :id="platform" name='genres'
               v-model="selectedPlatforms"
               type="checkbox" :value="platform">
        <label class="label-chBox" :for="platform"> {{platform}} </label>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "NavBar",

        data() {
            return {
                selectedGenres:    [],
                selectedPlatforms: [],
                selectedModes:     [],
            }
        },

        mounted() {
            this.queryParamsChecker();
        },

        methods: {
            ...mapMutations({
                setSearchedGenres:    'game/setSearchedGenres',
                setSearchedModes:     'game/setSearchedModes',
                setSearchedPlatforms: 'game/setSearchedPlatforms',
                setSelectedCriteria:  'game/setSelectedCriteria',
                setSelectedOption:    'game/setSelectedOption',
            }),

            criterionChange(value) {
                this.setSelectedCriteria(value);
                this.$router.push({query: {...this.$router.history.current.query, criteria: value}})

                // const { page = '1', pageSize = '10' } = this.$route.query;
            },
            sortChange(value) {
                this.setSelectedOption(value);
                this.$router.push({query: {...this.$router.history.current.query, sort: value}})
            },

            queryParamsChecker () {
                const { criteria = '', sort = '' } = this.$route.query;
                if (criteria && this.selectedCriteria !== +criteria) {
                    this.setSelectedCriteria(criteria);
                }
                if (sort && this.selectedOption !== sort) {
                    this.setSelectedOption(sort)
                }
            }
        },

        watch: {
            selectedGenres: function () {
                this.setSearchedGenres(this.selectedGenres);
            },
            selectedModes: function (){
                this.setSearchedModes(this.selectedModes);
            },
            selectedPlatforms: function () {
                this.setSearchedPlatforms(this.selectedPlatforms);
            },
        },

        computed: {
            ...mapState({
                genres:            ({game}) => game.genres,
                modes:             ({game}) => game.mode,
                platforms:         ({game}) => game.platforms,
                sortCriteria:      ({game}) => game.sortCriteria,
                sortOptions:       ({game}) => game.sortOptions,
                selectedCriteria:  ({game}) => game.selectedCriteria,
                selectedOption:    ({game}) => game.selectedOption,
            }),

        },
    }
</script>

<style scoped lang="scss">

  .navbar {
    max-width: 250px;
    /*margin-top: 40px;*/
    position: sticky;
    top: 0px;
    left: 45px;
  }

  .colored {
    color: wheat;
  }

  .select-custom {
    color: sienna;
    background: white;
  }

  .sub-header {
    margin: 10px;
    text-align: center;
  }

  .form-item {
    display: flex;

  }

  /*.input-chBox {*/
  /*  margin: 0 10px;*/
  /*  font-size: 50px;*/
  /*  transform:scale(1.3);*/
  /*  cursor: pointer;*/
  /*}*/

  /*.label-chBox {*/
  /*  cursor: pointer;*/
  /*  !*color: white;*!*/
  /*}*/


</style>