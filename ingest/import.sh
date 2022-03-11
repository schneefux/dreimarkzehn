#!/bin/bash

mkdir -p ./data/{unprocessed,processed}/

cd ./data/unprocessed/
for file in ./*.csv
do
  if [ ! -e "$file" ]
  then
    echo "Nichts zu importieren"
    exit 0
  fi

  echo "Importiere $file..."
  cat "$file" | clickhouse-client --date_time_input_format best_effort --query "INSERT INTO dmz.preise FORMAT CSVWithNames"
  mv "$file" ../processed/
done

clickhouse-client --query "OPTIMIZE TABLE dmz.preise"