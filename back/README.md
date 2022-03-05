# Partie serveur du projet

## installation

lancer `npm install`

Une fois les deps installées, dans le terminal integré du back, tapez `sequelize db:create` pour créer la base de donnée `groupomania_development`.

Une fois créee, tapez `sequelize db:migrate` pour créer les tables de la base de donnée.

--Optionel Pour créer un superAdmin et un moderateur, tapez `sequelize db:seed:all`.

        Il s'agit de comptes :
            Super Admin
            email : superAdmin@email.com
            password : superadmin

            moderator
            email : moderator@email.com
            password : moderator

dans le répertoire `back/config`, créez un fichier `.env` contenant les variables :

- ` PRIVATE_TOKEN_STRING=` assignez y la clé secrète comme vous le souhaitez \*
- `SERVER_PORT=5000`
- `CLIENT_URL=http://localhost:3000`

Dans `back/config/config.json`, veillez à mettre vos identifiants de connection à la base de donnée MySQL.

- Vous pouvez générer une clé secrète en tapant la commande bash `openssl rand -base64 64` et en la nettoyant des caractères non alphanumériques.
