---
layout: post
title : Je me posais la question de l'efficacité en France du confinement
---

On trouve beaucoup d'interprétation statistique de la progression de la pandémie.
Macron avait parlé de ralentir la progression de l'épidémie, faudrait plutôt l'arréter.
On parle d'applatir la courbe mais encore faudrait il déjà qu'elle monte moins vite.

# Combat de chiffre

Pour ce faire j'ai préféré un autre indicateur, le **pourcentage de croissance** :
 - si le chiffre monte, la mortalité augmente de jours en jours
 - si le chiffre baisse, la mortalité diminue
 - si c'est à zero, tout juste stable
 - si on est en dessous de zéro, c´est gagné !
 - Mais attention au rebonds
 
 Cet indicateur me parait plus pertinent que juste "empiler les morts" même avec une échelle logarithmique : 
 il me parait difficile d'évaluer si une courbe infléchie, alors que monter, descendre, stable ... plus clair, non ?
 
 Mais je ne suis pas statisticien ni épidémilogiste, juste informaticien accoutumé à ces petits chefs qui veulent leur indicateur. Autant sortir le bon. 
 
# Comment sont fait les calculs

A partir des données [open data](https://www.data.gouv.fr/fr/datasets/coronavirus-covid19-evolution-par-pays-et-dans-le-monde-maj-quotidienne/#_) 
que [politologue](https://politogue.com) a agrégé, je refais un calcul. 
 - Ce qu'il mets à dispo est le nombre de morts cumulé
 - Il faut commencer par faire la différence entre la veille et aujourdhui
 - Puis calcul le pourcentage d'accroissement
 
 ## Au début
 
 d1 = aujourdhui
 
 d2 = hier
 
 d3 = avant-hier
 
 d4 = la veille de l'épidémie
 
 | Date | Déces |
 | ---- | ------| 
 | d1   | m1    | 
 | d2   | m2    | 
 | d3   | m3    | 
 | d4   | 0    | 

## Ce qui donne
 | Date | Déces du jour | Taux | 
 | ---- | ------| --- | 
 | d1   | m2-m1 | ( (m2 - m1) - (m3 - m2) ) / (m3 - m2) |
 | d2   | m3-m2 | (m3-m2) / (m3) | 
 | d3   | m3    | NA | 
 | d4   | 0    | NA | 

# Mise en application

Je vous invite donc à aller voir les résultats [évolution de la mortalité](/covid).

# Conclusion

On a du mal à décider sans mesurer, et encore plus en temps de crise. Voici un bon indicateur pour un _décideur_.

On voit que les mesures prisent ont une efficacité toute relative. Je pensais de prime abords que les mesures prisent étaient inneficaces 
mais quand on regarde un pays comme l'Angleterre ou les États-Unis, on voit que ca pourrait être encore pire ... mais ce n'est qu'un sophisme de plus.