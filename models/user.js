var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

userSchema.statics.create = function(data,cb){
    var user = new this(data);
    user.save(cb);
};
userSchema.statics.getUserName = function(username){
    return this.find({username: username},function(err,data){
        return new Promise(function(resolve,reject){
            if(err) reject(err);
            else resolve(data);
        });    
    });
};
userSchema.statics.getUser = function(username,password){
    return this.find({username: username, password: password},function(err,data){
        return new Promise(function(resolve,reject){
            if(err) reject(err);
            else resolve(data);
        });    
    });
};

var User = mongoose.model('User',userSchema);
module.exports = User;