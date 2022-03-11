
/* generated on 2022-03-10T20:18:47.089Z */

cube('preise', {
sql: `SELECT * FROM dmz.preise`,
rewriteQueries: true,

measures: {

  stationName_measure: {
    title: 'Station-Name',

    sql: "dictGet('dmz.stations', 'name', tuple(any(station_uuid)))",
    type: 'number',
  },

  dieselMin_measure: {
    title: 'Minimaler Dieselpreis',

    sql: "diesel",
    type: 'min',
  },

  dieselAvg_measure: {
    title: 'Durchschnittlicher Dieselpreis',

    sql: "diesel",
    type: 'avg',
  },

  dieselMax_measure: {
    title: 'Maximaler Dieselpreis',

    sql: "diesel",
    type: 'max',
  },

  e5Min_measure: {
    title: 'Minimaler Super-Preis',

    sql: "e5",
    type: 'min',
  },

  e5Avg_measure: {
    title: 'Durchschnittlicher Super-Preis',

    sql: "e5",
    type: 'avg',
  },

  e5Max_measure: {
    title: 'Maximaler Super-Preis',

    sql: "e5",
    type: 'max',
  },

  e10Min_measure: {
    title: 'Minimaler Super E10-Preis',

    sql: "e10",
    type: 'min',
  },

  e10Avg_measure: {
    title: 'Durchschnittlicher Super E10-Preis',

    sql: "e10",
    type: 'avg',
  },

  e10Max_measure: {
    title: 'Maximaler Super E10-Preis',

    sql: "e10",
    type: 'max',
  }
},

dimensions: {

  day_dimension: {
    title: 'Tag',
    sql: "toStartOfDay(date)",
    type: 'time',
    shown: true,
  },

  timestamp_dimension: {
    title: 'Zeit',
    sql: "date",
    type: 'time',
    shown: true,
  },

  stationBrand_dimension: {
    title: 'Marke',
    sql: "dictGet('dmz.stations', 'brand', tuple(station_uuid))",
    type: 'string',
    shown: true,
  },

  station_dimension: {
    title: 'Station',
    sql: "station_uuid",
    type: 'string',
    shown: true,
  },

  stationGeohash_dimension: {
    title: 'Station-Geohash',
    sql: "geohashEncode(dictGet('dmz.stations', 'longitude', tuple(station_uuid)), dictGet('dmz.stations', 'latitude', tuple(station_uuid)))",
    type: 'string',
    shown: true,
  }
}
})