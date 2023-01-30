Guide de démarrage pour les programmeurs débutants
==============================================

.. note :: Notez que les scripts et les stratégies donnés dans ce guide ne sont pas nécessairement
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

Right now, we want a hacking level of 10. You need approximately 174 hacking experience to reach
level 10. You can check how much hacking experience you have by clicking the `Stats` tab
on the left-hand navigation menu, or by using |Keyboard shortcut| Alt + c.
Since studying at Rothman University earns you 1 experience per second, this will take
174 seconds, or approximately 3 minutes. Feel free to do something in the meantime!

Editing our Hacking Script
--------------------------
Now that we have a hacking level of 10, we can hack the :code:`joesguns` server. This server
will be slightly more profitable than :code:`n00dles`. Therefore, we want to change our hacking
script to target :code:`joesguns` instead of :code:`n00dles`.

Go to |Terminal| and edit the hacking script by entering::

    $ home
    $ nano early-hack-template.js

At the top of the script, change the `target` variable to be `joesguns`:

.. code:: javascript

    const target = "joesguns";

Note that this will **NOT** affect any instances of the script that are already running.
This will only affect instances of the script that are ran from this point forward.

Creating a New Script to Purchase New Servers
---------------------------------------------
Next, we're going to create a script that automatically purchases additional servers. These
servers will be used to run many scripts. Running this script will initially be very
expensive since purchasing a server costs money, but it will pay off in the long run.

In order to create this script, you should familiarize yourself with the following
Netscript functions:

* :js:func:`purchaseServer`
* :js:func:`getPurchasedServerCost`
* :js:func:`getPurchasedServerLimit`
* :js:func:`getServerMoneyAvailable`
* :js:func:`scp`
* :js:func:`exec`

Create the script by going to |Terminal| and typing::

    $ home
    $ nano purchase-server-8gb.js

Paste the following code into the script editor:

.. code:: javascript
    /** @param {NS} ns */
    export async function main(ns) {
        // How much RAM each purchased server will have. In this case, it'll
        // be 8GB.
        const ram = 8;

        // Iterator we'll use for our loop
        let i = 0;

        // Continuously try to purchase servers until we've reached the maximum
        // amount of servers
        while (i < ns.getPurchasedServerLimit()) {
            // Check if we have enough money to purchase a server
            if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
                // If we have enough money, then:
                //  1. Purchase the server
                //  2. Copy our hacking script onto the newly-purchased server
                //  3. Run our hacking script on the newly-purchased server with 3 threads
                //  4. Increment our iterator to indicate that we've bought a new server
                let hostname = ns.purchaseServer("pserv-" + i, ram);
                ns.scp("early-hack-template.script", hostname);
                ns.exec("early-hack-template.script", hostname, 3);
                ++i;
            }
            //Make the script wait for a second before looping again.
            //Removing this line will cause an infinite loop and crash the game.
            await ns.sleep(1000);
        }
    }

This code uses a while loop to purchase the maximum amount of servers using the
:js:func:`purchaseServer` Netscript function. Each of these servers will have
8GB of RAM, as defined in the :code:`ram` variable. Note that the script uses the command
:code:`getServerMoneyAvailable("home")` to get the amount of money you currently have.
This is then used to check if you can afford to purchase a server.

Whenever the script purchases a new server, it uses the :js:func:`scp` function to copy
our script onto that new server, and then it uses the :js:func:`exec` function to
execute it on that server.

To run this script, go to |Terminal| and type::

    $ run purchase-server-8gb.js

This purchase will continuously run until it has purchased the maximum number of servers.
When this happens, it'll mean that you have a bunch of new servers that are all running
hacking scripts against the :code:`joesguns` server!

.. note::

    The reason we're using so many scripts to hack :code:`joesguns` instead of targeting other
    servers is because it's more effective. This early in the game, we don't have enough RAM
    to efficiently hack multiple targets, and trying to do so would be slow as we'd be spread
    too thin. You should definitely do this later on, though!

