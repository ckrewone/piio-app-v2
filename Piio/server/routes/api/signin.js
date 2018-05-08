const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const mongoose = require('mongoose');


Object.size = function(obj) {
     var size = 0, key;
     for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
     }
     return size;
};

module.exports = (app) => {
     app.post('/api/account/signup', (req, res, next) => {
          const { body } = req;
          const {
               firstName,
               lastName,
               password
          } = body;

          let {
               email
          } = body;

          if(!firstName){
               return res.send({
                    success: false,
                    message: 'First name cannot be blank!'
               });
          }
          if(!lastName){
               return res.send({
                    success: false,
                    message: 'Last name cannot be blank!'
               });
          }
          if(!email){
               return res.send({
                    success: false,
                    message: 'E-mail cannot be blank!'
               });
          }
          if(!password){
               return res.send({
                    success: false,
                    message: 'Password cannot be blank!'
               });
          }

          email = email.toLowerCase();

          User.find({
               email: email
          }, (err, previousUsers) => {
               if(err){
                    return res.send({
                         success: false,
                         message: 'Server Error!'
                    });
               } else if(previousUsers.lenght > 0){
                    return res.send({
                         success: false,
                         message: 'This user does exist!'
                    });
               }

               const newUser = new User();

               newUser.email = email;
               newUser.firstName = firstName;
               newUser. lastName = lastName;
               newUser.password = newUser.generateHash(password);
               newUser.save((err, user) => {
                    if(err){
                         return res.send({
                              success: false,
                              message: 'Server Error!'
                         });
                    }
                    return res.send({
                         success: true,
                         message: 'Success! You are sing up :D'
                    });
               });
          });
     });

     app.post('/api/account/signin', (req, res, next) => {
          const { body } = req;
          const {
               password
          } = body;
          let {
               email
          } = body;

          if(!email){
               return res.send({
                    success: false,
                    message: 'Wrong E-mail!'
               });
          }
          if(!password){
               return res.send({
                    success: false,
                    message: 'Invalid Password!'
               });
          }

          email = email.toLowerCase();

          User.find({
               email: email
          }, (err, users) => {

               if(err){
                    return res.send({
                         success: false,
                         message: 'Server Error!'
                    });
               }
               var num = Object.size(users);
               if(num != 1){
                    return res.send({
                         success: false,
                         message: 'Invalid user!'
                    });
               }

               const user = users[0];
               if(!user.validPassword(password)){
                    return res.send({
                         success: false,
                         message: 'Invalid Password!'
                    });
               }

               const userSession = new UserSession();
               userSession.userId = user._id;
               userSession.save((err, doc) => {
                    if(err){
                         return res.send({
                              success: false,
                              message: 'Server Error!'
                         });
                    }
                    return res.send({
                         success: true,
                         message: 'Valid sign in',
                         token: doc._id,
                    });
               });

          });
     });

     app.get('/api/account/verify', (req, res, next) => {
          const { query } = req;
          const { token } = query;

          UserSession.find({
               _id: mongoose.Types.ObjectId(token),
               isDeleted: "false"
          }, (err, sessions) => {
               if(err){
                    return res.send({
                         success: false,
                         message: 'Server Error!'
                    });
               }
               if (Object.keys(sessions).length != 1){
                    return res.send({
                         success: false,
                         message: 'Invalid token!'
                    });
               } else {
                    const session = sessions[0];
                    User.find({
                         _id: session.userId
                    }, (err, users) => {
                         if(err){
                              return res.send({
                                   success: false,
                                   message: 'Server Error!'
                              });
                         } else {
                              const user = users[0];
                              return res.send({
                                   success: true,
                                   message: 'Get data!',
                                   first: user.firstName,
                                   last: user.lastName
                              });
                         }
                    });
               }

          });


     });

     app.get('/api/account/logout', (req, res, next) => {
          const { query } = req;
          const { token } = query;

          UserSession.findOneAndUpdate({
               _id: token,
               isDeleted: false
          }, {
               $set:{
                    isDeleted:true
               }
          }, null, (err, sessions) => {
               if(err){
                    return res.send({
                         success: false,
                         message: 'Server Error!'
                    });
               }

               return res.send({
                    success: true,
                    message: 'Logout'
               });

          });
     });
};
