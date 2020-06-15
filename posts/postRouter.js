const express = require('express');
const router = express.Router();
const Posts = require('./postDb')





router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  });
});

router.get('/:id', (req, res) => {
  // do your magic!

  const id = req.params.id
  Posts.getById(id)
  .then(post =>{
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The ids cannot be retrieved."
    });
  });


});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;