Note that purchasing a server is fairly expensive, and purchasing the maximum amount of
servers even more so. At the time of writing this guide, the script above requires
$11 million in order to finish purchasing all of the 8GB servers.
Therefore, we need to find additional ways to make money to speed
up the process! These are covered in the next section.

Additional Sources of Income
----------------------------
There are other ways to gain money in this game besides scripts & hacking.

Hacknet Nodes
^^^^^^^^^^^^^
If you completed the introductory tutorial, you were already introduced to this method: Hacknet Nodes.
Once you have enough money, you can start upgrading your Hacknet Nodes in order to increase
your passive income stream. This is completely optional. Since each Hacknet Node upgrade
takes a certain amount of time to "pay itself off", it may not necessarily be in your best
interest to use these.

Nonetheless, Hacknet Nodes are a good source of income early in the game, although
their effectiveness tapers off later on. If you do wind up purchasing and upgrading Hacknet Nodes,
I would suggest only upgrading their levels for now. I wouldn't bother with RAM and Core
upgrades until later on.

Crime
^^^^^
The best source of income right now is from :ref:`committing crimes <gameplay_crimes>`.
This is because it not only gives you a large amount of money, but it also raises your
hacking level. To commit crimes, click on the :code:`City` tab on the left-hand
navigation menu or use the |Keyboard shortcut| Alt + w.
Then, click on the link that says :code:`The Slums`.

In the Slums, you can attempt to commit a variety of crimes, each of which gives certain
types of experience and money if successful. See :ref:`gameplay_crimes` for more details.

.. note::

    You are not always successful when you attempt to commit a crime. Nothing bad happens
    if you fail a crime, but you won't earn any money and the experience gained will be
    reduced. Raising your stats improves your chance of successfully committing a crime.

Right now, the best option is the :code:`Rob Store` crime. This takes 60 seconds to attempt
and gives $400k if successful. I suggest this crime because you don't have to click or check
in too often since it takes a whole minute to attempt. Furthermore, it gives hacking experience,
which is very important right now.

Alternatively, you can also use the :code:`Shoplift` crime. This takes 2 seconds to attempt
and gives $15k if successful. This crime is slightly easier and is more profitable
than :code:`Rob Store`, but it requires constant clicking and it doesn't give
hacking experience.

Work for a Company
^^^^^^^^^^^^^^^^^^
If you don't want to constantly check in on the game to commit crimes, there's another option
that's much more passive: working for a :ref:`company <gameplay_companies>`.
This will not be nearly as profitable  as crimes, but it's completely passive.

Go to the :code:`City` tab on the left-hand navigation menu and then go to
:code:`Joe's Guns`. At :code:`Joe's Guns`, there will be an option that says
:code:`Apply to be an Employee`. Click this to get the job. Then, a new option
will appear that simply says :code:`Work`. Click this to start working.
Working at :code:`Joe's Guns` earns $110 per second and also grants some experience
for every stat except hacking.

Working for a company is completely passive. You can choose to focus on your work, do
something else simultaneously, or switch between those two. While you focus on work,
you will not be able to do anything else in the game. If you do something else meanwhile,
you will not gain reputation at the same speed. You can cancel working at any time.
You'll notice that cancelling your work early causes you to lose out on some reputation
gains, but you shouldn't worry about this. Company reputation isn't important right now.

Once your hacking hits level 75, you can visit :code:`Carmichael Security` in the city
and get a software job there. This job offers higher pay and also earns you
hacking experience.

There are many more companies in the |City tab| that offer more pay and also more gameplay
features. Feel free to explore!

After you Purchase your New Servers
-----------------------------------
After you've made a total of $11 million, your automatic server-purchasing script should
finish running. This will free up some RAM on your home computer. We don't want this RAM
to go to waste, so we'll make use of it. Go to |Terminal| and enter the following commands::

    $ home
    $ run early-hack-template.js -t 3

Reaching a Hacking Level of 50
------------------------------
Once you reach a hacking level of 50, two new important parts of the game open up.

Creating your first program: BruteSSH.exe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
On the left-hand navigation menu you will notice a :code:`Create Programs` tab with a
red notification icon. This indicates that there are programs available to be created.
Click on that tab (or use |Keyboard shortcut| Alt + p) and you'll see a
list of all the programs you can currently create. Hovering over a program will give a
brief description of its function. Simply click on a program to start creating it.

