const express = require('express');

const router = express.Router();

users=require('./userDB')
posts=require('../posts/postDb')
const validatePost = require('../middleWare/post')
const validateUser = require('../middleWare/user')
const validateUserId = require('../middleWare/userID')

//new user
router.post('/', validateUser(),(req, res) => {
  // do your magic!
  const newUser = req.body
  users.insert(newUser)
  .then(user=>{
    if(user){
      users.get()
      .then(success=>{
        res.status(201).json(success)
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "could not add user."
    });
  });
});

///new post for user
router.post('/:id/posts', validatePost(),validateUser(),validateUserId(), (req, res) => {
  // do your magic!
  posts.insert(req.body)
  .then(comment => {
    if(comment){
      Users.getUserPosts(req.params.id)
      .then(success => {
        res.status(201).json(success)
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "could not add user."
    });
  });
});

//get all users
router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then(user=>{
    res.status(200).json(user)
  })
   .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "could not add user."
    });
  });
});

//get user by id
router.get('/:id', validateUserId(),(req, res) => {
  // do your magic!
  const id = req.params.id
  users.getById(id)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "could not add user."
    });
  });
});

//get post by users id
router.get('/:id/posts', validateUserId(),(req, res) => {
  // do your magic!
  const id = req.params.id
  users.getById(id)
.then(user=>{
  if(user){
    users.getUserPosts(id)
    .then(success=>{
      res.status(200).json(user)

    })
  }
})
.catch(error => {
  console.log(error);
  res.status(500).json({
    error: "could not add user."
  });
});
});

//delete user
router.delete('/:id', validateUserId(),(req, res) => {
  // do your magic!

  users.remove(req.params.id)
  .then(deletes=>{
    res.status(204).json(deletes);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  });
});


//update user
router.put('/:id', validateUserId(),(req, res) => {
  // do your magic!
const id = req.params.id
const{name}=req.body
if(!name){
  res.status(400).json({
    error: "give name"

  })
}
users.update(id,name)
.then(updateuser=>{
  res.status(200).json(updateuser);

})
.catch(error => {
  console.log(error);
  res.status(500).json({
    error: "cant update"
  });
});
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!

  users.getById(req.params.id)
  .then(user=>{
    if(user){
      req.user=user

next()    }
else{
  res.status(400).json({message:'bad id'})
}
  })
}

function validateUser(req, res, next) {
  // do your magic!

  if(!req.body){
    res.status(400).json({message: "requires user data"})
  } else if(!req.body.name){
    res.status(400).json({message: "needs name"})
  } else {
    next();
  }
};

function validatePost(req, res, next) {

    // do your magic!


  if(!req.body){
    res.status(400).json({message: "Missing post data "})
  } else if(!req.body.text){
    res.status(400).json({message: "needs text"})
  } else {
    next();
  }
};

module.exports = router;
