curl -L https://www.data.gouv.fr/fr/datasets/r/f4935ed4-7a88-44e4-8f8a-33910a151d42 | tail -n +4 | sed 's/;/,/g'> covid.csv
sqlite3 -csv -batch covid.db "drop table if exists covid" ".import covid.csv covid" ".header on" ".once pctgrowcovid.csv" "select * from pctgrowavg7 where pays = 'France' and deces >= 10 order by Date"
git commit -am update
git push
