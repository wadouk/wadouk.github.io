#git pull --rebase
# https://www.data.gouv.fr/fr/datasets/coronavirus-covid19-evolution-par-pays-et-dans-le-monde-maj-quotidienne/
curl -L https://www.data.gouv.fr/fr/datasets/r/f4935ed4-7a88-44e4-8f8a-33910a151d42 |  grep -v -e "^#" -e "--" | sed 's/;/,/g'> covid.csv
sqlite3 -csv -batch covid.db "drop table if exists covid" ".import covid.csv covid" ".header on" ".once pctgrowcovid.csv" "select * from pctgrowavg7 where deces >= 10 and Date <> date('now') order by Date"
#git commit -am update
#git push
