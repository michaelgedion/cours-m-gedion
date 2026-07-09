# Les cours de M. Gedion — Site statique Tailwind CSS v5

## Changements visuels

- Mode clair par défaut.
- Titres diminués.
- Titres lisibles en mode sombre.
- Menu simplifié :
  - 5e
  - 3e
  - 2de → Physique-Chimie / Mathématiques
  - Première → Spécialité PC / Spécialité NSI
- Accueil avec jumbotron scientifique.
- Cartes de niveaux avec illustrations SVG locales.
- Pages de niveaux avec chapitres illustrés.
- Couleur spécifique par niveau.
- QCM avec score en haut et réponses A, B, C, D.
- Flashcards avec questions moins grandes.
- Blocs Python sur fond clair avec numéros de lignes.
- Page vidéos mieux hiérarchisée.

## Installation

```bash
npm install
npm run build
```

Développement :

```bash
npm run dev
```

## GitHub Pages

Dans GitHub :

```text
Settings → Pages → Source → GitHub Actions
```

Le workflow `.github/workflows/pages.yml` compile Tailwind automatiquement.

## Modifier

- Images : `assets/img/`
- Pages niveau : `pages/niveaux/`
- Chapitres : `pages/chapitres/`
- QCM : `assets/js/quiz.js`
- Flashcards : `assets/js/flashcards.js`
- PDF : `fichiers/pdf/`


## v6 — améliorations ajoutées

- Préparation des formules avec KaTeX.
- Possibilité d’écrire :
  - formule en ligne : `$E = mc^2$`
  - formule centrée : `$$v = \frac{d}{\Delta t}$$`
- Blocs Python plus compacts.
- Fond clair pour le code, même en mode sombre.
- Numéros de lignes plus discrets.
- Icônes SVG locales pour :
  - PDF
  - vidéo
  - QCM
  - flashcards
  - formules
  - exercices
- Tuiles de documents plus lisibles.

## Propositions d’améliorations futures

1. Ajouter une page “Tableau de bord élève” avec les derniers chapitres.
2. Ajouter une barre de progression par chapitre.
3. Ajouter des filtres : cours / TP / vidéo / QCM / correction.
4. Ajouter une page “Révisions avant évaluation”.
5. Ajouter un mode “professeur” pour masquer ou afficher les corrections.
6. Ajouter une recherche globale.
7. Ajouter des tags par compétence du BO.
8. Ajouter une page par évaluation avec barème et compétences.
9. Ajouter des mini-animations SVG pour les chapitres de PC.
10. Ajouter une page “Méthodes” commune à tous les niveaux.

## Formules

Les formules sont rendues par KaTeX via :

```text
assets/js/math.js
```

Exemple :

```html
<p>Formule : $E = mc^2$</p>

$$v = \frac{d}{\Delta t}$$
```


## v7 — corrections

- Correction du menu : les sous-menus ne disparaissent plus quand on descend la souris.
- Les sous-menus peuvent aussi s’ouvrir au clic.
- Les tuiles de documents sont plus facilement cliquables.
- Ajout d’embeds YouTube réels dans `pages/videos/index.html`.
- Ajout d’une vidéo intégrée dans `pages/chapitres/chapitre-modele.html`.

## Remplacer une vidéo YouTube

Dans une URL comme :

```text
https://www.youtube.com/watch?v=fqrHujjh1eo
```

l’identifiant est :

```text
fqrHujjh1eo
```

Dans le site, remplace simplement :

```html
https://www.youtube-nocookie.com/embed/fqrHujjh1eo
```

par :

```html
https://www.youtube-nocookie.com/embed/NOUVEL_ID
```


## v8 — QCM et flashcards avec formules et code

Les QCM et les flashcards acceptent maintenant du contenu enrichi.

### Exemple de question avec formule

Dans `assets/js/quiz.js` :

```js
{
  question: "<p>La relation correcte pour une vitesse moyenne est :</p>",
  choices: [
    "<p>$v = d \\times \\Delta t$</p>",
    "<p>$v = \\dfrac{d}{\\Delta t}$</p>",
    "<p>$v = \\dfrac{\\Delta t}{d}$</p>",
    "<p>$v = d + \\Delta t$</p>"
  ],
  answer: 1,
  explanation: "La vitesse moyenne est $v = \\dfrac{d}{\\Delta t}$."
}
```

