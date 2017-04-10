'use strict'

var Album = require('../models/album');

function getAlbum(req , res) {
	var albumId = req.params['id'];

	Album.findById(albumId, function(err, album){
		if(err){
			res.status(500).send({message: "Error al devolver el album "+err});
		}else {
			if(!album){
				res.status(404).send({message: "No existe"});
			}else {
				res.status(200).send({album});
			}
		}
	});
}

function getAlbums(req , res) {

	Album.find({}).sort('id').exec(function(err, album){
		if(err){
			res.status(500).send({menssage: 'Error al devolver datos'})
		}else{
			if(!album) {
				res.status(404).send({menssage: 'No existe'})
			}else {
				res.status(200).send({data: album})
			}
		}
	});
}

function saveAlbum(req , res) {
	var album = new Album();
	var params = req.body;

	if(!params.title) {
		return res.status(400).jsonp({errorCode: 400, description: 'Bad Request: missing title'}).send();
	}
	if(!params.description) {
		return res.status(400).jsonp({errorCode: 400, description: 'Bad Request: missing description'}).send();
	}

	album.title = params.title;
	album.description = params.description;


	album.save(function (err, album) {
		if(err){
			res.status(500).send("Error al guardar el album "+ err);
		}else {
			res.status(200).send({album: album})
		}
	});

}


function updateAlbum(req , res) {
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, function(err, updateAlbum){
		if(err) {
			res.status(500).send("Error al guardar el album "+ err);
		}
		if(updateAlbum){
			res.status(200).send({update: true, updateAlbum: updateAlbum});		
		}
	});

	
}

function deleteAlbum(req , res) {
	
	var albumId = req.params.id;
	Album.findById(albumId, function(err, album){
		if(err){
			res.status(500).send({message: "Error al devolver el album"});
		}
		if(!album){
			res.status(404).send({message: "No existe"});
		}else {
			album.remove(function (err){
				if(err){
					res.status(500).send({message: "Error al borrar"});
				}else {
					res.status(200).send({message: "album borrado"});
				}
			})
		}
	});
}



module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum,
	deleteAlbum
}