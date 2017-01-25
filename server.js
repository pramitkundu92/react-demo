var http = require('http');  
var express = require('express');
var socketio = require('socket.io');  
var mongoose = require('mongoose');
var moment = require('moment');
var cluster = require('cluster');
var os = require('os');

var Expense = require(__dirname + '/models/expense');
var User = require(__dirname + '/models/user');

if(cluster.isMaster){
    var count = os.cpus().length;
    console.log('Master is setting up ' + count + ' workers');
    console.log('Server running... homePage: http://localhost:3000/expensetracker/index');
    for(var i=0;i<count;i++){
        cluster.fork();
    }
    cluster.on('online',function(worker){
        console.log('Worker ' + worker.process.pid + ' is running');    
    });
    cluster.on('exit',function(worker,code,signal){
        console.log('Worker ' + worker.process.pid + ' stopped, starting a new one');   
        cluster.fork();
    });
}
else {
    var app = express();
    var server = http.createServer(app);
    var router = express.Router();

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/expenses');

    var context = '/expensetracker';
    var dateFormat = 'YYYY-MM-DD'; 

    app.use(context, express.static(__dirname + '/webapp'));
    app.use(context, router);

    router.get('/index',function(req,res){
        res.sendFile(__dirname + '/index.html');
    });

    router.get('/createexpense',function(req,res){
        Expense.create({
            desc: req.query.desc,
            value: req.query.value,
            date: new Date(req.query.date)
        },function(err){
            if(!err){
                res.json({completed: true});
            }
        });
    });

    router.get('/getallexpenses',function(req,res){
        var start = new Date(req.query.startDate);
        var end = new Date(req.query.endDate);
        Expense.getAllInRange(start,end).then(function(results){
            res.json(normalizeResults(results));
        });
    });
    router.get('/removeexpense',function(req,res){
        Expense.remove(req.query.expenseId,function(err){
            if(!err){
                res.json({completed: true});
            }
        });
    });
    router.get('/updateexpense',function(req,res){
        Expense.updateExp({
            _id: req.query._id,
            desc: req.query.desc,
            value: req.query.value,
            date: new Date(req.query.date)
        },function(err){
            if(!err){
                res.json({completed: true});
            }
        });
    });
    router.get('/createuser',function(req,res){
        var data = {
            username: req.query.username,
            password: req.query.password
        };
        User.create(data,function(err){
            if(!err){
                res.json('User created successfully');
            }
        });
    });
    router.get('/getuser',function(req,res){
        var uname = '', pass = '';
        if(req.query.username !== undefined){
            uname = req.query.username;
        }
        if(req.query.password !== undefined){
            pass = req.query.password;
        }
        User.getUserName(uname).then(function(result){
            if(result.length == 0){
                res.json({status: 0});
            }
            else {
                User.getUser(uname,pass).then(function(result2){
                    if(result2.length == 0) res.json({status: 1});
                    else res.json({status: 2});
                });
            }
        });    
    });
    var normalizeResults = function(results){
        return results.map(function(doc){
            var obj = {};
            for(key in Expense.schema.paths){
                if(key != 'date'){
                    obj[key] = doc[key];
                }
                else {
                    var m = moment(doc[key]);
                    obj[key] = m.format(dateFormat);
                }
            }
            return obj;
        });
    };

    server.listen(3000);
}