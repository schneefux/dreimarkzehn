import { SlicerSpec } from "@schneefux/klicker/types"

const slicers: SlicerSpec[] = [{
  name: 'Station',
  component: 's-station',
  import: () => import('~/components/klicker/s-station.vue'),
  applicable(dimensions) {
    return dimensions.some(d => d.id == 'station')
  },
}, {
  name: 'Geo',
  component: 's-geohash',
  import: () => import('~/components/klicker/s-geohash.vue'),
  applicable(dimensions) {
    return dimensions.some(d => d.id == 'station')
  },
}]

export default slicers
