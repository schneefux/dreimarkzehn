<template>
  <b-select
    :value="value.brawler || ''"
    dark
    sm
    @input="v => onInput({ station: v == '' ? [] : [v] })"
  >
    <option
      value=""
    >{{ $t('option.any-brawler') }}</option>
    <option
      v-for="s in stations"
      :key="s.id"
      :value="s.id"
    >{{ s.name }}</option>
  </b-select>
</template>

<script lang="ts">
import { defineComponent, PropType, useAsync, useContext } from '@nuxtjs/composition-api'
import { SliceValue, SliceValueUpdateListener } from '@schneefux/klicker/types'

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<SliceValue>,
      required: true
    },
    onInput: {
      type: Function as PropType<SliceValueUpdateListener>,
      required: true
    },
  },
  setup() {
    const stations = []

    return {
      stations,
    }
  },
})
</script>