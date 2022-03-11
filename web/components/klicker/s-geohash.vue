<template>
  <b-button
    @click="onUpdate"
    md
    primary
  >
    Standort verwenden
  </b-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SliceValue, SliceValueUpdateListener } from '@schneefux/klicker/types'
import Geohash from 'latlon-geohash'

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
    const onUpdate = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const geohash = Geohash.encode(pos.coords.latitude, pos.coords.longitude, 4)
        console.log(geohash, props.value)
        props.onInput({ geo: [geohash] })
      }, (error) => console.error(error), { enableHighAccuracy: true })
    }

    return {
      onUpdate,
    }
  },
})
</script>