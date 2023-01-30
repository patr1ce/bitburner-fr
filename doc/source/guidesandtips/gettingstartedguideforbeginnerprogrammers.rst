Guide de démarrage pour les programmeurs débutants
==============================================

.. note:: Notez que les scripts et les stratégies donnés dans ce guide ne sont pas nécessairement
          optimale. Ils sont juste destinés à vous présenter le jeu et à vous aider à obtenir
          a débuté.

Il s'agit d'un guide d'introduction pour démarrer avec Bitburner. Ce n'est pas censé être un
guide complet pour l'ensemble du jeu, seulement les premières étapes. Si vous êtes confus
ou dépassé par le jeu, notamment les aspects programmation et scénarisation, cela
guide est parfait pour vous!

Notez que ce guide est conçu pour ceux qui ont une expérience minimale en programmation.

Introduction
------------
Bitburner est un RPG incrémental sur le thème du cyberpunk. Le joueur progresse en levant
leurs :ref:`gameplay_stats`, gagner de l'argent et :ref:`climbing the corporate ladder <gameplay_companies>`.

Finalement, après avoir atteint certains critères, le joueur commencera à recevoir des invitations
de :ref:`gameplay_factions`. Rejoindre ces factions et travailler pour elles débloquera
:ref:`gameplay_augmentations`. L'achat et l'installation d'Augmentations fournissent des
améliorations et sont nécessaires pour progresser dans le jeu.

Le jeu a une histoire / quête minimale qui peut être suivie pour atteindre la fin du jeu.
Étant donné que ce guide ne concerne que la prise en main de Bitburner, il ne couvrira pas le
toute la "ligne de quête".

Premiers pas
-----------
Je vais supposer que vous avez suivi le didacticiel d'introduction lorsque vous avez commencé le jeu.
Dans ce tutoriel d'introduction, vous avez créé un script appelé :code:`n00dles.js` et l'avez exécuté
sur le serveur :code:`n00dles`. Pour l'instant, nous allons tuer ce script. Il y a deux manières
pour faire ça:

1. Vous pouvez vous rendre au Terminal et saisir ::

    $ kill n00dles.script

2. Vous pouvez aller sur la page :code:`Active Scripts` (|raccourci clavier| Alt + s) et
   appuyez sur le bouton "Kill Script" pour :code:`n00dles.js`.

Si vous avez ignoré le didacticiel d'introduction, ignorez la partie ci-dessus. Allez plutôt au
:code:`Hacknet Nodes` (|raccourci clavier| Alt + h) et achetez un
Hacknet Node pour commencer à générer des revenus passifs.

Création de notre premier scénario
------------------------
Maintenant, nous allons créer un script de piratage générique qui peut être utilisé au début du jeu (ou tout au long du
jeu entier, si vous voulez).

Avant d'écrire le script, voici quelques éléments avec lesquels vous voudrez vous familiariser :

* :ref:`gameplay_hacking_generalhackingmechanics`
* :ref:`gameplay_hacking_serversecurity`
* :js:func:`hack`
* :js:func:`grow`
* :js:func:`weaken`
* :js:func:`brutessh`
* :js:func:`nuke`

Pour résumer brièvement les informations des liens ci-dessus : Chaque serveur a un
niveau de sécurité qui affecte la difficulté à pirater. Chaque serveur dispose également d'un
certaine somme d'argent, ainsi qu'un montant maximum d'argent qu'il peut contenir. Pirater un
le serveur vole un pourcentage de l'argent de ce serveur. La fonction Netscript :js:func:`hack`
est utilisé pour pirater un serveur. La fonction Netscript :js:func:`grow` est utilisée pour augmenter
la somme d'argent disponible sur un serveur. La fonction Netscript :js:func:`weaken` est
utilisé pour diminuer le niveau de sécurité d'un serveur.

Passons maintenant à la création du script.
Allez sur votre ordinateur personnel, puis créez un script appelé :code:`early-hack-template.js` en
allez dans Terminal et entrez les deux commandes suivantes ::

    $ home
    $ nano early-hack-template.js

Cela vous mènera à l'éditeur de script, que vous pouvez utiliser pour coder et créer
:ref:`gameplay_scripts`. Il sera utile de consulter la documentation :ref:`netscript`.
Plus précisément, vous voudrez jeter un œil à :ref:`netscriptfunctions`.

Saisissez le code suivant dans l'éditeur de script :

.. code:: javascript
    /** @param {NS} ns */
    export async function main(ns) {
        // Définit le "serveur cible", qui est le serveur
        // que nous allons pirater. Dans ce cas, c'est "n00dles"
        const target = "n00dles";

        // Définit combien d'argent un serveur devrait avoir avant de le pirater
        // Dans ce cas, il est fixé à 75 % de l'argent maximum du serveur
        const moneyThresh = ns.getServerMaxMoney(target) * 0.75;

        // Définit le niveau de sécurité maximal que le serveur cible peut
        // avoir. Si le niveau de sécurité de la cible est supérieur à cela,
        // on va l'affaiblir avant de faire quoi que ce soit d'autre
        const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

        / Si nous avons le programme BruteSSH.exe, utilisez-le pour ouvrir le port SSH
        // sur le serveur cible
        if (ns.fileExists("BruteSSH.exe", "home")) {
            ns.brutessh(target);
        }

        // Obtient l'accès root au serveur cible
        ns.nuke(target);

        // Boucle infinie qui hacke/développe/affaiblit continuellement le serveur cible
        while(true) {
            if (ns.getServerSecurityLevel(target) > securityThresh) {
               // Si le niveau de sécurité du serveur est supérieur à notre seuil, affaiblissez-le
                await ns.weaken(target);
            } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
                // Si l'argent du serveur est inférieur à notre seuil, augmentez-le
                await ns.grow(target);
            } else {
                // Sinon, piratez-le
                await ns.hack(target);
            }
        }
    }
