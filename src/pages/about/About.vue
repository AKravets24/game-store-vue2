<template>

  <div class="about-wrapper background">
    <h1 class="header col-sub-primary">Why do we love video games?</h1>

    <p class="font-L">
      Children and young adults love video games as they are fun and help to relax. At the same time, many
      adults claim that children spend too much time playing, which makes them violent and do not bring any
      benefit. However, facts indicate that video games are useful for the cognitive development of children
      and adults, while the myth of increased violence of players is not supported.
    </p>

    <p class="font-L">Video games are not a tool to solve all problems, but they have more advantages than many people
      think.
      First, games have a positive effect on cognitive and intellectual development (Etchells). For example,
      a player needs attentiveness, fast reaction, and often logical thinking to complete a mission in a shooter.
      Other games require attention and concentration, as well as ingenuity, to find a solution to a problem or task.
      Educational programs can also be built in the form of online games and bring more benefits than memorizing rules
      from books. Besides, games for adults also have such an advantage as they help developmental skills and memory.
      For example, Barr conducted a study and found that students playing video games improved their communication,
      resourcefulness, and adaptability significantly. At the same time, the idea that violent video games force people
      to be crueler has no convincing evidence, and scientists argue that the connection between the game process and
      increased aggression is very weak (Etchells). Consequently, video games cannot be called useless, harmful, or
      dangerous.</p>

    <p class="font-L"> In conclusion, video games can be useful for a person’s development as they help to develop
      various cognitive
      and intellectual skills. In addition, since the myth that video games make people more violent still has not
      found confirmed it is difficult to talk about their harm. However, all these statements are correct with an
      average number of playing hours, since a strong passion for any activity, even useful, can harm the mental
      and physical health of a person</p>

    <login-modal v-if="mdl_LoginShown" @closeModal="loginModalToggle()"/>
  </div>



</template>

<script>
    import {mapState,mapMutations} from 'vuex';
    import LoginModal from '@/pages/Login.vue'

    export default {
        name: "About",

        components: {LoginModal,},

        computed: {
            ...mapState({
                mdl_LoginShown: ({login}) => login.mdl_LoginShown,
            })
        },

        methods: {
            ...mapMutations({ loginModalToggle: 'login/loginModalToggle' })
        }

    }
</script>

<style scoped>

  .about-wrapper {
    width: 80%;
    margin: 40px auto;
  }

  .header {
    text-align: center;
  }


</style>