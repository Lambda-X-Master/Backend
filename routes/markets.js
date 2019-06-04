const express = require("express");
const router = express.Router();
const db = require("../../helpers/stepHelpers");

router.get("/markets/:id", (req, res) => {
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

router.delete('/markets/:id', (req, res) => {
    const id = req.params.firebase_id;
    db.deleteByMarketId(id)
    .then(() => {
        res.status(200).json({ message: "Market Was Successfully Deleted" });
      })
      .catch(error => {
        res.status(500).json({error: 'Could Not Delete This Market'});
      });
})

router.put('/markets/:id', (req,res) =>{
    const id = req.params.firebase_id;
    db.updateByMarketId(id)
    .then(() => {
        res.status(200).json({message: 'Market Info Was Updated'})
    })
    .catch(error => {
        res.status(500).json({error: `Could Not Update This Market's Information`});
      });
})

module.exports = router;