Le script ci-dessus contient des commentaires qui documentent ce qu'il fait, mais passons en revue
étape par étape en tout cas.

.. code:: javascript

    const target = "n00dles";

Cette première commande définit une chaîne qui contient notre serveur cible. C'est le serveur
que nous allons pirater. Pour l'instant, il est défini sur `n00dles` car c'est le seul
serveur avec un niveau de piratage requis de 1. Si vous voulez pirater un autre serveur,
change simplement ça
variable pour être le nom d'hôte d'un autre serveur.

.. code:: javascript

    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;

Cette deuxième commande définit une valeur numérique représentant le minimum
somme d'argent qui doit être disponible sur le serveur cible pour que notre script
pour le pirater. Si l'argent disponible sur le serveur cible est inférieur à cette valeur,
alors notre script :js:func:`développe` le serveur plutôt que de le pirater.
Il est fixé à 75% du montant maximum d'argent pouvant être disponible sur le serveur.
La fonction Netscript :js:func:`getServerMaxMoney` est utilisée pour trouver cette valeur

.. code:: javascript

    const securityThresh = ns.getServerMinSecurityLevel(target) + 5;

Cette troisième commande définit une valeur numérique représentant le niveau de sécurité maximal
le serveur cible peut avoir. Si le niveau de sécurité du serveur cible est supérieur à
cette valeur, alors notre script va :js:func:`affaiblir` le script avant de faire quoi que ce soit d'autre.

.. code:: javascript

    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(target);
    }

    ns.nuke(target);

Cette section de code est utilisée pour obtenir un accès root sur le serveur cible. C'est
nécessaire pour le piratage. Voir :ref:`here for more details <gameplay_hacking>`.

.. code:: javascript

    while (true) {
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            // Si le niveau de sécurité du serveur est supérieur à notre seuil, affaiblissez-le
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            // Sinon, si l'argent du serveur est inférieur à notre seuil, augmentez-le
            await ns.grow(target);
        } else {
            // Sinon, piratez-le
            await ns.hack(target);
        }
    }

C'est la section principale qui pilote notre script. Il dicte la logique du script
et effectue les opérations de piratage. Le `while (true)` crée une boucle infinie
qui exécutera en continu la logique de piratage jusqu'à ce que le script soit tué.

Le mot clé await est nécessaire pour `hack` / `grow` / `weaken` car ces commandes prennent
temps d'exécution, contrairement aux autres. Si vous oubliez d'attendre ces commandes, vous obtiendrez
une exception indiquant que vous avez essayé de faire plusieurs choses à la fois, car votre code sera
terminer immédiatement l'appel de la fonction sans attendre que l'opération soit effectuée. Également
l'important est que await ne peut être utilisé que dans les fonctions marquées async (ce qui est main()).

Exécution de nos scripts
-------------------
Maintenant, nous voulons commencer à exécuter notre script de piratage afin qu'il puisse commencer à nous rapporter
l'argent et l'expérience. Notre ordinateur personnel n'a que 8 Go de RAM et nous l'utiliserons pour
autre chose plus tard. Donc, à la place, nous profiterons de la RAM sur d'autres machines.

Allez à |Terminal| et entrez la commande suivante ::

    $ scan-analyze 2

Cela affichera des informations détaillées sur certains serveurs du réseau. Les
**le réseau est aléatoire, il sera donc différent pour chaque personne**.
Voici ce que le mien a montré au moment où j'ai fait ceci ::

    [home ~]> scan-analyze 2
   ~~~~~~~~~~ Début du scan-analyse ~~~~~~~~~~

    n00dles
    --Accès racine : OUI, compétence de piratage requise : 1
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 4,00 Go

    ----zéro0
    ------Accès racine : NON, compétence de piratage requise : 75
    ------Nombre de ports ouverts requis pour NUKE : 1
    ------ RAM : 32,00 Go

    denrées alimentaires
    --Accès racine : NON, compétence de piratage requise : 1
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 16,00 Go

    sigma-cosmetics
    --Accès racine : NON, compétence de piratage requise : 5
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 16,00 Go

    joesguns
    --Accès racine : NON, compétence de piratage requise : 10
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 16,00 Go

    ----matériel max
    ------Accès racine : NON, compétence de piratage requise : 80
    ------Nombre de ports ouverts requis pour NUKE : 1
    ------ RAM : 32,00 Go

    ----CSTC
    ------Accès racine : NON, compétence de piratage requise : 54
    ------Nombre de ports ouverts requis pour NUKE : 1
    ------ RAM : 8,00 Go

    hong-fang-tea
    --Accès racine : NON, compétence de piratage requise : 30
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 16,00 Go

    ----nectar-net
    ------Accès racine : NON, compétence de piratage requise : 20
    ------Nombre de ports ouverts requis pour NUKE : 0
    ------ RAM : 16,00 Go

    harakiri-sushi
    --Accès racine : NON, compétence de piratage requise : 40
    --Nombre de ports ouverts requis pour NUKE : 0
    --RAM : 16,00 Go

    fer-gym
    --Accès racine : NON, compétence de piratage requise : 100
    --Nombre de ports ouverts requis pour NUKE : 1
    --RAM : 32,00 Go

Prenez note des serveurs suivants :

* |sigma-cosmetics|
* |joesguns|
* |nectar-net|
* |hong-fang-tea|
* |harakiri-sushi|

Tous ces serveurs disposent de 16 Go de RAM. De plus, tous ces serveurs ne nécessitent pas
tous les ports ouverts afin de NUKE. En d'autres termes, nous pouvons obtenir un accès root à tous ces
serveurs, puis exécutez des scripts dessus.

Tout d'abord, déterminons combien de threads de notre script de piratage nous pouvons exécuter.
:ref:`Read more about multithreading scripts here <gameplay_scripts_multithreadingscripts>`
Le scénario que nous avons écrit
utilise 2,6 Go de RAM. Vous pouvez vérifier cela en utilisant la commande suivante du |Terminal| ::

    $ mem early-hack-template.js