### Exemple de question avec code Python

```js
{
  question: "<p>Que renvoie le code suivant ?</p><pre class='mini-code'><code>x = 2\\nprint(x ** 3)</code></pre>",
  choices: [
    "<p><span class='inline-code'>5</span></p>",
    "<p><span class='inline-code'>6</span></p>",
    "<p><span class='inline-code'>8</span></p>",
    "<p>Une erreur</p>"
  ],
  answer: 2,
  explanation: "<span class='inline-code'>x ** 3</span> calcule $2^3$."
}
```

### Exemple de flashcard avec formule

```js
{
  front: "<p>Formule d’une vitesse moyenne</p>",
  back: "<p>La vitesse moyenne s’écrit :</p>$$v = \\frac{d}{\\Delta t}$$"
}
```

### Exemple de flashcard avec code

```js
{
  front: "<p>Fonction Python qui calcule une vitesse</p>",
  back: "<pre class='mini-code'><code>def vitesse(distance, duree):\\n    return distance / duree</code></pre>"
}
```

Important : comme le contenu est injecté dans la page, garde ces contenus édités par toi uniquement. N’utilise pas du HTML fourni librement par des élèves sans nettoyage.


## v9 — images retenues intégrées

Les images finales retenues ont été intégrées dans `assets/img/levels/`.

Correspondance :

```text
5e.jpeg          → carte 5e
3e.jpeg          → carte 3e
2e-pc.jpeg       → carte 2de Physique-Chimie
2e-maths.jpeg    → carte 2de Mathématiques
1ePC.jpeg        → carte Première spécialité PC
1eNSI.jpeg       → carte Première spécialité NSI
```

Mise à jour effectuée : accueil, cartes de niveaux, bandeaux des pages de niveaux et sous-menus 2de/Première avec miniatures.


## v10 — accueil épuré et cards colorées

Modifications :
- suppression des trois blocs QCM / PDF / Code sur l'accueil ;
- suppression du bloc “Nouvelles fonctionnalités” ;
- suppression de la phrase sous “Choisir son espace de travail” ;
- les cards des niveaux ont maintenant une couleur de fond cohérente avec leur image :
  - 5e : bleu/violet ;
  - 3e : vert ;
  - 2de PC : orange ;
  - 2de Maths : jaune ;
  - Première PC : rouge ;
  - Première NSI : violet/sombre.


## v11 — correction réelle de l'accueil

Corrections :
- suppression effective du grand hero “Les cours de M. Gedion” avec l'image bleue ;
- suppression des blocs QCM/PDF/Code et “Nouvelles fonctionnalités” si présents ;
- suppression de la phrase sous le titre des niveaux ;
- suppression du bandeau/couleur parasite au-dessus des images ;
- couleurs des cards forcées sur l’accueil avec sélecteurs CSS prioritaires :
  - 5e : violet ;
  - 3e : vert ;
  - 2de PC : orange ;
  - 2de Maths : jaune ;
  - Première PC : rouge ;
  - Première NSI : violet/sombre.


## v12 — pages de niveaux avec chapitres fictifs numérotés

Chaque page de niveau contient maintenant une progression fictive avec chapitres numérotés, fond coloré cohérent avec la card, motifs légers, boutons Cours / Vidéo / QCM / Flashcards et recherche de chapitre.


## v13 — chapitres cliquables avec ressources fictives

Ajouts :
- 41 pages individuelles de chapitre créées dans `pages/chapitres/`.
- Chaque carte de chapitre est cliquable.
- Chaque chapitre contient :
  - une section Cours fictif ;
  - des sous-parties fictives ;
  - un PDF fictif de correction TP ;
  - un PDF fictif de correction des exercices ;
  - une zone QCM fictive ;
  - une zone Flashcards fictives.
- Les PDF sont dans `fichiers/pdf/chapitres/`.


## v14 — sections vidéo numérotées dans chaque chapitre

Ajouts :
- section `Vidéos du chapitre` dans chaque page de chapitre ;
- 3 vidéos numérotées par chapitre : Vidéo 1, Vidéo 2, Vidéo 3 ;
- embeds YouTube en `youtube-nocookie.com`;
- attribut `loading="lazy"` sur les iframes ;
- lien direct `Vidéos` depuis les cartes de chapitres.


