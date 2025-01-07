const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
 

function ensureConnection(callback) {
    if (!connection || connection.state === 'disconnected') {
        console.log("Connexion perdue, tentative de reconnexion...");
        handleDisconnect();
    }
    callback();
}

// Exemple pour la route GET
router.get('/', (req, res) => {
    ensureConnection(() => {
        const query = 'SELECT * FROM clients';
        connection.query(query, function(err, rows) {
            if (err) {
                console.error("Une erreur est survenue:", err);
                res.status(500).send("Erreur lors de l'exécution de la requête.");
                return;
            }
            res.status(200).json(rows);
        });
    });
});

module.exports = router;
