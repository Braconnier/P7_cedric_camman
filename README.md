# Projet 7 de la formation web Dev d'OpenClassroom

==========================

## Notes d'installation

==========================

pour le back, Rendez-vous ici => [readme du back](https://github.com/Braconnier/P7_cedric_camman/blob/main/back/README.md).

pour le front:

lancer un terminal dans la racine du front et entrez `npm install`.

Créer un fichier `.env` à la racine du front contenant la variable d'environnement: `REACT_APP_API_URL=http://localhost:5000/api`.

=========================================================================================================

## Le but du projet est de créer un réseau social d'entreprise pour la compagnie (fictive) Groupomania.

### Context

La direction a récemment détecté une baisse de productivité liée à la baisse de la motivation de ses salariés. Aussi, après la mise en place d'un comité de pilotage sur le bien être au travail elle conclu que la création d'un réseau social interne pourrait améliorer les conditions de travail.

#### Perimètre

- La presentation des fonctionnalités doit être simple.
- La création d'un compte doit être simple et possible depuis un téléphone mobile.
- Le profil doit contenir très peu d'informations pour que sa complétion soit rapide.
- L'accès à un forum où les salariés publient des contenus multimédias doit être présent.
- L'accès à un forum où les salariés publient des textes doit être présent.
- Les utilisateurs doivent pouvoir facilement repérer les dernieres participations des employés.
- le ou la chargé(e) de communication Groupomania doit pouvoir modérer les interactions entre salariés.

================

## Réalisation

================

### Partie BackEnd

la base de donnée repose sur le dialect MySQL.

Elle contient 4 tables.

- posts : elle contient les informations de posts (id; userId; body, timestamps)
- users : elle contient les informations des utilisateurs(id; name; email; password(encryptés avec bcrypt);profilleImgUrl(URL de la photo de profil); bio; role; active(status actif/inactif pour ne pas 'destroy' l'utilisateur), timestamps )
- comments : elle contient les informations de commentaires (id; postId; userId; body; timestamps)
- likes : elle contient les informations des likes (id; postId; userId)

================

la BDD est construite avec l'ORM `sequelize` et `sequelize-cli` (géneration des models, migration, associations, masquage de colonnes à la réponse JSON, validation de données...)

Le serveur est construit avec `express` l'athentification est assurrée par `jsonwebtoken` et les routes sont sécurisée.

La géstion des fichiers est assurrée par `multer`.

des variables d'environnement sont nécessaires et sont détaillées dans les readme

des images de profil par défaut sont prévus pour les membres, l'administrateur et le moderateur (ces dernières ne sont pas supprimé lorsque l'utilisateur modifie son image de profil.)

================

s'agissant d'un MVP, les fonctionnalités sont limitées. la création des comptes administrateur et moderateur se font par seed (c.f. readme du back).

l'administrateur peut modifier ou supprimer les saisies des utilisateur.
le moderateur a les mêmes privilèges mais ne peut ni éditer ni supprimer les contenus de l'administrateur.

### Partie FrontEnd

le front a été crée avec `REACT`.
la gestion des données est gérée par `Redux`.
les reqètes sont faites avec `axios`.
Le style a été fait avec `sass`.

A l'ouverture de l'application, l'utilisateur est invité à se connecter ou s'inscrire.

Il pourra par la suite modifier sa photo de profil et editer sa Bio.

le retour des erreurs de nom email et MdP sont affichées à la validation du formulaire (unicité, format, etc).

L'utilisateur une fois connecté pourras publier un post soit texte, soit image, soit les deux.
Il pourra editer son texte à posteriori. iIl pourras supprimer son post.

Il pourra commenter et/ou 'liker' les publication des autres utilisateurs.

Les données sont persistantes. La duré de validité du token d'accès est 'réglée' à 24h.