Cela signifie que nous pouvons exécuter 6 threads sur un serveur de 16 Go. Maintenant, pour exécuter nos scripts sur tous ces
serveurs, nous devons faire ce qui suit :

1. Utilisez la :ref:`scp_terminal_command` |Terminal| commande pour copier notre script sur chaque serveur.
2. Utilisez la :ref:`commande_connect_terminal` |Terminal| commande pour se connecter à un serveur.
3. Utilisez la commande :ref:`run_terminal_command` |Terminal| commande pour exécuter le programme `NUKE.exe` et
   obtenir un accès root.
4. Utilisez la commande :ref:`run_terminal_command` |Terminal| commande à nouveau pour exécuter notre script.
5. Répétez les étapes 2 à 4 pour chaque serveur.

Voici la séquence de |Terminal| commandes que j'ai utilisées pour y parvenir ::

    $ home
    $ scp early-hack-template.js n00dles
    $ scp early-hack-template.js sigma-cosmetics
    $ scp early-hack-template.js joesguns
    $ scp early-hack-template.js nectar-net
    $ scp early-hack-template.js hong-fang-tea
    $ scp early-hack-template.js harakiri-sushi
    $ connect n00dles
    $ run NUKE.exe
    $ run early-hack-template.js -t 1
    $ home
    $ connect sigma-cosmetics
    $ run NUKE.exe
    $ run early-hack-template.js -t 6
    $ home
    $ connect joesguns
    $ run NUKE.exe
    $ run early-hack-template.js -t 6
    $ home
    $ connect hong-fang-tea
    $ run NUKE.exe
    $ run early-hack-template.js -t 6
    $ home
    $ connect harakiri-sushi
    $ run NUKE.exe
    $ run early-hack-template.js -t 6
    $ home
    $ connect hong-fang-tea
    $ connect nectar-net
    $ run NUKE.exe
    $ run early-hack-template.js -t 6

.. note::

    Appuyer sur la touche :code:`Tab` au milieu d'une commande Terminal tentera de
    compléter automatiquement la commande. Par exemple, si vous tapez :code:`scp ea` puis
    appuyez sur :code:`Tab`, le reste du nom du script devrait être automatiquement rempli.
    Cela fonctionne pour la plupart des commandes du jeu !

La :ref:`home_terminal_command` |Terminal| la commande est utilisée pour se connecter à la maison
l'ordinateur. Lors de l'exécution de nos scripts avec le :code:`run early-hack-template.js -t 6`
commande, le :code:`-t 6` spécifie que le script doit être exécuté avec 6 threads.

