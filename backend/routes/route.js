const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()
const userSchema = require('../models/Users')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

// Sign-up
router.post(
  '/register-user',
  [
    // check middlewar i5alik ta3mil des contontroles sur ls données sotockées dans la base de données.
    // Les champs ne doivent pas etres vides, contiennet au moins 3 caractères etc
    check('name')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters long'),
    check('email', 'Email is required').not().isEmpty(),
    check('telephone', 'Phone number is required').not().isEmpty().isLength({max:8}),
    check('password', 'Password should be between 5 to 30 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 30 }),
  ],
  (req, res) => {
    //rechercher  les erreurs à partir de la bibliothèque express-validator
    const errors = validationResult(req)
    console.log(req.body)

    // au cas ou les erreurs existent elles seront rajoutées au tableau et status 422
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      //sinon nous allons crypter le mot de passe sur 10 bits et stocké le hash
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          telephone: req.body.telephone,
          password: hash,
        })
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'User has been  successfully created!',
              result: response,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
      })
    }
  },
)

// Sign-in
router.post('/signin', (req, res, next) => {
  let getUser
  userSchema.findOne({
      email: req.body.email,
    })
    .then((user) => {
      console.log(user+ "itération avant!user")
      if (!user) {
        return res.status(401).json({
          message: 'Authentication  process is a failure, user doesnot figure in the database',
        })
      }
      else {
        getUser = user
        return bcrypt.compare(req.body.password, user.password)
      }
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Token unmatched',
        })
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '2h',
        },
      )
      res.status(200).json({
        token: jwtToken,
        expiresIn: 6400,
        _id: getUser._id,
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication  process is a failure 3',
      })
    })
})

// Get Users
router.route('/').get((req, res, next) => {
  userSchema.find()
  .then((data)=> {
    res.status(200).json(data
    )
  })
  .catch((error)=> {
    console.log('Error in getting users', error)
  })
})


// Get Single User
router.route('/user-profile/:id').get(authorize, (req, res, next) => {

userSchema.findById({_id: req.params.id})
.then((data)=>{
  return res.status(200).json({msg: data   });
})
.catch((error)=> {
  console.log('Error in getting the user profile : ',error)
})

})


// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
  .then((data)=> {
     res.status(200).json({
      msg: "Profile has been successfully updated ",
      data: data
     })
  })
  .catch((err)=> {
    console.log("Error in updating the user", err);
  })
})


// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.deleteOne({_id: req.params.id})
  .then((data)=>{
    res.status(200).json({
      msg: 'This User has been deleted successfuly',
      data : data
    })
  })
  .catch((error)=> {
    console.log('Error in deleting the user : ', error);
  })

})

module.exports = router
