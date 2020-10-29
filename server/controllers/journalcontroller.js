//we import the express framework and store it inside the variable express
// const {Router}  = require('express');
const express = require('express');
//We create a new variable called router. Since the express variable gives us access into the express framework, we can access express properties and methods by calling express + .  Therefore, when we call express.Router() we are using the express variable to access the Router() method. The Router method will return a router object for us. 
const router = express.Router();
//We use the router object by using the router variable to get access into the Router() object methods. get() is one of the methods in the object and we call it here. This method allows us to complete an http get request. We pass two arguments into the .get method. The first argument '/practice' is the path. The 2nd argument is a callback function (aka handler function) This function gets called when the app receives a request to the specified route and http method.

const validateSession = require('../middleware/validate-session');
// import the journal model through our db.js and store it in Journal variable
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function(req, res){
    res.send('Hey!! This is a practice route!') //send() is an express method that can be called on the res or response object. Our response parameter is just a simple string.
});

/* *******************
*****JOURNAL CREATE*********
************************** */
// use router object and access the .post method > establish the path for this method with the /create subroute > call upon the ValidateSession middleware function > fat-arrow callback function

router.post('/create', validateSession, (req, res) => {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        // Now this one looks different than the others. And that's because this isn't coming from anything a user types in. This comes from the validateSession! We have access to the user object we created in the validateSession.js, which means we can use dotnotation to step into it and grab the user's id and assign it to a specific journal entry.
        owner: req.user.id
    }
    //creating an instance of the Journal model and send the journalEntry object we created above off to the database as long as the data types match the model
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({error: err}))
});

/* *************
*******GET ALL ENTRIES********* */
router.get("/", (req, res) => {
    // findAll is a sequelize method to find all the items and this returns a promise
    Journal.findAll()
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err }))
});

/* ************************
*******GET ENTRIES BY USER***********
*************************** */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Journal.findAll({
        where: { owner: userid}
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err }))
});

/* ********************
*****GET ENTRIES BY TITLE***** */
router.get('/:title', function (req, res) {
    let title = req.params.title;

    Journal.findAll({
        where: { title: title}
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

/* ******************
*****UPDATING A JOURNAL ENTRY*******
************************************ */
router.put("/update/:entryId", validateSession, function (req, res){
    const updateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id } };
    //update is a sequelize method that takes two arguments.
    // updateJournalEntry is value we want to edit in database---query tells sequelize where to place the new data if a
    Journal.update(updateJournalEntry, query)
    //callback function- runs if update is successful and returns the data entered
    .then((journals) => res.status(200).json(journals))
    //callback function - runs if the update is not successful and returns error message
    .catch((err) => res.status(500).json({ error: err }));
});

/* **************
***DELETE A POST***
****************** */
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = {where: { id: req.params.id, owner: req.user.id} };

    Journal.destroy(query)
    .then(() => res.status(200).json({ message: "Journal Entry Removed"}))
    .catch((err) => res.status(500).json({ error: err}));
});

// router.get('/about', function(req, res){
//     res.send('This is the about route')
// })
//we export the module for usage outside of the file
module.exports = router;

