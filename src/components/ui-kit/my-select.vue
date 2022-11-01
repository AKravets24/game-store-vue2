<template>
  <select
          :value="value"
          @change="$emit('change', $event.target.value)"
          class="base bordered font-N"
  >

    <option v-if="defaultValue" disabled value=""> {{ defaultValue }}</option>
    <option v-else disabled value="">Select from the list...</option>


    <template v-if="options[0].name !== undefined && options[0].value !== undefined">
      <option v-for="option in options"
              :key="option.value"
              :value="option.value"
              selected
      >{{ option.name }}
      </option>
    </template>

    <template v-else>
      <option v-for="option in options"
              :key="option"
              :value="option"
      >{{ option }}
      </option>
    </template>

  </select>

</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';

  export default defineComponent({
    name: "my-select",

    emits: ['change:value'],

    props: {
      defaultValue:
          {type: String, required: false},
      value: {
        type: String,
      },
      options: {
        type: Array, required: true,
        default: () => []
      },
      size: {
        type: String,
        required: false,
        default: 'large'
      },
    }
  })
</script>


<style scoped>

  .base {
    outline: none;
    width: 100%;
    margin: 0 0 1% 0;
    padding: 1% 0 1% 2%;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
  }

</style>

