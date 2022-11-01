<template>
  <div class="dev-info">
    <span class="sub-header" v-if="items.length===1"> {{ title }}: </span>
    <span class="sub-header" v-if="items.length>1">   {{ title + 's'}}: </span>
    <span v-for="(item, idx) in items">
              <span v-if="idx !==  items.length-1"> {{ item }},     </span>
              <span v-else-if="idx ===  items.length-1"> {{ item }} </span>
            </span>
  </div>
</template>

<script lang="ts">
  export default {
    name: "SubHeader",
    props: {
      items:  {type: Array, required: true},
      title:  {type: String, required: true},
    }
  }

</script>

<style scoped>

  .dev-info {
    margin-top: 10px;
    padding: 0 15px;
  }

  .sub-header {
    margin-top: 20px;
    font-weight: bold;
  }

</style>