## v15 — notions, compétences exigibles et exercices supplémentaires corrigés

Modifications :
- suppression de la section “Cours fictif” dans chaque chapitre ;
- ajout d’une section “Notions et compétences exigibles” en deux colonnes ;
- ajout d’une section “Exercices supplémentaires avec correction” dans chaque chapitre ;
- mise à jour des boutons : “Cours” devient “Notions” ;
- ajout d’un accès rapide vers les exercices supplémentaires corrigés.


## v16 — exercices verticaux et corrections déroulantes

Modifications :
- les exercices supplémentaires ne sont plus en colonnes ;
- affichage vertical : un exercice par ligne ;
- chaque correction est masquée par défaut ;
- la correction se déroule au clic grâce aux balises HTML `<details>` et `<summary>`.


## v17 — vrai modèle pédagogique de chapitre

Chaque page de chapitre a été reconstruite avec un modèle pédagogique commun :
1. Objectifs, notions et compétences exigibles ;
2. Vidéos numérotées ;
3. Activité / TP et corrections PDF ;
4. Exercices progressifs verticaux avec corrections déroulantes ;
5. QCM expliqué ;
6. Flashcards ;
7. Bilan à retenir et auto-évaluation.

Objectif pédagogique :
- rendre chaque chapitre plus lisible ;
- guider l’élève étape par étape ;
- faciliter l’autonomie ;
- conserver une structure homogène pour tous les niveaux.


## v18 — QCM, corrections, Python, flashcards, formules/images

Améliorations :
- QCM expliqué avec bonnes réponses, mauvaises réponses et explications ;
- corrections déroulantes avec fond vert ;
- boutons corrigés pour éviter blanc sur blanc ;
- blocs Python colorés ;
- emplacements pour formules et images ;
- flashcards avec recto et verso de couleurs différentes.


## v19 — QCM pages dédiées, flashcards dédiées, exercices en dernier

Modifications :
- partie 3 des chapitres : uniquement les corrections PDF ;
- suppression de l’activité guidée ;
- partie 5 : uniquement des boutons QCM ;
- création de 3 pages QCM par chapitre : QCM 1, QCM 2, QCM 3 ;
- chaque page QCM garde le modèle pédagogique : bonnes réponses, mauvaises réponses, explications, formules et emplacement image ;
- partie 6 : bouton “Ouvrir les flashcards” ;
- création d’une page flashcards dédiée par chapitre ;
- exercices placés tout à la fin du chapitre ;
- code Python passé en fond clair pour être plus lisible.


## v20 — QCM et flashcards interactifs

Modifications :
- les pages QCM ne sont plus statiques ;
- réponse cliquable avec correction immédiate ;
- score affiché et enregistrable dans le navigateur via localStorage ;
- navigation question précédente / suivante ;
- barre de progression ;
- les flashcards sont interactives :
  - clic pour retourner recto/verso ;
  - bouton précédente / suivante ;
  - bouton “Je sais” et “À revoir” ;
  - compteur de cartes connues ;
  - sauvegarde locale.


## v21 — correction chargement QCM/flashcards

Correctif :
- suppression du chargement JSON qui pouvait être mal échappé ;
- données QCM et flashcards injectées directement dans `window.__QUIZ_DATA__` et `window.__FLASH_DATA__` ;
- JavaScript rendu plus robuste ;
- flashcards recto/verso cliquables avec réponse au verso ;
- conservation des formules et images possibles dans les cartes.


## v22 — correction ERR_FILE_NOT_FOUND

Correctif :
- correction des chemins relatifs dans les pages QCM et flashcards ;
- les pages `pages/qcm/chapitres/` et `pages/flashcards/chapitres/` sont un niveau plus profond que les pages chapitre ;
- les liens vers `dist/`, `assets/`, `index.html` et `pages/niveaux/` ont été ajustés ;
- vérification automatique des liens internes HTML : 0 lien(s) local(aux) manquant(s).


## v23 — cahier de texte par niveau et matière