otez que le |nectar-net| serveur n'est pas dans le réseau immédiat de l'ordinateur domestique.
Cela signifie que vous ne pouvez pas vous y connecter directement depuis votre domicile. il va falloir le chercher
à l'intérieur du réseau. Les résultats de la commande `scan-analyze 2` que nous avons exécutée auparavant
montrera où il se trouve. Dans mon cas, j'ai pu m'y connecter en passant de
`hong-fang-tea -> nectar-net'. Cependant, ce sera probablement différent pour vous.

Après avoir exécuté tous ces |Terminal| commandes, nos scripts sont maintenant opérationnels.
Ceux-ci gagneront de l'argent et de l'expérience de piratage au fil du temps. Ces gains seront
vraiment lents en ce moment, mais ils augmenteront une fois que nos compétences de piratage augmenteront et
nous commençons à exécuter plus de scripts.

Augmentation du niveau de piratage
------------------------
Il existe de nombreux serveurs en plus de |n00dles| qui peut être piraté, mais ils ont
niveaux de piratage requis plus élevés. Par conséquent, nous devrions augmenter notre niveau de piratage. Pas seulement
cela nous permettra de pirater plus de serveurs, mais cela augmentera également l'efficacité de notre piratage
contre |n00dles|.

Le moyen le plus simple de former votre niveau de piratage est de visiter l'Université Rothman. Vous pouvez le faire en
en cliquant sur l'onglet "Ville" dans le menu de navigation de gauche, ou vous pouvez utiliser le
:ref:`raccourci clavier
      
       ` Alt + w. L'Université Rothman devrait être l'un des boutons
près du sommet. Cliquez sur le bouton pour accéder à l'emplacement.

Une fois que vous êtes allé à l'Université Rothman, vous devriez voir un écran avec plusieurs options. Celles-ci
les options décrivent les différents cours que vous pouvez suivre. Vous devez cliquer sur le premier bouton, qui
dit: "Etudier l'informatique (gratuit)".

Après avoir cliqué sur le bouton, vous commencerez à étudier et à acquérir de l'expérience de piratage. Pendant que tu
faites cela, vous ne pouvez interagir avec aucune autre partie du jeu tant que vous n'avez pas cliqué sur le bouton
that says "Stop taking course".

À l'heure actuelle, nous voulons un niveau de piratage de 10. Vous avez besoin d'environ 174 expériences de piratage pour atteindre
niveau 10. Vous pouvez vérifier votre expérience de piratage en cliquant sur l'onglet "Statistiques"
dans le menu de navigation de gauche, ou en utilisant |Raccourci clavier| Alt+C.
Étant donné qu'étudier à l'Université Rothman vous rapporte 1 expérience par seconde, cela prendra
174 secondes, soit environ 3 minutes. N'hésitez pas à faire quelque chose en attendant !

Modification de notre script de piratage
-------------------------
Maintenant que nous avons un niveau de piratage de 10, nous pouvons pirater le serveur :code:`joesguns`. Ce serveur
sera légèrement plus rentable que :code:`n00dles`. Par conséquent, nous voulons changer notre piratage
script pour cibler :code:`joesguns` au lieu de :code:`n00dles`.

Allez à |Terminal| et éditez le script de piratage en saisissant ::

    $ home
    $ nano early-hack-template.js

En haut du script, changez la variable `target` en `joesguns` :

.. code:: javascript

    const target = "joesguns";

Notez que cela n'affectera **PAS** les instances du script déjà en cours d'exécution.
Cela n'affectera que les instances du script exécutées à partir de maintenant.

Créer un nouveau script pour acheter de nouveaux serveurs
------------------------------------------------
Ensuite, nous allons créer un script qui achète automatiquement des serveurs supplémentaires. Celles-ci
les serveurs seront utilisés pour exécuter de nombreux scripts. L'exécution de ce script sera initialement très
coûteux puisque l'achat d'un serveur coûte de l'argent, mais il sera payant à long terme.

Afin de créer ce script, vous devez vous familiariser avec les éléments suivants
Fonctions NetScript :

* :js:func:`purchaseServer`
* :js:func:`getPurchasedServerCost`
* :js:func:`getPurchasedServerLimit`
* :js:func:`getServerMoneyAvailable`
* :js:func:`scp`
* :js:func:`exec`

Créez le script en allant dans |Terminal| et en tapant ::

    $ home
    $ nano purchase-server-8gb.js

Collez le code suivant dans l'éditeur de script :

.. code:: javascript
    /** @param {NS} ns */
    export async function main(ns) {
        // Combien de RAM aura chaque serveur acheté. Dans ce cas, ça va
        // était de 8 Go.
        const ram = 8;

        // Itérateur que nous utiliserons pour notre boucle
        let i = 0;

        // Essayez continuellement d'acheter des serveurs jusqu'à ce que nous ayons atteint le maximum
        // nombre de serveurs
        while (i < ns.getPurchasedServerLimit()) {
            // Vérifie si nous avons assez d'argent pour acheter un serveur
            if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
                // Si nous avons assez d'argent, alors :
                // 1. Achetez le serveur
                // 2. Copiez notre script de piratage sur le serveur nouvellement acheté
                // 3. Exécutez notre script de piratage sur le serveur nouvellement acheté avec 3 threads
                // 4. Incrémente notre itérateur pour indiquer que nous avons acheté un nouveau serveur
                let hostname = ns.purchaseServer("pserv-" + i, ram);
                ns.scp("early-hack-template.script", hostname);
                ns.exec("early-hack-template.script", hostname, 3);
                ++i;
            }
            //Faire attendre le script une seconde avant de boucler à nouveau.
            // La suppression de cette ligne provoquera une boucle infinie et fera planter le jeu.
            await ns.sleep(1000);
        }
    }

Ce code utilise une boucle while pour acheter le nombre maximum de serveurs utilisant le
:js:func:`purchaseServer` Fonction Netscript. Chacun de ces serveurs aura
8 Go de RAM, comme défini dans la variable :code:`ram`. Notez que le script utilise la commande
:code:`getServerMoneyAvailable("home")` pour obtenir le montant d'argent dont vous disposez actuellement.
Ceci est ensuite utilisé pour vérifier si vous pouvez vous permettre d'acheter un serveur.

Chaque fois que le script achète un nouveau serveur, il utilise la fonction :js:func:`scp` pour copier
notre script sur ce nouveau serveur, puis il utilise la fonction :js:func:`exec` pour
l'exécuter sur ce serveur.

Pour exécuter ce script, allez dans |Terminal| et tapez ::

    $ run purchase-server-8gb.js

Cet achat fonctionnera en continu jusqu'à ce qu'il ait acheté le nombre maximum de serveurs.
Lorsque cela se produit, cela signifie que vous avez un tas de nouveaux serveurs qui fonctionnent tous
pirater des scripts contre le serveur :code:`joesguns` !

.. note::

    La raison pour laquelle nous utilisons autant de scripts pour pirater :code:`joesguns` au lieu de cibler les autres
    serveurs est parce que c'est plus efficace. Au début du jeu, nous n'avons pas assez de RAM
    pour pirater efficacement plusieurs cibles, et essayer de le faire serait lent car nous serions dispersés
    trop mince. Vous devriez certainement le faire plus tard, cependant!

Notez que l'achat d'un serveur est assez cher, et l'achat du maximum de
les serveurs encore plus. Au moment de la rédaction de ce guide, le script ci-dessus nécessite
11 millions de dollars pour terminer l'achat de tous les serveurs de 8 Go.
Par conséquent, nous devons trouver des moyens supplémentaires de gagner de l'argent rapidement
le processus ! Ceux-ci sont couverts dans la section suivante.

Sources de revenus supplémentaires
-------------------------------------
Il existe d'autres moyens de gagner de l'argent dans ce jeu en plus des scripts et du piratage.

Nœuds de piratage
^^^^^^^^^^^^^^
Si vous avez terminé le tutoriel d'introduction, vous avez déjà été initié à cette méthode : Hacknet Nodes.
Une fois que vous avez assez d'argent, vous pouvez commencer à mettre à niveau vos nœuds Hacknet afin d'augmenter
votre flux de revenus passifs. Ceci est complètement facultatif. Depuis chaque mise à niveau de Hacknet Node
prend un certain temps pour "se rembourser", il n'est peut-être pas forcément au mieux
intérêt à les utiliser.

Néanmoins, les nœuds Hacknet sont une bonne source de revenus au début du jeu, bien que
leur efficacité s'amenuise par la suite. Si vous finissez par acheter et mettre à niveau des nœuds Hacknet,
Je suggérerais seulement d'améliorer leurs niveaux pour l'instant. Je ne m'embêterais pas avec la RAM et le Core
mises à niveau jusqu'à plus tard.

Crime
^^^^^
La meilleure source de revenus à l'heure actuelle provient de:ref:`committing crimes <gameplay_crimes>`.
n effet, non seulement cela vous rapporte une grosse somme d'argent, mais cela augmente également la vôtre.
niveau de piratage. Pour commettre des crimes, cliquez sur l'onglet :code:`Ville` sur le côté gauche
menu de navigation ou utilisez le |raccourci clavier| Alt + w.
Ensuite, cliquez sur le lien qui dit :code:`The Slums`.

Dans les bidonvilles, vous pouvez tenter de commettre une variété de crimes, dont chacun donne certains
types d'expérience et d'argent en cas de succès. Voir :ref:`gameplay_crimes` pour plus de détails.

.. note::

    Vous ne réussissez pas toujours lorsque vous tentez de commettre un crime. Rien de mal ne se passe
    si vous échouez à un crime, mais vous ne gagnerez pas d'argent et l'expérience acquise sera
    réduit. Augmenter vos statistiques améliore vos chances de commettre un crime avec succès.

À l'heure actuelle, la meilleure option est le crime :code:`Rob Store`. Cela prend 60 secondes pour tenter
et donne 400 000 $ en cas de succès. Je suggère ce crime parce que vous n'avez pas besoin de cliquer ou de vérifier
trop souvent car il faut une minute entière pour essayer. De plus, cela donne une expérience de piratage,
ce qui est très important en ce moment.

Alternativement, vous pouvez également utiliser le crime :code:`Shoplift`. Cela prend 2 secondes pour tenter
et donne 15 000 $ en cas de succès. Ce crime est légèrement plus facile et est plus rentable
que :code:`Rob Store`, mais cela nécessite un clic constant et cela ne donne pas
expérience de piratage.

Travailler pour une entreprise
^^^^^^^^^^^^^^^^^^^^
Si vous ne voulez pas constamment vérifier le jeu pour commettre des crimes, il existe une autre option
c'est beaucoup plus passif : travailler pour une :ref:`company <gameplay_companies>`.

Ce ne sera pas aussi rentable que les crimes, mais c'est complètement passif.

Accédez à l'onglet :code:`City` dans le menu de navigation de gauche, puis accédez à
:code:`Joe's Guns`. À :code:`Joe's Guns`, il y aura une option qui dit
:code:`Postuler pour être un employé`. Cliquez dessus pour obtenir le travail. Ensuite, une nouvelle option
apparaîtra qui dit simplement :code:`Work`. Cliquez dessus pour commencer à travailler.
Travailler chez :code:`Joe's Guns` rapporte 110 $ par seconde et donne également de l'expérience
pour chaque statistique sauf le piratage.

