# Partie serveur du projet

## installation

lancer `npm install`

Une fois les deps installées, dans le terminal integré tapez `sequelize db:create` pour créer la base de donnée `groupomania_development`.

Une fois créee, tapez `sequelize db:migrate` pour créer les tables de la base de donnée.

--Optionel Pour créer un superAdmin et un moderateur, tapez `sequelize db:seed:all`.

        Il s'agit de comptes :
            Super Admin
            email : superAdmin@email.com
            password : superadmin

            moderator
            email : moderator@email.com
            password : moderator
