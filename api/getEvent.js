const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Intranet:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - published
 *       properties:
 *         event_title:
 *           type: string
 *           description: The title of your book
 *         event_date:
 *           type: string
 *           description: The book explanation
 *         descriptions:
 *           type: string
 *           description: The descriptions of evenement
 *         hours:
 *           type: string
 *           description: End evenement
 *         type:
 *           type: string
 *           description: Type of calendar
 */
/**
 * @swagger
 * tags:
 *   name: Intranet
 *   description: La documentation de l'API de calendrier
 * /:
 *   get:
 *     summary: Afficher tout les évenements de tout les calendriers
 *     tags: [Intranet]
 *     responses:
 *       200:
 *         description: La liste des évenements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intranet'
 * /createevent/:
 *  post:
 *     summary: Crée un évenement
 *     tags: [Intranet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intranet'
 *     responses:
 *       200:
 *         description: La création de l'évenement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intranet'
 *       500:
 *         description: Une erreur serveur est survenue
 * /id/{id}:
 *   get:
 *     summary: Regarder un évenement en particulier grâce à un ID
 *     tags: [Intranet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'évenement
 *     responses:
 *       200:
 *         description: La réponse
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intranet'
 *       404:
 *         description: L'évenement n'a pas était trouvé
 * /delete/{id}:
 *   delete:
 *     summary: Supprimer un évenement grâce à un ID
 *     tags: [Intranet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'évenement à supprimer
 *
 *     responses:
 *       200:
 *         description: L'évenement à bien était supprimé
 *       404:
 *         description: L'ID de l'évenement à supprimer
 */
 

// Route GET pour obtenir tous les événements
router.get('/', (req, res) => {
    const query = 'SELECT * FROM clients';

    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.error("Une erreur est survenue:", err);
            res.status(500).send("Une erreur s’est produite lors de l’exécution de la requête.");
            return;
        }

        console.log("Requête exécutée avec succès:", rows);
        res.status(200).json(rows);
    });
});

module.exports = router;
