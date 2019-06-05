const express = require("express");
const router = express.Router();
const db = require('../controllers/marketsController');
const isAuthenticated = require("../middleware/firebase.js");

//Get all markets
router.get("/", isAuthenticated, (req, res) => {
  db.find(req.body)
    .then(markets => {
      res.status(200).json(markets);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Could not get Markets" });
    });
});

//Markets by Id
router.get("/:id", isAuthenticated, (req, res) => {
  const id = req.params.firebase_id;
  console.log(id);
  db.findByMarketID(id)
    .then(marketinfo => {
      res.status(200).json(marketinfo);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Could not get Markets associated with that ID" });
    });
});

//Delete Markets
router.delete('/:id', (req, res) => {
    const id = req.params.firebase_id;
    db.deleteByMarketId(id)
    .then(() => {
        res.status(200).json({ message: "Market Was Successfully Deleted" });
      })
      .catch(error => {
        res.status(500).json({error: 'Could Not Delete This Market'});
      });
})


//Update Markets
router.put('/:id', (req,res) =>{
    const id = req.params.firebase_id;
    db.updateByMarketId(id)
    .then(() => {
        res.status(200).json({message: 'Market Info Was Updated'})
    })
    .catch(error => {
        res.status(500).json({error: `Could Not Update This Market's Information`});
      });
})


// //Add a Market
// router.post('/:id', (req, res) =>{
//   db.insert(req.body)
//   .then(() => {
//     res.status(200).json({message: 'Market Was Added'})
// })
// .catch(error => {
//     res.status(500).json({error: `Could Not Add Market`});
//   });

// })

module.exports = router;
