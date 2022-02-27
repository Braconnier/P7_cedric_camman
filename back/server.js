// Necessaire pour la création d'un serveur HTTPS
const http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const serverPort = process.env.SERVER_PORT
const app = require('./app')


// Normalisation du port du serveur
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Déclaration du port du serveur (port normalisé ou port 3000 par defaut)
const port = normalizePort(serverPort || '3030');

app.set('port', port);

// gestion d'erreurs du port
const errorHandler = error => {

    // Si le serveur n'ecoute pas (syscall 50) 
    if (error.syscall !== 'listen') {
        throw error;
    }

    // 
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {

        // Permission refusée
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;

        // Port déjà en cours d'utilistation
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const server = http.createServer(app);

// Ecoute les erreurs
server.on('error', errorHandler);

// Consignation de l'adresse et du port dans la console
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Le serveur écoute sur le port approprié
server.listen(port);