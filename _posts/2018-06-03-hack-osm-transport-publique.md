---
layout: post
title : Astuce pour aider à faire la carto à partir d'une donnée GMaps
---

Suite à une présentation sur [JungleBus](https://junglebus.io/) et comment y contribuer, j'ai fait la remarque que de la donnée était librement consultable et éventuellement utilisable pour aider à faire le tracé de la ligne.
Cela peut particper aux sources d'informations que l'ont peut accumuler pour aider à faire le tracer d'un transport.

Une source d'information peut être une carte google pour récupérer un tracée avant que les sites utilisant ces données soient refais pour ne pas [payer la dime a google](https://medium.com/@cq94/dont-be-evil-until-95f2e8dfaaad).

Cela n'est pas directement utilisable pour de l'[OpenStreetMap](https://www.openstreetmap.org): ce n'est pas parce que c'est librement consultable que c'est réutilisable, sous licence libre.

Le [site des transports de bordeaux mets à dispo les plans de ligne](https://www.infotbm.com/info/line/tbc-10). On y trouve une carte google avec un tracé. Vous pouvez remarquer qu'en approchant votre souris du tracé celle-ci change de pointeur. 

![Le curseur bouge](/a/cursor.gif) 

Pour pouvoir dessiner ce tracé sur la carte, il doit y avoir des donneés qui sont récuperées quelque part. En regardant le source de la page, on peut y trouver une référence à un fichier kml.

<img src="/a/source-kml.png" width="300"/>

La comme ca, je n'arrive pas à trouver comment cet attribut `data-kml` est utilisé, ni même une requête réseau pour récupérer ce fichier. Il y a des fichiers images qui représentent le tracé mais c'est tout.

En récupérant ce fichier kml et en l'important dans JOSM, on a un guide pour trouver les tracés ou stations pré-existantes.

<img src="/a/josm-kml.png" width="300"/>

Exemple avec la [ligne 23](https://www.infotbm.com/info/line/tbc-23) et son pendant [dans le wiki](https://wiki.openstreetmap.org/wiki/Bordeaux/Transports_en_commun#Lignes_.22Principales.22)
