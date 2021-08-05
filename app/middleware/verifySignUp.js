const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateNameOrEmail = (req,res,next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user){
            res.status(400).send({message: 'Failed! Username is already in use!'});
            return;
        }

        
        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err){
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: 'Failed! email is already in use!'});
                return;
            }
            next();
        });
    });
};

checkRoleExisted = (req,res,next) => {
    if(req.body.roles){
        for(let i=0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} doesn't exist`
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateNameOrEmail,
    checkRoleExisted
};

module.exports = verifySignUp;