Modifications :
- suppression des phrases descriptives sur les pages de niveau ;
- suppression du bloc “Organisation fictive” ;
- ajout d’un bloc “Cahier de texte” sur chaque page de niveau ;
- création de 6 pages de cahier de texte dans `pages/cahier/` ;
- chaque cahier contient un travail à faire daté ;
- filtres par recherche et par date ;
- cases “Fait” sauvegardées localement avec `localStorage` ;
- vérification liens internes : 0 lien(s) cassé(s).


## v24 régénérée
- Nouveau lien valide.
- Dates au format mardi 05 juin via JavaScript.
- Devoirs en puces.
- Bouton simple sur l’accueil.
- Liens cassés: 0.


## v25 — accueil et pages niveaux simplifiés

Modifications :
- page d’accueil : uniquement un bouton simple `Voir le travail à faire` ;
- pages niveau/matière : suppression du détail des devoirs ;
- pages niveau/matière : conservation d’un seul bouton `Voir le travail à faire` ;
- images de niveau/matière remises à droite dans le bandeau ;
- suppression des textes `Organisation fictive` et phrases descriptives ;
- vérification liens internes : 0 lien(s) cassé(s).


## v26 — page globale Travail à faire
- Page `pages/cahier/travail-a-faire.html` créée.
- Bouton accueil vers page globale.
- Filtres recherche/niveau/matière/date/statut.
- Statistiques affichés/faits/à faire.
- Liens cassés : 0.


## v27 — Page Méthodes

Ajouts :
- création de `pages/methodes/index.html` ;
- création de 9 pages méthodes détaillées ;
- filtres par recherche, domaine et niveau ;
- chaque méthode contient étapes, formule, emplacement image/schéma, mini-exercice corrigé déroulant ;
- bouton `Méthodes` ajouté sur l’accueil et les pages niveau ;
- vérification liens internes : 0 lien(s) cassé(s).


## v28 — Mode professeur / élève

Ajouts :
- bouton flottant `Élève / Professeur` sur toutes les pages ;
- mode sauvegardé dans `localStorage` ;
- contenus `teacher-only` masqués en mode élève ;
- contenus `student-only` masqués en mode professeur ;
- corrections déroulantes ouvertes automatiquement en mode professeur ;
- fiches professeur ajoutées sur les pages de chapitres ;
- panneaux de pilotage ajoutés sur les pages niveau ;
- conseils professeur ajoutés sur les pages méthodes ;
- vérification liens internes : 0 lien(s) cassé(s).


## v29 — hors-ligne, révision, accessibilité, suppression mode prof/élève

Modifications :
- suppression du mode professeur / élève ;
- suppression du script `mode-prof-eleve.js` ;
- suppression des panneaux professeur et des boutons flottants ;
- ajout d’un mode hors-ligne :
  - `service-worker.js`,
  - `manifest.webmanifest`,
  - `offline.html`,
  - `assets/js/register-sw.js` ;
- ajout de `pages/revision/avant-evaluation.html` ;
- ajout des boutons `Réviser avant l’évaluation` ;
- amélioration accessibilité / contraste :
  - focus visible,
  - boutons plus lisibles,
  - tailles minimales des éléments cliquables,
  - contraste renforcé des textes et champs ;
- vérification liens internes : 21 lien(s) cassé(s).


## v29 correctif
- Liens internes revérifiés : 1 lien(s) cassé(s).
- Restes visibles du mode professeur/élève : 0 page(s).

- Correction finale liens : 0 lien(s) cassé(s).


## v30 — Apprendre à apprendre

Modifications :
- suppression de la page `pages/revision/avant-evaluation.html` ;
- suppression des boutons/liens `Réviser avant l’évaluation` ;
- création de `pages/methodes/apprendre-a-apprendre.html` ;
- ajout d’un bouton `Apprendre à apprendre` sur l’accueil ;
- ajout de la carte dans la page `Méthodes` ;
- page organisée avec onglets :
  - Courbe d’Ebbinghaus,
  - Réviser les maths,
  - Réviser la physique-chimie,
  - Réviser la NSI,
  - Plan de semaine ;
- ajout d’un schéma SVG simplifié de la courbe de l’oubli ;
- vérification liens internes : 0 lien(s) cassé(s) ;
- mentions restantes de l’ancienne page révision : 0.


## v31 — Apprendre à apprendre dans la navbar + onglets verticaux