Travailler pour une entreprise est complètement passif. Vous pouvez choisir de vous concentrer sur votre travail, faire
quelque chose d'autre simultanément, ou basculer entre les deux. Pendant que vous vous concentrez sur le travail,
vous ne pourrez rien faire d'autre dans le jeu. Si vous faites autre chose entre-temps,
vous ne gagnerez pas en réputation à la même vitesse. Vous pouvez annuler le travail à tout moment.
Vous remarquerez qu'annuler votre travail plus tôt vous fait perdre une certaine réputation
gains, mais vous ne devriez pas vous en soucier. La réputation de l'entreprise n'est pas importante en ce moment.

Une fois que votre piratage atteint le niveau 75, vous pouvez visiter :code:`Carmichael Security` dans la ville
et obtenir un travail de logiciel là-bas. Ce travail offre un salaire plus élevé et vous rapporte également
expérience de piratage.

Il y a beaucoup plus d'entreprises dans l'onglet |Ville| qui offrent plus de rémunération et aussi plus de gameplay
fonctionnalités. N'hésitez pas à explorer !

Après avoir acheté vos nouveaux serveurs
-----------------------------------
Une fois que vous avez gagné un total de 11 millions de dollars, votre script d'achat automatique de serveur devrait
finir de courir. Cela libérera de la RAM sur votre ordinateur personnel. Nous ne voulons pas de cette RAM
à perdre, alors nous allons nous en servir. Allez à |Terminal| et entrez les commandes suivantes ::

    $ home
    $ run early-hack-template.js -t 3

Atteindre un niveau de piratage de 50
------------------------------
Une fois que vous atteignez un niveau de piratage de 50, deux nouvelles parties importantes du jeu s'ouvrent.

Création de votre premier programme : BruteSSH.exe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Dans le menu de navigation de gauche, vous remarquerez un onglet :code:`Create Programs` avec un
icône de notification rouge. Cela indique qu'il existe des programmes disponibles pour être créés.
Cliquez sur cet onglet (ou utilisez |raccourci clavier| Alt + p) et vous verrez un
liste de tous les programmes que vous pouvez actuellement créer. Survoler un programme donnera un
brève description de sa fonction. Cliquez simplement sur un programme pour commencer à le créer.

En ce moment, le programme que nous voulons créer est :code:`BruteSSH.exe`. Ce programme est utilisé
pour ouvrir des ports SSH sur les serveurs. Cela vous permettra de pirater plus de serveurs,
car de nombreux serveurs du jeu nécessitent un certain nombre de ports ouverts pour
:code:`NUKE.exe` pour obtenir un accès root.

Lorsque vous créez un programme, vous ne pouvez interagir avec aucune autre partie du jeu.
N'hésitez pas à annuler votre travail de création de programme à tout moment, car votre progression
être sauvegardé et peut être récupéré plus tard. :code:`BruteSSH.exe` prend environ
10 minutes pour terminer.

Facultatif : Créer AutoLink.exe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Sur la page :code:`Create Programs`, vous remarquerez un autre programme que vous pouvez créer
appelé :code:`AutoLink.exe`. Si cela ne vous dérange pas d'attendre encore 10 à 15 minutes, vous devriez
allez-y et créez ce programme. Cela rend beaucoup moins fastidieux de se connecter à d'autres serveurs,
mais ce n'est pas nécessaire pour progresser.

