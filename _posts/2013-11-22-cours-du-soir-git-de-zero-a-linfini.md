---
layout: post
---
Chez Valtech, nous animons des cours du soir, car nous croyons beaucoup au partage et à l'amélioration continue. Hier soir, j'ai moi-même animé un cours du soir sur git, que j'avais intitulé "Git: de Zéro à l'Infini".

On a commencé par voir pourquoi Git? puis les bases, le vocabulaire et on a terminé en abordant rapidement la gestion de feature.

![Les participants](/a/photo-2.jpg)
*Les participants*

Les différents mots clefs abordés

![Git : le vocabualire](/a/photo-41.jpg)
*Git : le vocabualire*

Les cours du soir sont aussi un moment informel de partage, d'échange afin de par exemple simplement se rencontrer, échanger sur un sujet souvent technique, mais surtout de ne pas se prendre au sérieux. On en profite d'ailleurs souvent pour se faire une petite bouffe ensemble après.

![Le GO : alias le clown](/a/photo-3.jpg)
*Le GO : alias le clown*

On m'a souvent demandé si je préférais la ligne de commande ou un client graphique : la ligne de commande est indispensable pour comprendre ce que l'on fait, elle est verbeuse, elle vous donne pleins d'information et vous prévient en cas d'opération "hasardeuse" pour un novice.
Une fois que vous aurez l'habitude, connaitrez le vocabulaire, un client graphique pourra vous aider, mais par pitié, commencé par la ligne de commande et les pages d'aides
<pre lang="bash">git help
git help commit</pre>
Comme on m'a demandé plusieurs fois si j'avais un support, je vais vous lister ici quelques pointeurs vers des éléments que je trouve intéressant :

 - [La bible sur Git : ProGit](http://git-scm.com/book/fr)
 - [Les différents espaces de travail de git : une référence qui aide à comprendre les différents espaces de travail, graphiquement](http://ndpsoftware.com/git-cheatsheet.html)
 - [Un ensemble de bonnes pratique](http://sethrobertson.github.io/GitBestPractices/)
 - [Bien configurer](http://www.git-attitude.fr/2013/04/03/configuration-git/)
 - [Un client graphique pour Mac](http://sebastian.lemerdy.name/general/2012/10/09/I-finally-found-a-better-GitX-which-is-GitX.html)
 - [D'autres clients graphiques pour linux](http://www.maketecheasier.com/6-useful-graphical-git-client-for-linux/)
 - [Un contre argumentaire](http://blogs.atlassian.com/2013/11/dont-move-to-git/)
 - [Un outil sous linux qui permet de faire des ajouts interactif, valider des portions de fichier](https://github.com/jonas/tig)
 - [@pmiossec)](https://github.com/pmiossec/tig-cheat-sheet/releases">Tig cheat sheet (de </a><a href="http://twitter.com/pmiossec)
 - [Gestion des multiples modules d'un projet](http://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/)
 - [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

Bonus, à ne pas copier-coller, [liser la doc](https://www.kernel.org/pub/software/scm/git/docs/git-log.html) pour comprendre ce qu'il se passe :
J'avais fait une démo de l'une des commandes qu'il m'arrive d'utiliser afin d'avoir un git log lisible, en tout cas coloré

![git-lg](/a/gitlg.png)
La commande :
<pre lang="bash">[alias]
lg=log --graph --pretty=format:'%Cred%h%Creset%C(green bold)%d%Creset %s %Cgreen(%cr) %C(bold blue)%aN%Creset' --abbrev-commit --all</pre>
Un raccourci pour faire un amend
<pre lang="bash">[alias]
amend = commit --amend -C HEAD</pre>
Comment savoir s'il y a quelque chose à pousser ?
<pre lang="bash">[alias]
tp=log --branches --graph --pretty=format:'%Cred%h%Creset%C(green bold)%d%Creset %s %Cgreen(%cr) %C(bold blue)%aN%Creset' --abbrev-commit --date=relative --not --remotes=origin</pre>
&nbsp;

http://blog.valtech.fr/2013/11/22/cours-du-soir-git-de-zero-a-linfini/
	Published on: Nov 22, 2013 @ 12:03 Edit
