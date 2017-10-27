const express = require('express');
const router = express.Router();

router.get('/comments', (req, res) => {
  const Comment = require('../dal/comment');
  Comment.find().then((comments) => {
      res.json(comments)
  })
})

router.post('/comments', (req, res) => {
  const Comment = require('../dal/comment');
  Comment.findById(req.body.id).then((dbComment) => {
    dbComment.rating = req.body.rating;
    dbComment.save();
    res.json(true);
  })
})

module.exports = router;