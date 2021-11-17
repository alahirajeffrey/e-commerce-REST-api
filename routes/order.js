const router = require('express').Router();

router.get("/hello", (req, res)=>{
    res.send("Hello world")
})

module.exports = router;