'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 8888;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/app_albums', function(err, res){
	if(err){
		throw err;
	}else {
		console.log("Conexión mongodb correcto")
		// 1er parametro puerto de escucha
		// 2o  parametro callback 
		app.listen(port, function(){
			console.log(`API REST ALBUM arrancado en http://localhost:${port}`);
		});	
	}
});
