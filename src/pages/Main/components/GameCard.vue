<template>
  <div class="card-wrapper">

    <div class="flip-box-inner">

      <div class="front flexed columned">

        <div class="card-top">
          <div class="platform-icons flexed">
            <div v-for="platform in platformSorted" class="icons-wrapper">
              <div v-if="platform === 'Microsoft Windows'"><img :src="msWin_Pic" alt="Err"></div>
              <div v-if="platform === 'Xbox' "><img :src="xB_Pic" alt="Err"></div>
              <div v-if="platform === 'Xbox 360' "><img :src="xb360_Pic" alt="Err"></div>
              <div v-if="platform === 'Xbox One' "><img :src="xbOne_Pic" alt="Err"></div>
              <div v-if="platform === 'PlayStation 2' "><img :src="ps2_Pic" alt="Err"></div>
              <div v-if="platform === 'PlayStation 3' "><img :src="ps3_Pic" alt="Err"></div>
              <div v-if="platform === 'PlayStation 4' "><img :src="ps4_Pic" alt="Err"></div>
              <div v-if="platform === 'PlayStation 5' "><img :src="ps5_Pic" alt="Err"></div>
              <div v-if="platform === 'Nintendo Switch' "><img :src="nSwch_Pic" alt="Err"></div>
              <div v-if="platform === 'Wii U' "><img :src="nWii_Pic" alt="Err"></div>
            </div>
          </div>
          <img :src=game.cover alt="Err">
        </div>
        <div class="card-footer flexed columned">

          <div class="flexed jus-between stat-info aligned">
            <span class="font-S rating"> {{ game.shortName }}</span>
            <span class="font-S rating price" > {{ game.price }} $ </span>
          </div>

          <div class="rating flexed jus-between aligned">

            <div class="rating-body font-L">
              <div class="rating-active" :style="{width: (game.rating * 10) + '%'}"/>
            </div>
            <span class="font-N"> {{ game.year }}  </span>

          </div>

        </div>

      </div>

      <div class="back">
        <div class="card-back-top">
          <div class="header font-N"> {{ game.fullName }} ({{ game.year }})</div>
          <sub-header :items="game.developers" title="Developer"/>
          <sub-header :items="game.publishers" title="Publisher"/>
          <sub-header :items="game.genres"     title="Genre"/>
          <div class="description font-ES">{{game.description}}</div>
        </div>
        <div class="card-back-footer flexed aligned centred" >
          <my-button class="btn-custom font-S" @myClick="addNewCartItem(game)">Add to cart</my-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import ps2_Pic from '@/dal/images/platformLogos/ps2.png'
    import ps3_Pic from '@/dal/images/platformLogos/ps3.png'
    import ps4_Pic from '@/dal/images/platformLogos/ps4.png'
    import ps5_Pic from '@/dal/images/platformLogos/ps5.png'
    import msWin_Pic from '@/dal/images/platformLogos/msWin.png'
    import nSwch_Pic from '@/dal/images/platformLogos/nintendoSwch.png'
    import nWii_Pic from '@/dal/images/platformLogos/nWii.png'
    import xB_Pic from '@/dal/images/platformLogos/xBox.png'
    import xb360_Pic from '@/dal/images/platformLogos/xBox360.png'
    import xbOne_Pic from '@/dal/images/platformLogos/xBoxOne.png'
    import {sorter} from "@/utils/helpers";
    import SubHeader from "@/pages/Main/components/SubHeader";
    import {mapMutations} from 'vuex';

    export default {
        name: "GameCard",
        components: { SubHeader },

        data: () => ({
            ps2_Pic, ps3_Pic, ps4_Pic, ps5_Pic, msWin_Pic, nSwch_Pic, nWii_Pic, xB_Pic, xb360_Pic, xbOne_Pic
        }),

        methods: {
            ...mapMutations({
                addNewCartItem: 'game/addNewCartItem',
            })
        },

        computed: {
            platformSorted: function () {
                return this.game.platforms.sort((a, b) => sorter(a, b))
            }
        },

        props: {
            game: {
                year: Number,
                fullName: String,
                shortName: String,
                genre: String,
                price: Number,
                platforms: Array,
                developers: Array,
                publishers: Array,
                description: String,
                cover: String,
                id: String,
                rating: Number,
            }
        }

    }
</script>

<style scoped>

  .card-wrapper {
    background-color: transparent;
    width: 300px;
    height: 400px;
    margin: 40px;
    perspective: 1000px;
  }

  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .card-wrapper:hover .flip-box-inner {
    transform: rotateY(180deg);
  }

  .front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .front {
    background-color: #bbb;
    color: black;
    border-radius: 10px;
    border: 2px solid gold;
    box-shadow: 0 5px 30px 10px #aa196b;
  }

  /* Style the back side */
  .back {
    background-color: black;
    color: white;
    transform: rotateY(180deg);
    border-radius: 10px;
    border: 2px solid gold;
    box-shadow: 0 5px 50px 20px firebrick;

    display: flex;
    flex-direction: column;

  }

  .card-top {
    height: 70%;
    border-radius: 10px 10px 0 0;
    position: relative;
  }

  .platform-icons {
    position: absolute;
    background: rgba(106, 125, 128, 0.9);
    padding: 4px;
    border-radius: 5px 0 5px 0;
  }

  .icons-wrapper {
    margin-left: 3px;
  }

  .platform-icons div {
    width: 20px;
    height: 20px;
  }

  .platform-icons div img {
    width: 20px;
    height: 20px;

  }

  .card-top img {
    height: 100%;
    width: 300px;
    border-radius: 10px 10px 0 0;
  }

  .card-footer {
    background: black;
    height: 30%;
    padding: 0 15px;
    border-radius: 0 0 10px 10px;

  }

  .header {
    margin-top: 10px;
    padding: 0 10px;
    font-weight: bold;
  }

  .description {
    color: white;
    margin-top: 15px;
    padding: 0 10px;
  }

  .stat-info {
    height: 50%;
    align-content: center;
  }

  .rating {
    color: white;
  }

  .price {
    width: 50px;
    text-align: right
  }

  .rating-body {
    position: relative;
    font-size: 35px;
    margin-bottom: 5px;
  }

  .rating-body::before {
    content: '★★★★★';

  }

  .rating-active {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .rating-active::before {
    content: '★★★★★';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: gold;
  }

  .btn-custom {
    background: gold;
    color: black;
  }

  .card-back-top {
    max-height: 85%;
    border-radius: 10px 10px 0 0;
  }

  .card-back-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }




</style>