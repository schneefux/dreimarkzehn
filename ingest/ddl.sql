CREATE DATABASE IF NOT EXISTS dmz;

CREATE DICTIONARY IF NOT EXISTS dmz.stations (
  uuid UUID,
  name String INJECTIVE,
  brand String,
  street String,
  house_number String,
  post_code String,
  city String,
  latitude Float64,
  longitude Float64,
  first_active DateTime,
  openingtimes_json String
)
PRIMARY KEY uuid
SOURCE(FILE(path '/var/lib/clickhouse/user_files/stations/latest.csv' format 'CSVWithNames'))
LAYOUT(COMPLEX_KEY_HASHED())
LIFETIME(3600)
SETTINGS(allow_experimental_geo_types = true, date_time_input_format = 'best_effort'); -- TODO Point definieren für Geo-Queries

CREATE TABLE IF NOT EXISTS dmz.preise (
  date DateTime Codec(DoubleDelta, LZ4HC),
  station_uuid UUID Codec(LZ4HC),
  diesel Decimal32(2) Codec(DoubleDelta, LZ4HC),
  e5 Decimal32(2) Codec(DoubleDelta, LZ4HC),
  e10 Decimal32(2) Codec(DoubleDelta, LZ4HC),
  dieselchange UInt8 Codec(LZ4HC),
  e5change UInt8 Codec(LZ4HC),
  e10change UInt8 Codec(LZ4HC)
)
ENGINE = ReplacingMergeTree() -- löscht Duplikate nach sorting key eventually
PRIMARY KEY (station_uuid)
ORDER BY (station_uuid, date)
PARTITION BY (toStartOfMonth(date))
SAMPLE BY (station_uuid)
SETTINGS index_granularity=1024; -- 20-30 Preise pro Tag * 30 Tage Historie