Right now, the program we want to create is :code:`BruteSSH.exe`. This program is used
to open up SSH ports on servers. This will allow you to hack more servers,
as many servers in the game require a certain number of opened ports in order for
:code:`NUKE.exe` to gain root access.

When you are creating a program, you cannot interact with any other part of the game.
Feel free to cancel your work on creating a program at any time, as your progress will
be saved and can be picked back up later. :code:`BruteSSH.exe` takes about
10 minutes to complete.

Optional: Create AutoLink.exe
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
On the :code:`Create Programs` page, you will notice another program you can create
called :code:`AutoLink.exe`. If you don't mind waiting another 10-15 minutes, you should
go ahead and create this program. It makes it much less tedious to connect to other servers,
but it's not necessary for progressing.

Joining your first faction: CyberSec
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Shortly after you reached level 50 hacking, you should have received a message that
said this::

    Message received from unknown sender:

    We've been watching you. Your skills are very impressive. But you're wasting
    your talents. If you join us, you can put your skills to good use and change
    the world for the better. If you join us, we can unlock your full potential.
    But first, you must pass our test. Find and hack our server using the Terminal.

    -CyberSec

    This message was saved as csec-test.msg onto your home computer.

If you didn't, or if you accidentally closed it, that's okay! Messages get saved onto
your home computer. Enter the following |Terminal| commands to view the message::
 
    $ home
    $ cat csec-test.msg

This message is part of the game's main "quest-line". It is a message from the
|CyberSec faction| that is asking you to pass their test.
Passing their test is simple, you just have to find their server and hack it through
the |Terminal|. Their server is called :code:`CSEC`.
To do this, we'll use the :ref:`scan_analyze_terminal_command`
Terminal command, just like we did before::

    $ home
    $ scan-analyze 2

This will show you the network for all servers that are up to 2 "nodes" away from
your home computer. Remember that the network is randomly generated so it'll look
different for everyone. Here's the relevant part of my :code:`scan-analyze` results::

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

This tells me that I can reach :code:`CSEC` by going through :code:`iron-gym`::

    $ connect iron-gym
    $ connect CSEC

.. note::

    If you created the :code:`AutoLink.exe` program earlier, then there is an easier
    method of connecting to :code:`CSEC`. You'll notice that in the :code:`scan-analyze`
    results, all of the server hostnames are white and underlined. You can simply
    click one of the server hostnames in order to connect to it. So, simply click
    :code:`CSEC`!

.. note::

    Make sure you notice the required hacking skill for the :code:`CSEC` server.
    This is a random value between 51 and 60. Although you receive the message
    from CSEC once you hit 50 hacking, you cannot actually pass their test
    until your hacking is high enough to install a backdoor on their server.

After you are connected to the :code:`CSEC` server, you can backdoor it. Note that this
server requires one open port in order to gain root access. We can open the SSH port
using the :code:`BruteSSH.exe` program we created earlier. In |Terminal|::

    $ run BruteSSH.exe
    $ run NUKE.exe
    $ backdoor

After you successfully install the backdoor, you should receive a faction
invitation from |CyberSec| shortly afterwards. Accept it. If you accidentally
reject the invitation, that's okay. Just go to the :code:`Factions` tab
(|Keyboard shortcut| Alt + f) and you should see an option that lets you
accept the invitation.

Congrats! You just joined your first faction. Don't worry about doing anything
with this faction yet, we can come back to it later.

Using Additional Servers to Hack Joesguns
-----------------------------------------
Once you have the |BruteSSH| program, you will be able to gain root access
to several additional servers. These servers have more RAM that you can use to
run scripts. We'll use the RAM on these servers to run more scripts that target
:code:`joesguns`.

Copying our Scripts
^^^^^^^^^^^^^^^^^^^
The server's we'll be using to run our scripts are:

* :code:`neo-net`
* :code:`zer0`
* :code:`max-hardware`
* :code:`iron-gym`