Rejoindre votre première faction : CyberSec
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Peu de temps après avoir atteint le niveau 50 de piratage, vous devriez avoir reçu un message qui
A dit ceci::

    Message reçu d'un expéditeur inconnu :

     Nous vous avons observé. Vos compétences sont très impressionnantes. Mais tu gaspilles
     vos talents. Si vous nous rejoignez, vous pourrez mettre vos compétences à profit et changer
     le monde pour le mieux. Si vous nous rejoignez, nous pouvons libérer votre plein potentiel.
     Mais d'abord, vous devez réussir notre test. Trouvez et piratez notre serveur en utilisant le Terminal.

     -CyberSec

    Ce message a été enregistré sous csec-test.msg sur votre ordinateur personnel.

Si vous ne l'avez pas fait, ou si vous l'avez accidentellement fermé, ce n'est pas grave ! Les messages sont enregistrés sur
votre ordinateur personnel. Entrez le |Terminal| suivant commandes pour afficher le message ::
 
    $ home
    $ cat csec-test.msg

Ce message fait partie de la "ligne de quête" principale du jeu. C'est un message du
|Faction CyberSec| qui vous demande de passer leur test.
Passer leur test est simple, il vous suffit de trouver leur serveur et de le pirater
la |Terminale|. Leur serveur s'appelle :code:`CSEC`.
Pour ce faire, nous allons utiliser la :ref:`scan_analyze_terminal_command`
Commande de terminal, comme nous l'avons fait auparavant ::

    $ home
    $ scan-analyze 2

Cela vous montrera le réseau pour tous les serveurs qui sont jusqu'à 2 "nœuds" de
votre ordinateur personnel. N'oubliez pas que le réseau est généré aléatoirement, il aura donc l'air
différent pour chacun. Voici la partie pertinente de mes résultats :code:`scan-analyze` results::

    >iron-gym
    --Root Access: NO, Required hacking skill: 100
    --Number of open ports required to NUKE: 1
    --RAM: 32

    ---->zer0
    ------Root Access: NO, Required hacking skill: 75
    ------Number of open ports required to NUKE: 1
    ------RAM: 32

    ---->CSEC
    ------Root Access: NO, Required hacking skill: 54
    ------Number of open ports required to NUKE: 1
    ------RAM: 8

Cela me dit que je peux atteindre :code:`CSEC` en passant par :code:`iron-gym`::

    $ connect iron-gym
    $ connect CSEC

.. note::

     Si vous avez créé le programme :code:`AutoLink.exe` plus tôt, il existe une méthode plus simple
     méthode de connexion à :code:`CSEC`. Vous remarquerez que dans le :code:`scan-analyze`
     résultats, tous les noms d'hôte du serveur sont blancs et soulignés. Vous pouvez simplement
     cliquez sur l'un des noms d'hôte du serveur pour vous y connecter. Alors, cliquez simplement
    :code:`CSEC`!

.. note::

     Assurez-vous de noter la compétence de piratage requise pour le serveur :code:`CSEC`.
     Il s'agit d'une valeur aléatoire comprise entre 51 et 60. Bien que vous receviez le message
     du CSTC une fois que vous atteignez 50 piratage, vous ne pouvez pas réellement passer leur test
     jusqu'à ce que votre piratage soit suffisamment élevé pour installer une porte dérobée sur leur serveur.

Une fois que vous êtes connecté au serveur :code:`CSEC`, vous pouvez le déguiser. Notez que cela
Le serveur nécessite un port ouvert pour obtenir un accès root. Nous pouvons ouvrir le port SSH
en utilisant le programme :code:`BruteSSH.exe` que nous avons créé précédemment. Dans |Terminal| ::

    $ run BruteSSH.exe
    $ run NUKE.exe
    $ backdoor

Après avoir installé avec succès la porte dérobée, vous devriez recevoir une faction
invitation de |CyberSec| peu de temps après. Accepte-le. Si vous accidentellement
rejeter l'invitation, ça va. Allez simplement dans l'onglet :code:`Factions`
(|Raccourci clavier| Alt + f) et vous devriez voir une option qui vous permet
accepter l'invitation.

Félicitations! Vous venez de rejoindre votre première faction. Ne vous inquiétez pas de faire quoi que ce soit
avec cette faction encore, nous pourrons y revenir plus tard.

Utiliser des serveurs supplémentaires pour pirater Joesguns
-----------------------------------------
Une fois que vous avez le |BruteSSH| programme, vous pourrez obtenir un accès root
à plusieurs serveurs supplémentaires. Ces serveurs ont plus de RAM que vous pouvez utiliser pour
exécuter des scripts. Nous utiliserons la RAM de ces serveurs pour exécuter davantage de scripts ciblant
:code:`joesguns`.

Copier nos scripts
^^^^^^^^^^^^^^^^^^^^
Les serveurs que nous utiliserons pour exécuter nos scripts sont :

* :code:`neo-net`
* :code:`zer0`
* :code:`max-hardware`
* :code:`iron-gym`

Tous ces serveurs disposent de 32 Go de RAM. Vous pouvez utiliser le |Terminal| commande
:code:`scan-analyze 3` pour voir par vous-même. Pour copier nos scripts de piratage sur ces serveurs,
aller à |Terminal| et lancer::

    $ home
    $ scp early-hack-template.js neo-net
    $ scp early-hack-template.js zer0
    $ scp early-hack-template.js max-hardware
    $ scp early-hack-template.js iron-gym

Étant donné que chacun de ces serveurs dispose de 32 Go de RAM, nous pouvons exécuter notre script de piratage avec 12 threads
sur chaque serveur. À présent, vous devriez savoir comment vous connecter aux serveurs. Alors trouvez et connectez-vous à
chacun des serveurs ci-dessus en utilisant le :code:`scan-analyze 3` |Terminal| commande. Ensuite, utilisez
suivant |Terminal| commande pour exécuter notre piratage
script avec 12 threads ::

    $ run early-hack-template.js -t 12

