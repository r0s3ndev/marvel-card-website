const express = require('express');
// const crypto = require('crypto');
require('dotenv').config();
const router = express.Router();

// const public_key = process.env.PUBLIC_KEY;
// const private_key = process.env.PRIVATE_KEY;
const url = "https://hp-api.onrender.com/api/characters";

//Endpoint configuration
// const time_stamp = new Date().getTime();
// const hash = crypto.createHash('md5').update(`${time_stamp}${private_key}${public_key}`).digest('hex');
// const auth = `?limit=10&ts=${time_stamp}&apikey=${public_key}&hash=${hash}`;

router.get("/characters", async (req, res) => {
    try {
        // const apiUrl = url + `v1/public/characters` + auth + `&offset=${randomOffset}`;
        // console.log(apiUrl);
        const response = await fetch(url);
        const json = await response.json();
        res.json(json);
    } catch (error) {
        console.error('Error fetching Harry Potter API data:', error);
        res.status(500).json({ error: 'Failed to fetch Harry Potter characters' });
    }
});

router.get("/characters/:id", async (req, res) => {
    const characterId = req.params.id;
    console.log("Fetching character with ID:", characterId);

    try{
        // const apiUrl = url + `v1/public/characters/${characterId}` + auth;
        const response = await fetch(url + "/${characterId}"); 
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error geting character with id:', error);
        res.status(500).json({ error: 'Failed to fetch Marvel characters' });
    }
});



module.exports = router;
