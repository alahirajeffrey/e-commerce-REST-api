const router = require('express').Router();

router.get('/hello', (req, res)=>{
    res.send("working")
})

module.exports = router;