var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:glaringgreengeeseglide@localhost:5432/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    // app.set('db', db);
    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
});


app.get('/api/users', function(req, res) {
  db.get_users(function(err,success){
    res.status(200).json(success);
  })
});

app.get('/api/vehicles', function(req, res) {
  db.get_vehicles(function(err,success){
    res.status(200).json(success);
  })
});

app.post('/api/users', function(req, res) {
  db.create_user([req.body.firstname,req.body.lastname,req.body.email],function(err,success){
    res.status(200).json(success);
  })
});

app.post('/api/vehicles', function(req, res) {
  db.create_vehicle([req.body.make,req.body.model,req.body.year,req.body.ownerId],function(err,success){
    res.status(200).json(success);
  })
});

app.get('/api/user/:userId/vehiclecount', function(req, res) {
  db.get_user_vehicle_count([req.params.userId],function(err,success){
    res.status(200).json(success);
  })
});

app.get('/api/user/:userId/vehicle', function(req, res) {
  db.get_user_vehicles([req.params.userId],function(err,success){
    res.status(200).json(success);
  })
});

app.get('/api/vehicle', function(req, res) {
  if (req.query.email) {
    db.get_user_vehicles_by_email([req.query.email],function(err,success){
      res.status(200).json(success);
    })
  }

  if (req.query.userFirstStart) {
    db.get_user_vehicles_by_firstStart([req.query.userFirstStart],function(err,success){
      res.status(200).json(success);
    })
  }

});

app.get('/api/newervehiclesbyyear', function(req, res) {
  db.get_newer_vehicles(function(err,success){
    res.status(200).json(success);
  })
});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  db.change_vehicle_owner([req.params.userId,req.params.vehicleId],function(err,success){
    res.status(200).json(success);
  })
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
  db.remove_vehicle_owner([req.params.userId,req.params.vehicleId],function(err,success){
    res.sendStatus(202);
  })
});

app.delete('/api/vehicle/:vehicleId', function(req, res) {
  db.delete_vehicle([req.params.vehicleId],function(err,success){
    res.sendStatus(202);
  })
});


app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