Modifications :
- suppression du texte `Mode hors-ligne` de la page d’accueil, fonction hors-ligne conservée ;
- suppression du bouton `Apprendre à apprendre` de la page d’accueil ;
- ajout d’un onglet `Apprendre à apprendre` dans la navbar ;
- onglets de la page `Apprendre à apprendre` placés verticalement ;
- ajout de la partie `Les 3 mémoires` :
  - mémoire sensorielle,
  - mémoire de travail,
  - mémoire à long terme ;
- ajout des parties :
  - concentration en classe,
  - travail à la maison,
  - téléphone portable ;
- vérification liens internes : 0 lien(s) cassé(s).


## v32 — Accueil restauré

Modifications :
- page d’accueil restaurée avec la présentation des anciennes versions ;
- suppression sur l’accueil du bloc `Mode hors-ligne` ;
- suppression sur l’accueil du bouton `Apprendre à apprendre` ;
- fonction hors-ligne conservée : manifest + service worker + script d’enregistrement ;
- bouton `Voir le travail à faire` conservé et relié à la page globale ;
- vérification liens internes : 0 lien(s) cassé(s).

- Correctif final accueil : mention `Apprendre à apprendre` restante sur accueil = True ; liens cassés = 0.


## v33 — Réécriture complète de la page Apprendre à apprendre

Modifications :
- réécriture complète de `pages/methodes/apprendre-a-apprendre.html` ;
- contenu renforcé avec une approche sciences cognitives vulgarisée ;
- nouveaux onglets :
  - les 5 règles d’or,
  - courbe d’Ebbinghaus,
  - les 3 mémoires,
  - se concentrer en classe,
  - travailler à la maison,
  - téléphone portable,
  - mathématiques,
  - physique-chimie,
  - NSI,
  - plan de semaine ;
- ajout de tableaux, checklists, routines et conseils directement utilisables par les élèves ;
- vérification liens internes : 0 lien(s) cassé(s).


## v34 — Intégration de la page fournie

Modifications :
- utilisation du fichier HTML fourni par l’utilisateur comme nouvelle page `pages/methodes/apprendre-a-apprendre.html` ;
- conservation de la page dans l’emplacement concerné ;
- correction automatique des chemins relatifs vers `dist/`, `assets/`, `pages/`, `manifest.webmanifest` et les scripts ;
- carte `Apprendre à apprendre` conservée dans la page `Méthodes` ;
- vérification liens internes : 0 lien(s) cassé(s).


## v35 — Page Apprendre à apprendre plus lisible + Font Awesome

Modifications :
- restructuration complète de `pages/methodes/apprendre-a-apprendre.html` ;
- conservation des contenus principaux : règles d’or, Ebbinghaus, 3 mémoires, concentration, travail à la maison, téléphone, maths, physique-chimie, NSI, plan de semaine ;
- remplacement des onglets par un sommaire latéral sticky plus lisible ;
- découpage en sections courtes, cartes, checklists, tableaux et callouts ;
- ajout de Font Awesome via CDN ;
- ajout d’icônes dans le sommaire, les titres et les cartes ;
- amélioration de la lisibilité mobile ;
- vérification liens internes : 0 lien(s) cassé(s).


## v36 — Forme v35 + contenu du fichier fourni

Modifications :
- conservation de la forme lisible de la v35 : sommaire latéral sticky, cartes, checklists, sections courtes, Font Awesome ;
- récupération du contenu depuis `/mnt/data/apprendre-a-apprendre(1).html` ;
- réorganisation du contenu fourni en sections :
  - règles d’or,
  - oubli et rappels espacés,
  - 3 mémoires,
  - métacognition,
  - concentration en classe,
  - travail à la maison,
  - téléphone portable,
  - sommeil et corps,
  - maths,
  - physique-chimie,
  - NSI,
  - plan de semaine ;
- blocs/titres repris : 45/45 ;
- vérification liens internes : 0 lien(s) cassé(s).


## v37 — Apprendre à apprendre en une seule colonne

Modifications :
- page `Apprendre à apprendre` forcée en une seule colonne ;
- suppression de la grille 2 colonnes / 3 colonnes sur cette page ;
- sommaire placé au-dessus du contenu, non latéral ;
- cartes affichées les unes sous les autres ;
- largeur de lecture limitée pour améliorer le confort ;
- vérification liens internes : 0 lien(s) cassé(s).
