const express = require('express');
const router = express.Router();
const path = require('path');


router.get("/card_info", (req, res) => {
    console.log(req.param.id);
    res.sendFile(path.join(appRoot,'src/views/card_info.html'));
});

module.exports = router;