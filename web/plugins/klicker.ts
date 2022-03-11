import Vue from 'vue'
import config from '~/lib/klicker.conf'
import { Context } from "@nuxt/types"
import { Config, SlicerSpec, StaticWidgetSpec, ValueType, VisualisationSpec } from "@schneefux/klicker/types"
import Klicker from '@schneefux/klicker/service'
import { CQuery } from '@schneefux/klicker/components'
import visualisations from '~/lib/klicker.visualisations.conf'
import slicers from '~/lib/klicker.slicers.conf'
import staticWidgets from '~/lib/klicker.widgets.conf'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { BShimmer, BButton, BCard, BSelect, BLightbox, BCheckbox, BRadio, BPage, BPageSection, BScrollingDashboard } from '@schneefux/klicker/components'

declare module 'vue/types/vue' {
  interface Vue {
    $klicker: CustomKlicker
    $managerUrl: string
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $klicker: CustomKlicker
  }
  interface Context {
    $klicker: CustomKlicker
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $klicker: CustomKlicker
  }
}

class CustomKlicker extends Klicker {
  constructor(cubeUrl: string,
      config: Config,
      visualisations: VisualisationSpec[],
      staticWidgets: StaticWidgetSpec[],
      slicers: SlicerSpec[],
      private context: Context) {
    super(cubeUrl, config, visualisations, staticWidgets, slicers)
  }

  // override Klicker.$t
  public $te(key: string) {
    return this.context.i18n.t(key) != key
  }

  // override Klicker.$t
  public $t(key: string, args?: any) {
    if (this.$te(key)) {
      return this.context.i18n.t(key, args) as string
    }
    return super.$t(key, args)
  }

  // override Klicker.format
  public format(spec: { type: ValueType, formatter?: string }, value: number|string|string[]): string {
    return super.format(spec, value)
  }
}

export default defineNuxtPlugin((context, inject) => {
  Vue.component('c-query', CQuery)
  Vue.component('b-shimmer', BShimmer)
  Vue.component('b-card', BCard)
  Vue.component('b-button', BButton)
  Vue.component('b-select', BSelect)
  Vue.component('b-lightbox', BLightbox)
  Vue.component('b-checkbox', BCheckbox)
  Vue.component('b-radio', BRadio)
  Vue.component('b-page', BPage)
  Vue.component('b-page-section', BPageSection)
  Vue.component('b-scrolling-dashboard', BScrollingDashboard)

  const service = new CustomKlicker(context.$config.cubeUrl, config, visualisations, staticWidgets, slicers, context)

  inject('klicker', service)
})
