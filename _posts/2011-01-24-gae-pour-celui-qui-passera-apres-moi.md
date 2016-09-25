---
layout: post
title : gae pour celui qui passera apres moi
---
Je vais vous faire part dans ce nouveau billet de mon incommensurable expérience sur GAE et d'un écosystème particulier, le mien. Pour reformuler, ce que je vous propose ici est un <abbr title="retour d'expérience">REX</abbr>. J'ai toujours adoré cet acronyme, très parlant, d'une phonétique explosive. C'est le genre de document qui revient vous mordre même une fois que vous l'avez mis à la niche. Pour ceux qui ne connaissent pas, c'est un document que l'on vous demande de rédiger quand vous vous êtes planté pour ne pas vous planter une deuxième fois. De manière plus positive, on a toujours dit que c'est en tombant que l'on apprends à marcher.

<h2>Que je vous explique un peu le contexte</h2>
Le projet dont je vais esquisser certains pans a plusieurs couches (c'est normal, fait froid), l'une des parties est sur Google App Engine qui héberge des services REST. L'action à réaliser sur ce projet concerne la validation des comptes utilisateurs. Le contexte technique est le suivant : gae pour la partie serveur, jersey pour gérer les appels rest, la persistance dans une big table avec datanucleus et jpa.

Pour mes propres besoins, je comptais utiliser une IHM en jquery préexistante. Je parlerais peut-être une prochaine fois des autres clients.

Pour les outils de dev, eclipse, maven, le plugin gae, la cohabitation n'est pas aisée, elle est néanmoins nécessaire : le plugin &amp; eclipse permettent de faire le debug.
<h2>Maven &amp; Google App Engine for Eclipse</h2>
Je vous recommande comme référence, cet article sur [comment utiliser le plugin google pour eclipse](http://googlewebtoolkit.blogspot.com/2010/08/how-to-use-google-plugin-for-eclipse.html). Néanmoins, quand vous avez maven, vous avez un problème avec datanucleus : celui-ci se cherche lui même pour faire de la génération de code. Dans la console eclipse vous avez

<code lang="bash">Encountered a problem: Unexpected exception
Please see the logs [/var/folders/pV/pVn5DTOTGZKEUKQU1namMU+++TI/-Tmp-/enhance8454755836236296200.log] for further information.</code>

Le fichier en référence contient le message suivant

<code>Caused by: org.datanucleus.exceptions.NucleusException: Plugin (Bundle) "org.datanucleus.store.appengine" is already registered. Ensure you dont have multiple JAR versions of the same plugin in the classpath. The URL "M2_REPO/com/google/appengine/orm/datanucleus-appengine/1.0.7.final/datanucleus-appengine-1.0.7.final.jar" is already registered, and you are trying to register an identical plugin located at URL "M2_REPO/com/google/appengine/appengine-java-sdk/1.3.8/appengine-java-sdk-1.3.8/lib/user/orm/datanucleus-appengine-1.0.7.final.jar.</code>

La dépendance com.google.appengine.orm.datanucleus-appengine est déjà présente avec la librairie App Engine SDK et cela empêche la compilation automatique d'eclipse. Même si vous utilisez m2eclipse, n'importez pas maven d'un bloc, garder la génération faites par mvn eclipse:eclipse puis supprimez manuellement la dépendance vers datanucleus-appengine.Votre console vous donne alors

<code>DataNucleus Enhancer (version 1.1.4) : Enhancement of classes
DataNucleus Enhancer completed with success for 8 classes. Timings : input=404 ms, enhance=159 ms, total=563 ms. Consult the log for full details</code>

Il doit y avoir moyen de gérer ça par [le plugin eclipse-maven comme cette article très intéressant ](http://blog.xebia.fr/2011/01/19/configurer-automatiquement-eclipse-avec-maven/)mais j'avoue ne pas avoir cherché depuis cet article.
<h2>Hétérogénéité des versions</h2>
Je n'avais pas sous la main mon prédécesseur sur le sujet. J'ai donc commencé par vouloir comprendre l'existant. Pour ce faire, j'ai utilisé la seule interface cliente que j'avais, l'IHM jquery qui ne marchait pas.

Cette interface jquery n'avait pas été mise à jour depuis plusieurs versions dont notamment la dernière qui implémentait l'authentification par autorisation basic sur http. Fatalement, il était tout à fait normal que mon client ne marche plus.

Je me suis souvenu, trop tard, de la leçon d'un collègue : "ne jamais prendre le code des autres pour argent comptant, face à un truc qui ne marche pas, revalide toutes les bases une à une pour te faire ton idée et supprimer les hypothèses fausses".

J'ai donc passé encore un peu de temps à vouloir corriger cette application pour la remettre à niveau. Je me suis finalement rendu compte que cette tâche était une forêt à elle seule étant donné l'arriéré. Il me fallait donc un moyen simple de tester mon application REST rapidement (j'avais déjà perdu pas mal de temps).
<h2>Un outil pour faire du rest</h2>
Muni de mon firefox préféré, je me suis dis que forcément quelqu'un avait déjà dû avoir ce problème. J'ai donc cherché dans les extensions de celui-ci les clients REST.

 - Mon choix c'est porté sur Poster ([https://addons.mozilla.org/fr/firefox/addon/poster/](https://addons.mozilla.org/fr/firefox/addon/poster/)).
 - Il en existe une autre, RESTClient ([https://addons.mozilla.org/fr/firefox/addon/restclient/](https://addons.mozilla.org/fr/firefox/addon/restclient/)). Malheureusement j'avais un besoin crucial de gérer l'authentification Basic et cette fenêtre plante, probablement un problème d'internationalisation (selon le développeur : fixed, waiting for Mozilla reviews).
 - Il y a également HTTP Resource Test mais elle est encore plus basique ([https://addons.mozilla.org/fr/firefox/addon/http-resource-test/](https://addons.mozilla.org/fr/firefox/addon/restclient/)).

<h2>On va peut être commencer à produire</h2>
Mon action est d'ajouter les échanges de mail pour activer le compte. Le scénario est le suivant :

L'utilisateur crée son compte, par défaut il est inactif. Un mail est envoyé par gae à l'utilisateur, afin de valider le compte et lui permettre de s'identifier. Pour ce faire, il lui suffit de répondre au mail. Quand la réponse est reçue, le compte est activé.

Le procédé est somme toute assez classique, calqué sur l'inscription à des mailings lists. Nous avons préféré cette option plutôt que d'envoyer un lien hypertext dans un mail car les clients seront des mobiles. Plus on fait changer d'application l'utilisateur, moins on aura de chance de le revoir, même si potentiellement, le faire quitter l'application pour répondre à notre mail est déjà trop tard ... L'idée était d'avoir un identifiant dans ce mail, lié au compte utilisateur afin d'identifier le retour. Nous verrons par la suite que la lecture du mail par le serveur à été simplifiée.
<h2>WTF : mais où sont mes mails ?</h2>
J'implémente l'envoi de mail relativement rapidement, comparé au temps perdu sur les actions précédentes. Je n'ai aucune erreur à l'exécution. Des traces me font penser que tout se déroule correctement, néanmoins je ne reçois aucun message. Après quelques recherches, cela est purement et simplement inactif en version java local, où il y a pléthores d'infos sous python. Il y a néanmoins [des variables d'environnement sur GAE à positionner pour "voir" son mail passer](http://www.kindleit.net/maven_gae_plugin/faq.html#mail).
Les options sont
<pre>-Dmail.log_mail_level=WARNING
-Dmail.log_mail_body=true</pre>
Je me suis demandé où ces options étaient documentées, et j'ai trouvé la source : [Programming Google App Engine Par Dan Sanderson](http://books.google.com/books?id=6cL_kCZ4NJ4C&amp;pg=PA254&amp;lpg=PA254&amp;dq=%22mail.log_mail_body%22&amp;source=bl&amp;ots=sIkeUTRTgl&amp;sig=rpbAprwVXdgW2BPG1Kzl0k8fIAc&amp;hl=fr&amp;ei=jAUvTcL3I8Lh4gbkpcHQCw&amp;sa=X&amp;oi=book_result&amp;ct=result&amp;resnum=1&amp;ved=0CBYQ6AEwAA#v=onepage&amp;q=%22mail.log_mail_body%22&amp;f=false)

[Ensuite viens le temp de gérer le retour de mail](http://code.google.com/intl/fr/appengine/docs/java/mail/receiving.html). C'est là que mon extension firefox Poster entre en action : quand gae reçois un mail, il le poste sur l'url /_ah/mail/{mailto}, mailto étant l'adresse complète de destinataire du mail. Quand vous regardez la littérature sur le sujet on vous présente une belle servlet qui gère la chose avec le corps de la requête HTTP en input stream. Sauf que, dans mon écosystème, c'est le boulot de jersey de récupérer les requêtes. L'input stream c'est un peu complexe, je préfère tentez de récupérer le message en string directement. Alors comment récupérer le body http en String, bah tout simplement en mettant string dans le prototype de ma méthode

<code lang="java">
@Path("_ah/mail/{email}")
public class Mail {
@POST
@Consumes("*/*")
public Response enableAccount(String body,
@PathParam("email") String to) {
}
}
</code>
<h2>One more thing</h2>
Je vous propose maintenant une autre astuce : [la console locale de GAE](http://code.google.com/intl/fr/appengine/docs/java/tools/devserver.html#The_Development_Console)

Après m'être amusé avec Poster et "presque" fini mes tests, je me rends compte qu'il y a une console d'administration[ http://localhost:8080/_ah/admin/](http://localhost:8080/_ah/admin/) qui permet de visualiser le datastore et de simuler l'envoi de mail (faire le post sur la bonne url), sauf que cela ne gère pas les codages.
<h2>Le mail, ce n'est pas simple, c'est standard</h2>
Et là, tout marchait très bien, en dev, avec mon Poster, en copiant collant le message mime source (tel que je l'imaginais), sauf qu'un message mime c'est tout sauf simple. J'ai buté sur le codage de caractère, et le codage des messages mime.

Pour le codage de caractère dans l'envoi du message, je charge le contenu de mon mail depuis un fichier. Souvent nos machines de dev sont en français, les serveurs de production sont en anglais, il est donc important de prendre conscience que la JVM a des options par défaut en fonction de localisation de langue ou géographique. Ces options par défaut peuvent ne pas convenir à notre programme. Alors, qu'on se le dise une bonne fois pour toute, pour arrêter d'avoir des caractères bizarres dans ce que l'on voit : les flux ne se chargent pas par les constructeurs basiques InputStream et consœur qui ne gèrent pas la notion fondamentale du codage de caractère, il faut utiliser InputStreamReader (InputStream, String encoding).

Concernant la gestion du codage des messages mime, je me suis par conséquent rabattu sur l'input stream chargé dans le mime message.

<code lang="java">
@POST
@Consumes("*/*")
public Response enableAccount(InputStream mail,
@PathParam("email") String to) throws MessagingException,
IOException {
Properties p = new Properties();
Session s = Session.getDefaultInstance(p);
MimeMessage messg = new MimeMessage(s, mail);
[...]
}
</code>
Et là, cela fonctionne pas trop mal. Sauf pour une raison obscure que je n'ai toujours pas comprise, si des maîtres<span style="text-decoration: line-through;"> Jedi euh non </span>java passent par là et ont une solution, je suis preneur.

Mon problème est le suivant : SMTP n'accepte que 76 caractères par ligne dans le body d'un message mime. Le codage de caractère encoded printable dit qu'un caractère de plus de 7 bits est codé en =XX XX étant la valeur hexa représentant le caractère. Si le message fait plus de 76 caractères, le dernier caractère est un =\n\r, ce qui suit doit uniquement être rajouté à la suite de la ligne par le client de messagerie.

Avec un exemple cela donne :

<code>MIME-Version: 1.0
Date: Fri, 14 Jan 2011 14:47:26 +0100
Subject: =?ISO-8859-1?Q?Re=3A_Bienvenue_nicolas_b=E9theuil_chez_........_=3A_veui?=
=?ISO-8859-1?Q?llez_valider_votre_compte?=
From: =?ISO-8859-1?Q?Nicolas_B=E9theuil?= &lt;...@gmail.com&gt;
To: whatever@....appspotmail.com
Content-Type: text/plain; charset=ISO-8859-1
Content-Transfer-Encoding: quoted-printable
</code>

<code>&gt; Bienvenue nicolas b=E9theuil chez nous    : veuillez valider votre compt=
e
&gt;
&gt; Vous venez de demander la cr=E9ation dun compte =E0.
&gt; Votre cl=E9 dactivation est activationId=3D782bb8b6-71cc-4d6f-93d9-437b3d=
5e3b29
&gt;
&gt; Il vous suffit de r=E9pondre =E0 ce mail en laissant ce message dorigine
&gt;
&gt; Vous recevrez un autre mail pour vous confirmer lactivation de votre comp=
te.
&gt;
&gt; Salutations
&gt;</code>

Quand le message est lu par MimeMessage(Session,InputStream) et décodé en fonction du Content-Transfert-Encoding le résultat est assez troublant.

![](a/368b35009b7677c5a7cdfdcc0ac7c730.jpeg)](a/368b35009b7677c5a7cdfdcc0ac7c730.jpeg)

Les lignes se terminant par = et dont les caractères suivant ne sont pas des chiffres sont purement et simplement tronquée.
L'affichage est identique que ce soit dans les logs d'app engine que dans le debuger eclipse.

J'ai essayé d'identifier le problème avec [MimeUtility.decode](http://java.sun.com/products/javamail/javadocs/javax/mail/internet/MimeUtility.html#encode%28java.io.OutputStream,%20java.lang.String%29">MimeUtility.encode</a> et <a href="http://java.sun.com/products/javamail/javadocs/javax/mail/internet/MimeUtility.html#decode%28java.io.InputStream,%20java.lang.String%29) mais j'ai été bloqué par l'OutputStream de l'un et l'InputStream de l'autre.

En définitif, je regarde quel est l'expéditeur. En fonction de celui-ci je valide le compte.
<h2>Le déploiement</h2>
Viens ensuite le temps du déploiement de l'application. A l'exécution, j'avais des erreurs 500 en retour HTTP.
Je trouve dans les logs les traces suivantes

 - Caused by: java.lang.ClassNotFoundException: org.codehaus.jettison.json.JSONException
 - Caused by: java.lang.ClassNotFoundException: com.sun.syndication.io.FeedException

Mais celles-ci sont à ignorées, la vrai erreur n'est pas logguée en erreur mais en critique

 - javax.servlet.UnavailableException: Initialization failed.
 - java.lang.IllegalStateException: No forced path servlet for /jqueryClient/index.jsp

Le commentaire était le suivant
<em>&lt;!-- Uncomment to make it deploy locally according to [http://code.google.com/p/googleappengine/issues/detail?id=1365#c5](http://code.google.com/p/googleappengine/issues/detail?id=1365#c5) --&gt;</em>
Sauf que si l'on ne commente pas cela, cela ne marche pas sur GAE.
<h2>Mais pourquoi on me parle de ... je trouve pas l'option</h2>
<h3>(python better than java - app engine sdk of course)</h3>
Mon erreur de déploiement se localisait, selon ma première analyse, au niveau du classpath du projet (cf les ClassNotFound). Je me suis demandé ce qui était réellement déployé.

J'ai vu qu'il était possible de télécharger l'application après l'avoir uploader. Je regarde mon appcfg de mon SDK/J : aucune option. Par contre le SDK/Python a lui pleins d'options : c'est comme ça que j'ai compris que le déploiement sur GAE faisait pas mal de choses dont ajouter ou modifier certaines librairies (les repackaged). Cela m'a aidé à comprendre que je n'avais pas un problème de classpath mais de configuration. Un collègue m’a alors donné l’idée de comparer avec les versions précédentes. La gestion de versions et le test des versions précédentes m'a alors permis d'identifier mon problème de déploiement. J'avais le classique : ça marchais avant que j'y mette mon nez, maintenant ça marche plus, qu'ai je modifié (cf Le déploiement).

J'espère que ce retour de ma très humble expérience vous a apporté et que cela va vous aider à ne pas tomber dans les mêmes embuches.
