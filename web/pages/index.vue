<template>
  <b-page title="Kostet Benzin schon drei Mark zehn?">
    <c-dashboard
      v-model="base"
      :slicer-components="['s-geohash']"
      slicer
    ></c-dashboard>

    <b-page-section title="Günstigste Tankstellen">
      <b-scrolling-dashboard>
        <c-dashboard-cell
          v-for="kind in kinds"
          :key="kind"
          :rows="4"
          :columns="4"
        >
          <c-query
            :query="{
              cubeId: 'preise',
              dimensionsIds: ['station'],
              metricsIds: [kind + 'Avg'],
              slices: base.slices,
              sortId: kind + 'Avg',
            }"
          >
            <template v-slot="data">
              <v-table
                v-bind="data"
                :card="{ fullHeight: true }"
              ></v-table>
            </template>
          </c-query>
        </c-dashboard-cell>
      </b-scrolling-dashboard>
    </b-page-section>

    <b-page-section title="Preisentwicklung der letzten Tage">
      <b-scrolling-dashboard>
        <c-dashboard-cell
          v-for="kind in kinds"
          :key="kind"
          :rows="4"
          :columns="4"
        >
          <c-query :query="{
            cubeId: 'preise',
            dimensionsIds: ['day'],
            metricsIds: [kind + 'Avg'],
            slices: base.slices,
            sortId: 'day',
          }">
            <template v-slot="data">
              <v-lineplot
                v-bind="data"
                :card="{ fullHeight: true }"
              ></v-lineplot>
            </template>
          </c-query>
        </c-dashboard-cell>
      </b-scrolling-dashboard>
    </b-page-section>

    <b-page-section title="Günstigste Marken">
      <b-scrolling-dashboard>
        <c-dashboard-cell
          v-for="kind in kinds"
          :key="kind"
          :rows="4"
          :columns="4"
        >
          <c-query :query="{
            cubeId: 'preise',
            dimensionsIds: ['stationBrand'],
            metricsIds: [kind + 'Avg'],
            slices: base.slices,
            sortId: kind + 'Avg',
          }">
            <template v-slot="data">
              <v-auto
                v-bind="data"
                :card="{ fullHeight: true }"
              ></v-auto>
            </template>
          </c-query>
        </c-dashboard-cell>
      </b-scrolling-dashboard>
    </b-page-section>
  </b-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { VLineplot, BPage, BPageSection, BScrollingDashboard, CDashboard, CQuery, CDashboardCell, VRoll, VTable, VAuto } from '@schneefux/klicker/components'

export default defineComponent({
  components: {
    VLineplot,
    BPage,
    BPageSection,
    BScrollingDashboard,
    CDashboard,
    CDashboardCell,
    CQuery,
    VRoll,
    VTable,
    VAuto,
  },
  setup() {
    const base = ref({
      cubeId: 'preise',
      dimensionsIds: ['station'],
      metricsIds: ['dieselAvg'],
      slices: {},
      sortId: 'dieselAvg',
    })

    const kinds = ['diesel', 'e5', 'e10']

    return {
      base,
      kinds,
    }
  },
})
</script>
