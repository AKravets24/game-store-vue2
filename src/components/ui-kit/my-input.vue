<template>
  <!--  :value="modelValue"-->
<!--  @input="changeInput"-->

  <input
          :value="value"
          @input="$emit('input', $event.target.value)"
          class="input" type="text"
          :class="{
            'medium': size === 'medium',
            'small':  size === 'small',
            'large':  size === 'large',
          }"
          :placeholder="placeholder"
  >
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api';


  export default defineComponent({

    name: "MyInput",

    methods: {
      changeInput({target}: {target: HTMLInputElement}) {
        this.$emit('input', target.value)
      },
    },


    emits: ['update:modelValue'],

    props: {
      value:       { type: String },
      placeholder: { type: String,  required: false, },
      title:       { type: String },
      size:        { type: String,  required: false,  default: 'medium' },
    }
  })
</script>

<!--<style src="@/frontend/mixins/_mixins.less" lang="less"/>-->

<style scoped lang="scss">
  .input {
    width: calc(100% - 10px);
    margin: 5px auto;
    padding: 3px;
    outline: none;
    border: 3px solid rgba(128, 128, 128, 0.5);
    border-radius: 4px;

  }

</style>

<!-- v-model="modelValue"-->