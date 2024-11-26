const mongoose = require('mongoose');
const crypto = require('crypto');
const { type } = require('os');
//Schema for user accounts
const UserAccountSchema = new mongoose.Schema({
    userAccId:{
        type:String,
        trim:true,
        required:'Name is required'
    },
    userAccName:{
        type:String,
        trim:true,
        required:'Username is required'
    },
   
    hashedPassword:{
        type:String,
        required:'Password required'
    },
    email:{
        type:String,
        trim:true,
        required:'Email is required'
    },
    role:{
        type:String,
        trim:true,
        required:'Please enter your role'
    },
    type:{
        type:String,
        trim:true,
        required:'Please enter type of User'
    }, 
    createdAt:{
        type: Date,
        required: true
    },
      
    updatedAt:{
        type: Date,
        required: true
    },
    salt:String
});
  
//Hasing password to keep privacy safe
UserAccountSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password)
})
.get(function(){
    return this._password;
})
UserAccountSchema.methods = {
    validatePassword: function(plainText)
    {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword : function(password)
    {
        if (!password) return 'Wrong Password'
        try{
            return crypto
            .createHmac('sha512', this.salt)
            .update(password)
            .digest('hex')
        }
        catch(err){
            throw new  Error(err.message);
        }
    },
    //randomize the salt to make it produce a string not hackable
    makeSalt : function()
    {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
    
} 
module.exports = mongoose.model('useraccounts',UserAccountSchema);