Rappelez-vous que si vous avez le |AutoLink| programme, vous pouvez simplement cliquer sur le nom d'hôte d'un serveur
après avoir exécuté :ref:`scan_analyze_terminal_command` pour s'y connecter.

Profiter des scripts et gagner en réputation avec CyberSec
-------------------------------------------------- -------
Il est maintenant temps de jouer au jeu de l'attente. Il faudra un certain temps pour que vos scripts démarrent
Gagner de l'argent. N'oubliez pas que la plupart de vos scripts ciblent |joesguns|. Il faudra un
bit pour qu'ils :js:func:`grow` et :js:func:`weaken` le serveur aux valeurs appropriées
avant qu'ils ne commencent à le pirater. Une fois qu'ils le feront, cependant, les scripts seront très rentables.

.. note::

     Pour référence, environ deux heures après avoir lancé mon premier script, mes scripts avaient un
     taux de production de 20 000 $ par seconde et avait gagné un total de 70 millions de dollars.
     (Vous pouvez voir ces statistiques dans l'onglet :code:`Active Scripts`).

     Après 15 minutes supplémentaires, le taux de production était passé à 25 000 $ par seconde.
     et les scripts avaient rapporté 55 millions de dollars supplémentaires.

     Vos résultats varieront en fonction de la rapidité avec laquelle vous avez gagné de l'argent grâce aux nœuds criminels / de travail / de piratage,
     mais cela vous donnera, espérons-le, une bonne indication de ce que les scripts peuvent rapporter.

En attendant, nous allons gagner en notoriété auprès de la |faction CyberSec|.
Allez dans l'onglet |Factions| à gauche
menu de navigation, puis sélectionnez |CyberSec|. Au milieu de
la page, il devrait y avoir un bouton pour :code:`Hacking Contracts`.
Cliquez dessus pour commencer à gagner de la réputation pour le |CyberSec| faction (ainsi
comme une expérience de piratage). Plus votre niveau de piratage est élevé, plus vous avez de réputation
va gagner. Notez que lorsque vous travaillez pour une faction, vous pouvez choisir de ne pas interagir
avec le reste du jeu de quelque manière que ce soit gagner en notoriété à toute allure. Vous pouvez également choisir de
faites autre chose simultanément, gagnez en réputation un peu plus lentement, jusqu'à ce que vous vous concentriez à nouveau.
Vous pouvez annuler votre travail de faction à tout moment sans pénaliser votre réputation acquise jusqu'à présent.

Achat de mises à niveau et d'augmentations
-------------------------------------
Comme je l'ai déjà mentionné, en 1 à 2 heures, j'avais gagné plus de 200 millions de dollars. Maintenant, il est temps
dépenser tout cet argent dans des améliorations persistantes pour aider à progresser !

Mise à niveau de la RAM sur l'ordinateur personnel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
La chose la plus importante à mettre à niveau en ce moment est la RAM de votre ordinateur personnel. Cette
vous permettra d'exécuter plus de scripts.

Pour mettre à jour votre RAM, allez dans l'onglet |Ville| et visitez l'entreprise |Alpha Enterprises|.
Il y aura une option indiquant :code:`Acheter de la RAM supplémentaire pour l'ordinateur personnel`.
Cliquez dessus et suivez la boîte de dialogue pour mettre à niveau votre RAM.

Je recommande d'obtenir la RAM de votre ordinateur personnel à *au moins* 128 Go. Obtenir même
plus haut serait mieux.

Acheter vos premières augmentations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Une fois que vous avez atteint ~1000 points de réputation auprès de la |faction CyberSec|, vous pouvez acheter
votre première :ref:`Augmentation <gameplay_augmentations>` d'eux.

Pour cela, rendez-vous dans l'onglet |Factions| dans le menu de navigation de gauche
(|Raccourci clavier| Alt + f) et sélectionnez |CyberSec|. Il y a un bouton
près du bas qui dit :code:`Purchase Augmentations`. Cela fera apparaître un
page qui affiche toutes les augmentations disponibles à partir de |CyberSec|. Certains d'entre eux
peut être verrouillé en ce moment. Pour les débloquer, vous devrez gagner plus
réputation auprès de |CyberSec|.

Les augmentations donnent des améliorations persistantes sous la forme de multiplicateurs. Ce ne sont pas très
puissant en début de partie car les multiplicateurs sont petits. Cependant, les effets
des augmentations s'empilent de manière multiplicative ** les unes avec les autres **, de sorte que vous continuez à installer
de nombreuses augmentations leurs effets augmenteront considérablement.

Pour cette raison, je recommanderais d'investir davantage dans des mises à niveau de RAM pour votre ordinateur personnel plutôt que
que les augmentations au début. Avoir suffisamment de RAM pour exécuter de nombreux scripts vous permettra de faire
beaucoup plus d'argent, et vous pourrez revenir plus tard et obtenir toutes ces augmentations.

En ce moment, je suggère d'acheter au moins le :code:`Neurotrainer I` Augmentation de
|CyberSec|. Si vous avez de l'argent à dépenser, je suggérerais également d'obtenir :code:`BitWire` et
plusieurs niveaux des augmentations :code:`NeuroFlux Governor` (:code:`NFG`). A noter qu'à chaque fois
vous achetez une augmentation,
:ref:`le prix d'achat d'un autre augmente de 90 % <gameplay_augmentations_purchasingmultiple>`,
alors assurez-vous d'acheter d'abord l'augmentation la plus chère. Ne vous inquiétez pas, une fois que vous avez choisi de
installez des augmentations, leurs prix seront réinitialisés à leurs valeurs d'origine.

Prochaines étapes
----------
C'est la fin de la partie pas à pas de ce guide ! Vous devriez continuer à explorer
ce que le jeu a à offrir. Il y a pas mal de fonctionnalités qui ne sont pas couvertes ou mentionnées
dans ce guide, et encore plus qui se déverrouillent au fur et à mesure que vous continuez à jouer !

Consultez également la documentation :ref:`netscript` pour voir ce qu'elle a à offrir. En train d'écrire
les scripts pour effectuer et automatiser diverses tâches sont l'endroit où le plus de plaisir dans le jeu vient
de (à mon avis)!

Voici quelques choses que vous voudrez peut-être envisager de faire dans un proche avenir.

Installation d'augmentations (et réinitialisation)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Si vous avez acheté des :ref:`gameplay_augmentations`, vous devrez les installer avant de
obtiennent réellement leurs effets. L'installation d'Augmentations est la "réinitialisation logicielle" ou le "prestige" du jeu.
mécanicien. Vous pouvez :ref:`lire plus de détails à ce sujet ici <gameplay_augmentations_installing>`.

Pour installer vos augmentations, cliquez sur l'onglet |Augmentations| sur la navigation de gauche
menu (|raccourci clavier| Alt + a). Vous verrez une liste de toutes les augmentations
vous avez acheté. En dessous, vous verrez un bouton indiquant :code:`Install Augmentations`.
Soyez averti, après avoir cliqué dessus, il n'y a aucun moyen de l'annuler (sauf si vous chargez une sauvegarde antérieure).

Automatisation du processus de démarrage du script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Chaque fois que vous installez Augmentations, tous vos scripts sont tués et vous devrez
les relancer. Faire cela à chaque fois que vous installez Augmentations serait très fastidieux et ennuyeux,
vous devez donc écrire un script pour automatiser le processus. Voici un exemple simple pour un
script de démarrage. N'hésitez pas à l'ajuster à votre guise.

.. code:: javascript
    /** @param {NS} ns */
    export async function main(ns) {
         // Tableau de tous les serveurs qui n'ont besoin d'aucun port ouvert
         // pour obtenir un accès root. Ceux-ci ont 16 Go de RAM
        const servers0Port = ["sigma-cosmetics",
                            "joesguns",
                            "nectar-net",
                            "hong-fang-tea",
                            "harakiri-sushi"];

        // Tableau de tous les serveurs qui n'ont besoin que d'un seul port ouvert
         // pour gagner un accès administrateur. Ceux-ci ont 32 Go de RAM
        const servers1Port = ["neo-net",
                            "zer0",
                            "max-hardware",
                            "iron-gym"];

         // Copiez nos scripts sur chaque serveur nécessitant 0 port
         // pour obtenir un accès root. Utilisez ensuite nuke() pour obtenir un accès administrateur et
         // exécute les scripts.
        for (let i = 0; i < servers0Port.length; ++i) {
            const serv = servers0Port[i];

            ns.scp("early-hack-template.script", serv);
            ns.nuke(serv);
            ns.exec("early-hack-template.script", serv, 6);
        }

        // Attendre que nous acquérions le programme "BruteSSH.exe"
        while (!ns.fileExists("BruteSSH.exe")) {
            await ns.sleep(60000);
        }

         // Copiez nos scripts sur chaque serveur nécessitant 1 port
         // pour obtenir un accès root. Ensuite, utilisez brutessh() et nuke()
         // pour obtenir un accès administrateur et exécuter les scripts.
        for (let i = 0; i < servers1Port.length; ++i) {
            const serv = servers1Port[i];

            ns.scp("early-hack-template.script", serv);
            ns.brutessh(serv);
            ns.nuke(serv);
            ns.exec("early-hack-template.script", serv, 12);
        }
    }
Conseils divers
-----------
* Au début du jeu, il est préférable de dépenser votre argent pour mettre à niveau la RAM et acheter
   de nouveaux serveurs plutôt que de le dépenser en augmentations
* Plus il y a d'argent disponible sur un serveur, plus le :js:func:`hack` et
   :js:func:`grow` Les fonctions Netscript le seront. C'est parce que ces deux fonctions
   utiliser des pourcentages plutôt que des valeurs fixes. :js:func:`hack` vole un pourcentage du serveur
   total de l'argent disponible, et :js:func:`grow` augmente l'argent d'un serveur de X %.
* Il y a une limite à combien d'argent peut exister sur un serveur. Cette valeur est différente pour chaque
   serveur. La fonction :js:func:`getServerMaxMoney` vous indiquera cette valeur maximale.
* A ce stade du jeu, vos statistiques de combat (force, défense, etc.)
   aussi utile que vos statistiques de piratage. N'investissez pas trop de temps ou d'argent pour gagner le combat
   exp.stat.
* En règle générale, votre cible de piratage devrait être le serveur avec l'argent maximum le plus élevé
   le niveau de piratage requis est inférieur à la moitié de votre niveau de piratage.



.. Définitions de substitution
.. |Alpha Enterprises|      replace:: :code:`Alpha Enterprises`
.. |Augmentations tab|      replace:: :code:`Augmentations` tab
.. |AutoLink|               replace:: :code:`AutoLink.exe`
.. |BruteSSH|               replace:: :code:`BruteSSH.exe`
.. |City tab|               replace:: :code:`City` tab
.. |CyberSec|               replace:: :code:`CyberSec`
.. |CyberSec faction|       replace:: :code:`CyberSec` :ref:`faction <gameplay_factions>`
.. |Factions tab|           replace:: :code:`Factions` tab
.. |Keyboard shortcut|      replace:: :ref:`Keyboard shortcut <shortcuts>`
.. |NUKE|                   replace:: :code:`NUKE.exe`
.. |Terminal|               replace:: :code:`Terminal`
.. |n00dles|             replace:: :code:`n00dles`
.. |harakiri-sushi|         replace:: :code:`harakiri-sushi`
.. |hong-fang-tea|          replace:: :code:`hong-fang-tea`
.. |joesguns|               replace:: :code:`joesguns`
.. |nectar-net|             replace:: :code:`nectar-net`
.. |sigma-cosmetics|        replace:: :code:`sigma-cosmetics`
