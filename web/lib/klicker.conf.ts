import { Cube, Dimension, Metric, Slice } from "@schneefux/klicker/types"

const dayDimension: Dimension = {
  id: 'day',
  name: 'Tag',
  childIds: ['timestamp'],
  naturalIdAttribute: 'day',
  formatter: 'yyyy-MM-dd',
  additionalMetrics: [],
  type: 'temporal',
  scale: {
    nice: 'day',
  },
  config: {
    sql: 'toStartOfDay(date)',
    type: 'time',
  },
}

const timestampDimension: Dimension = {
  id: 'timestamp',
  name: 'Zeit',
  naturalIdAttribute: 'timestamp',
  formatter: 'yyyy-MM-ddTHH:mm:ss',
  additionalMetrics: [],
  type: 'temporal',
  scale: {
    nice: 'hour',
  },
  config: {
    sql: 'date',
    type: 'time',
  },
}

// uuid,name,brand,street,house_number,post_code,city,latitude,longitude,first_active,openingtimes_json

const stationNameMetric: Metric = {
  id: 'stationName',
  name: 'Station-Name',
  sign: -1,
  type: 'nominal',
  config: {
    sql: `dictGet('dmz.stations', 'name', tuple(any(station_uuid)))`,
    type: 'number',
  },
}

const stationDimension: Dimension = {
  id: 'station',
  name: 'Station',
  naturalIdAttribute: 'stationName',
  additionalMetrics: ['stationName'],
  type: 'nominal',
  config: {
    sql: 'station_uuid',
    type: 'string',
  },
}

const stationGeohashDimension: Dimension = {
  id: 'stationGeohash',
  name: 'Station-Geohash',
  childIds: ['station'],
  naturalIdAttribute: 'stationGeohash',
  additionalMetrics: [],
  type: 'nominal',
  config: {
    sql: `geohashEncode(dictGet('dmz.stations', 'longitude', tuple(station_uuid)), dictGet('dmz.stations', 'latitude', tuple(station_uuid)))`,
    type: 'string',
  },
}

const stationBrandDimension: Dimension = {
  id: 'stationBrand',
  name: 'Marke',
  childIds: ['station'],
  naturalIdAttribute: 'stationBrand',
  additionalMetrics: [],
  type: 'nominal',
  config: {
    sql: `dictGet('dmz.stations', 'brand', tuple(station_uuid))`,
    type: 'string',
  },
}

function makePrice(kind: string, name: string) {
  const avgMetric: Metric = {
    id: kind + 'Avg',
    name: 'Durchschnittlicher ' + name,
    formatter: '.2',
    d3formatter: '.2',
    sign: +1,
    type: 'quantitative',
    config: {
      sql: kind,
      type: 'avg',
    },
    vega: {
      scale: {
        zero: false,
      },
    },
  }

  const maxMetric: Metric = {
    id: kind + 'Max',
    name: 'Maximaler ' + name,
    formatter: '.2',
    d3formatter: '.2',
    sign: +1,
    type: 'quantitative',
    config: {
      sql: kind,
      type: 'max',
    },
    vega: {
      scale: {
        zero: false,
      },
    },
  }

  const minMetric: Metric = {
    id: kind + 'Min',
    name: 'Minimaler ' + name,
    formatter: '.2',
    d3formatter: '.2',
    sign: +1,
    type: 'quantitative',
    config: {
      sql: kind,
      type: 'min',
    },
    vega: {
      scale: {
        zero: false,
      },
    },
  }

  return [minMetric, avgMetric, maxMetric]
}

const [dieselMinMetric, dieselAvgMetric, dieselMaxMetric] = makePrice('diesel', 'Dieselpreis')
const [e5MinMetric, e5AvgMetric, e5MaxMetric] = makePrice('e5', 'Super-Preis')
const [e10MinMetric, e10AvgMetric, e10MaxMetric] = makePrice('e10', 'Super E10-Preis')

const stationSlice: Slice = {
  id: 'station',
  config: {
    member: 'station_dimension',
    operator: 'equals',
  },
}

const stationNameSlice: Slice = {
  id: 'stationName',
  config: {
    member: 'stationName_measure',
    operator: 'equals',
  },
}

const geohashSlice: Slice = {
  id: 'geo',
  config: {
    member: 'stationGeohash_dimension',
    operator: 'contains',
  }
}

const preiseCube: Cube = {
  id: 'preise',
  table: 'preise',
  name: 'Preise',
  dimensions: [
    dayDimension,
    timestampDimension,
    stationBrandDimension,
    stationDimension,
    stationGeohashDimension,
  ],
  defaultDimensionsIds: ['date'],
  metrics: [
    stationNameMetric,
    dieselMinMetric,
    dieselAvgMetric,
    dieselMaxMetric,
    e5MinMetric,
    e5AvgMetric,
    e5MaxMetric,
    e10MinMetric,
    e10AvgMetric,
    e10MaxMetric,
  ],
  defaultMetricIds: ['dieselAvg'],
  metaMetrics: ['timestamp'],
  slices: [
    stationSlice,
    stationNameSlice,
    geohashSlice,
  ],
  defaultSliceValues: {
    geo: [],
  },
}

const cubes: Record<string, Cube> = {
  preise: preiseCube,
}

export default cubes
