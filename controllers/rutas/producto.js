const { Router } = require('express');
const router = Router();

router.get('/test1', (req, res) => {
    res.send('"Titulo": "la pupuseria"');
})

module.exports = router;