All of these servers have 32GB of RAM. You can use the |Terminal| command
:code:`scan-analyze 3` to see for yourself. To copy our hacking scripts onto these servers,
go to |Terminal| and run::

    $ home
    $ scp early-hack-template.js neo-net
    $ scp early-hack-template.js zer0
    $ scp early-hack-template.js max-hardware
    $ scp early-hack-template.js iron-gym

Since each of these servers has 32GB of RAM, we can run our hacking script with 12 threads
on each server. By now, you should know how to connect to servers. So find and connect to
each of the servers above using the :code:`scan-analyze 3` |Terminal| command. Then, use
following |Terminal| command to run our hacking
script with 12 threads::

    $ run early-hack-template.js -t 12

Remember that if you have the |AutoLink| program, you can simply click on the hostname of a server
after running :ref:`scan_analyze_terminal_command` to connect to it.

Profiting from Scripts & Gaining Reputation with CyberSec
---------------------------------------------------------
Now it's time to play the waiting game. It will take some time for your scripts to start
earning money. Remember that most of your scripts are targeting |joesguns|. It will take a
bit for them to :js:func:`grow` and :js:func:`weaken` the server to the appropriate values
before they start hacking it. Once they do, however, the scripts will be very profitable.

.. note::

    For reference, in about two hours after starting my first script, my scripts had a
    production rate of $20k per second and had earned a total of $70 million.
    (You can see these stats on the :code:`Active Scripts` tab).

    After another 15 minutes, the production rate had increased to $25k per second
    and the scripts had made an additional $55 million.

    Your results will vary based on how fast you earned money from crime/working/hacknet nodes,
    but this will hopefully give you a good indication of how much the scripts can earn.

In the meantime, we are going to be gaining reputation with the |CyberSec faction|.
Go to the |Factions tab| on the left-hand
navigation menu, and from there select |CyberSec|. In the middle of
the page there should be a button for :code:`Hacking Contracts`.
Click it to start earning reputation for the |CyberSec| faction (as well
as some hacking experience). The higher your hacking level, the more reputation you
will gain. Note that while you are working for a faction, you can choose to not interact
with the rest of the game in any way to gain reputation at full speed. You can also select to
do something else simultaneously, gaining reputation a bit more slowly, until you focus again.
You can cancel your faction work at any time with no penalty to your reputation gained so far.

Purchasing Upgrades and Augmentations
-------------------------------------
As I mentioned before, within 1-2 hours I had earned over $200 million. Now, it's time
to spend all of this money on some persistent upgrades to help progress!

Upgrading RAM on Home computer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The most important thing to upgrade right now is the RAM on your home computer. This
will allow you to run more scripts.

To upgrade your RAM, go to the |City tab| and visit the company |Alpha Enterprises|.
There will be an option that says :code:`Purchase additional RAM for Home Computer`.
Click it and follow the dialog box to upgrade your RAM.

I recommend getting your home computer's RAM to *at least* 128GB. Getting it even
higher would be better.

Purchasing your First Augmentations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Once you get ~1000 reputation with the |CyberSec faction|, you can purchase
your first :ref:`Augmentation <gameplay_augmentations>` from them.

To do this, go to the |Factions tab| on the left-hand navigation menu
(|Keyboard shortcut| Alt + f) and select |CyberSec|. There is an button
near the bottom that says :code:`Purchase Augmentations`. This will bring up a
page that displays all of the Augmentations available from |CyberSec|. Some of them
may be locked right now. To unlock these, you will need to earn more
reputation with |CyberSec|.

Augmentations give persistent upgrades in the form of multipliers. These aren't very
powerful early in the game because the multipliers are small. However, the effects
of Augmentations stack multiplicatively **with each other**, so as you continue to install
many Augmentations their effects will increase significantly.

Because of this, I would recommend investing more in RAM upgrades for your home computer rather
than Augmentations early on. Having enough RAM to run many scripts will allow you to make
much more money, and then you can come back later on and get all these Augmentations.

