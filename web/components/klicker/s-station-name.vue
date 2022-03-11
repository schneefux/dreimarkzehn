<template>
  <input
    type="text"
    v-model.lazy="nameFilter"
    placeholder="Name der Tankstelle"
    class="rounded font-semibold text-sm py-1 pl-2 border-2 form-input bg-gray-700 hover:bg-gray-500 border-gray-500 hover:border-sky-400 text-gray-200"
  >
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
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
  setup(props) {
    const nameFilter = computed({
      get(): string {
        return (props.value.stationName || [])[0] || ''
      },
      set(v: string) {
        if (v == '') {
          props.onInput({ stationName: [] })
        } else {
          props.onInput({ stationName: [v] })
        }
      }
    })

    return {
      nameFilter,
    }
  },
})
</script>