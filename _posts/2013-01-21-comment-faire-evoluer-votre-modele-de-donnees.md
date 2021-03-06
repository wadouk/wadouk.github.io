---
layout: post
title : Comment faire evoluer votre modele de donnees
---
Vous avez remarqué, on est à fond dans l'itératif. Lors de mon dernier projet, au démarrage, l'idée de faire évoluer la base de données au fur à mesure de la "découverte" des besoins n'allait pas de soit. La base de données est quelque chose de tellement rigide, il faut tout définir dés le départ. Vous savez que ce n'est pas vraiment le genre de la maison. Néanmoins, comment adresser ce point ?

J'ai une base, potentiellement déjà en production, ou au moins en recette. Des utilisateurs sont déjà dessus. Ils ont passé de longues journées à saisir leur données. Si on déploie notre solution de développement "simple", on détruit tout et on recrée. Cette solution simpliste ne marchera pas et sera une résistance au changement. Il faut aborder la problématique plus doucement.

La solution sera technique pour moi : comme proposé dans certains framework, l'évolution de la base de données est une composante de la livraison. Cette livraison doit pouvoir faire évoluer le schéma depuis son état actuel, quelque soit les données, quelque soit les modifications du modèle.

Vous pourrez trouver sur [http://github.com/ValtechTechno/dbdiff](http://github.com/ValtechTechno/dbdiff") la réponse technique à ce problème.

L'idée est de construire deux schémas : l'un à partir d'une base vide, l'autre en déroulant les scripts de mises à jour successives. Cela permettra de valider plusieurs points : on est capable de faire évoluer le schéma, de manière automatique, répétable, même avec une base pleine. Une fois les scripts de mises à jour exécutés, les schémas doivent être identique, les tables systèmes d'Oracle sont alors utilisées pour introspecter les définitions de données.

Ceci est bien la libération d'un outil réalisé pour un client, qui marche vraiment. Après, les scripts SQL de migration sont à faire ... pas magique non plus.

N'hésitez pas à faire un retour soit en issue, soit en pull request, c'est open !
