const mysql = require('mysql2');
require('dotenv').config();

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host     : process.env.DB_SERVER,
        user     : process.env.DB_USERNAME, // Corrige ici si DB_U2SERNAME est une faute de frappe
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME  // Corrige ici si DB_NAMEA est une faute de frappe
    });

    connection.connect((err) => {
        if (err) {
            console.error('Erreur lors de la connexion à la base de données:', err);
            setTimeout(handleDisconnect, 2000); // Réessaye après 2 secondes
        } else {
            console.log('Connecté à la base de données avec ID', connection.threadId);
        }
    });

    connection.on('error', (err) => {
        console.error('Erreur de connexion:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Réessaye si la connexion est perdue
        } else {
            throw err;
        }
    });
}

// Appelle la fonction pour établir la connexion au démarrage
handleDisconnect();

// Exporte l'objet connexion pour que d'autres fichiers puissent l'utiliser
module.exports = connection;
