const express = require("express")
const router = express.Router()
const path = require("path")
const openai = require("../openai")
const usercon = require("../controllers/usercon.js")
const bp = require("body-parser")
router.use(bp.urlencoded({extended: true}));



router.get("^/$|/index(.html)?", usercon.isAuth, function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/index.html"))
    if(req.query.error === "Cannot access door 3 yet")
        console.log(req.query.error)
        
})


router.get("/register", function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/register.html"))
});

router.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "..", "/views", "/login.html"))
});

router.post("/register", usercon.regcon);
router.post("/login", usercon.logincon);
router.get("/logout", usercon.isAuth, usercon.logout_post);
router.get("/getpermissions", usercon.isAuth, usercon.getpermissions);
router.post("/timesave", usercon.isAuth, usercon.timesave);
router.get("/restart", usercon.isAuth, usercon.restart);
router.get("/getallusers", usercon.isAuth, usercon.getallusers);


router.get("/dashboard", usercon.isAuthA, function(req, res){
    res.render("dashboard")
})

router.get("/door1", usercon.isAuth, function(req, res){
    usercon.door1last("/door1", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door1chat.html"))
})

router.post("/door1", usercon.isAuth, function(req, res){

    (async() => {
    var reply =  await openai.door1chat(req.body.hist);
    res.send({message: reply})
    })();
    // res.send({message: req.body.hist})
})

router.get("/door1trailer", usercon.isAuth, function(req, res){
    usercon.door1last("/door1trailer", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door1trailer.html"))
})

router.get("/door1lastdead", usercon.isAuth, function(req, res){
    usercon.door1last("/door1lastdead", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door1lastdead.html"))
})

router.post("/door3open", usercon.isAuth, usercon.opendoor3)
router.post("/door2open", usercon.isAuth, usercon.opendoor2)

router.get("/door3", usercon.isAuth, async function(req, res){
    usercon.door3last("/door3", req.session.email)
    var per = await usercon.perfor3(req.session.email);
    if(per == 1)
    res.sendFile(path.join(__dirname, "..", "/views", "/door3qr.html"))
    else
    {
        req.session.error = "cannot access door 3 yet";
        return res.redirect("/?error=cannot access door 3 yet")
    }
})

router.get("/door3cypher", usercon.isAuth, function(req, res){
    usercon.door3last("/door3cypher", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door3cypher.html"))
})

router.get("/door3chat", usercon.isAuth, function(req, res){
    usercon.door3last("/door3chat", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door3chat.html"))
})


router.post("/door3chat", usercon.isAuth, function(req, res){

    (async() => {
        var reply =  await openai.door3chat(req.body.hist);
        res.send({message: reply})
        })();

})

router.get("/door2", usercon.isAuth, async function(req, res){
    usercon.door2last("/door2", req.session.email)
    var per = await usercon.perfor2(req.session.email);
    if(per == 1)
        res.sendFile(path.join(__dirname, "..", "/views", "/door2pic.html"))
    else
    {
        req.session.error = "cannot access door 2 yet";
        return res.redirect("/?error=cannot access door 2 yet")
    }
})


router.get("/door2morse", usercon.isAuth, function(req, res){
    usercon.door2last("/door2morse", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door2morse.html"))
})


router.get("/door2final", usercon.isAuth, function(req, res){
    usercon.door2last("/door2final", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/door2final.html"))
})


router.post("/door2final", usercon.isAuth, function(req, res){

    (async() => {
        var reply =  await openai.door2final(req.body.hist);
        res.send({message: reply})
        })();

})

router.get("/finale", usercon.isAuth, function(req, res){
    usercon.door1last("/finale", req.session.email)
    usercon.door2last("/finale", req.session.email)
    usercon.door3last("/finale", req.session.email)
    res.sendFile(path.join(__dirname, "..", "/views", "/finale.html"))
})


module.exports = router