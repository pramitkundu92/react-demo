var mongoose = require('mongoose');
var Promise = require('bluebird');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    desc: String,
    value: Number,
    date: Date    
});

expenseSchema.statics.create =function(data,cb){
    var expense = new this(data);
    expense.save(cb);
};
expenseSchema.statics.getAll = function(){
    return this.find({},function(err,data){
        return new Promise(function(resolve,reject){
            if(!err) resolve(data);
            else reject(err);
        });
    });
};
expenseSchema.statics.getAllInRange = function(start,end){
    var query = {};
    if(!(isNaN(start.getTime()) && isNaN(end.getTime()))){
        if(isNaN(start.getTime())){
            query = {date: {$lte: end}};  
        } 
        else if(isNaN(end.getTime())) {
            query = {date: {$gte: start}};  
        }
        else {
            query = {date: {$gte: start, $lte: end}};
        }
    } 
    return this.find(query,function(err,data){
        return new Promise(function(resolve,reject){
            if(!err) resolve(data);
            else reject(err);
        });
    }).sort({date: 1});
};
expenseSchema.statics.remove = function(expenseId,cb){
    return this.find({_id: expenseId}).remove(cb);
};
expenseSchema.statics.updateExp = function(data,cb){
    return this.update({_id: data._id},data,cb);
};

var Expense = mongoose.model('Expense',expenseSchema);

module.exports = Expense;