Right now, I suggest purchasing at the very least the :code:`Neurotrainer I` Augmentation from
|CyberSec|. If you have the money to spare, I would also suggest getting :code:`BitWire` and
several levels of the :code:`NeuroFlux Governor` (:code:`NFG`) Augmentations. Note that each time
you purchase an Augmentation,
:ref:`the price of purchasing another increases by 90% <gameplay_augmentations_purchasingmultiple>`,
so make sure you buy the most expensive Augmentation first. Don't worry, once you choose to
install Augmentations, their prices will reset back to their original values.

Next Steps
----------
That's the end of the walkthrough portion of this guide! You should continue to explore
what the game has to offer. There's quite a few features that aren't covered or mentioned
in this guide, and even more that get unlocked as you continue to play!

Also, check out the :ref:`netscript` documentation to see what it has to offer. Writing
scripts to perform and automate various tasks is where most of the fun in the game comes
from (in my opinion)!

The following are a few things you may want to consider doing in the near future.

Installing Augmentations (and Resetting)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you've purchased any :ref:`gameplay_augmentations`, you'll need to install them before you
actually gain their effects. Installing Augmentations is the game's "soft-reset" or "prestige"
mechanic. You can :ref:`read more details about it here <gameplay_augmentations_installing>`.

To install your Augmentations, click the |Augmentations tab| on the left-hand navigation
menu (|Keyboard shortcut| Alt + a). You will see a list of all of the Augmentations
you have purchased. Below that, you will see a button that says :code:`Install Augmentations`.
Be warned, after clicking this there is no way to undo it (unless you load an earlier save).

Automating the Script Startup Process
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Whenever you install Augmentations, all of your scripts are killed and you'll have to
re-run them. Doing this every time you install Augmentations would be very tedious and annoying,
so you should write a script to automate the process. Here's a simple example for a
startup script. Feel free to adjust it to your liking.

.. code:: javascript
    /** @param {NS} ns */
    export async function main(ns) {
        // Array of all servers that don't need any ports opened
        // to gain root access. These have 16 GB of RAM
        const servers0Port = ["sigma-cosmetics",
                            "joesguns",
                            "nectar-net",
                            "hong-fang-tea",
                            "harakiri-sushi"];

        // Array of all servers that only need 1 port opened
        // to gain root access. These have 32 GB of RAM
        const servers1Port = ["neo-net",
                            "zer0",
                            "max-hardware",
                            "iron-gym"];

        // Copy our scripts onto each server that requires 0 ports
        // to gain root access. Then use nuke() to gain admin access and
        // run the scripts.
        for (let i = 0; i < servers0Port.length; ++i) {
            const serv = servers0Port[i];

            ns.scp("early-hack-template.script", serv);
            ns.nuke(serv);
            ns.exec("early-hack-template.script", serv, 6);
        }

        // Wait until we acquire the "BruteSSH.exe" program
        while (!ns.fileExists("BruteSSH.exe")) {
            await ns.sleep(60000);
        }

        // Copy our scripts onto each server that requires 1 port
        // to gain root access. Then use brutessh() and nuke()
        // to gain admin access and run the scripts.
        for (let i = 0; i < servers1Port.length; ++i) {
            const serv = servers1Port[i];

            ns.scp("early-hack-template.script", serv);
            ns.brutessh(serv);
            ns.nuke(serv);
            ns.exec("early-hack-template.script", serv, 12);
        }
    }
Random Tips
-----------
* Early on in the game, it's better to spend your money on upgrading RAM and purchasing
  new servers rather than spending it on Augmentations
* The more money available on a server, the more effective the :js:func:`hack` and
  :js:func:`grow` Netscript functions will be. This is because both of these functions
  use percentages rather than flat values. :js:func:`hack` steals a percentage of a server's
  total available money, and :js:func:`grow` increases a server's money by X%.
* There is a limit to how much money can exist on a server. This value is different for each
  server. The :js:func:`getServerMaxMoney` function will tell you this maximum value.
* At this stage in the game, your combat stats (strength, defense, etc.) are not nearly
  as useful as your hacking stat. Do not invest too much time or money into gaining combat
  stat exp.
* As a rule of thumb, your hacking target should be the server with highest max money that's
  required hacking level is under 1/2 of your hacking level. 



.. Substitution definitions
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
