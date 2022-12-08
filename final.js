module.exports ={
    startDB,
    register,
    signIn
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")

var finalUsers = new Schema({
    "email" :{
        "type" : String,
        "unique" : true
    },
    "password" : String
});

let User;

function startDB(){
    return new Promise((resolve, reject) =>{
        let db = mongoose.createConnection("mongodb+srv://nekokamix:nekokamix123@test6.sld1sii.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });
        db.on('error', (err) => {
            console.log("Cannot connect to DB");
            reject(err)
        })
        db.once('open', () => {
            User = db.model("users",finalUsers);
            console.log("DB connection successful");
            resolve();
        })
    })
}

function register(user)
{
    if (user.email)
    {
        reject("Error: email or password cannot be empty.")
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    reject("error encrypting password");
                }
                else {
                    user.password = hash;
                    let newUser = new User(user);
                    newUser.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                reject("Error: ("+ user.email + ") already exists");
                            }
                            else {
                                reject("Error: cannot create the user");
                            }
                        }
                        else {
                            resolve();
                        }
                    })
                }
            })
        })
    }
};

function signIn(user)
{
    return new Promise((resolve, reject) => {
        user.find({email: user.email})
        .exec()
        .then(users => {
            bcrypt.compare(user.password, users[0].password).then(res => {
                if(res === true) {         
                    resolve(users[0]);
                }
                else {
                    reject("Incorrect Password for user: " + user.email); 
                }
            })
        })
        .catch(() => { 
            reject("Cannot find the user: " + user.email); 
        }) 
    })
}