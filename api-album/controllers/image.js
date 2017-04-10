'use strict'

var Image = require('../models/image');
var Album = require('../models/image');
var path = require('path');
var fs = require('fs');

function getImage(req , res) {
	var imageId = req.params['id'];

	Image.findById(imageId, function(err, image){
		if(err){
			res.status(500).send({message: "Error al devolver el image "+err});
		}else {
			if(!image){
				res.status(404).send({message: "No existe"});
			}else {
				Album.populate(image, {path: 'album'}, (err, image)=>{
					if(!image){
						res.status(404).send({message: "No existe"});
					}else {
						res.status(200).send({image});						
					}
				});
			}
		}
	});
}

function getImages(req , res) {

	if(req.params.id){
		var albumId = req.params['id'];
		var find = Image.find({album: albumId}).sort('-title');
	}else {
		var find = Image.find({}).sort('-title')
	}

	find.exec(function(err, images){
		if(err){
			res.status(500).send({menssage: 'Error al devolver datos'})
		}else{
			if(!images) {
				res.status(404).send({menssage: 'No existe'})
			}else {
				Album.populate(images, {path: 'album'}, (err, images)=>{
					if(!images){
						res.status(404).send({message: "No existe"});
					}else {
						res.status(200).send({images});						
					}
				});
			}
		}
	});	
	
}

function saveImage(req , res) {
	var image = new Image();
	var params = req.body;

	if(!params.title) {
		return res.status(400).jsonp({errorCode: 400, description: 'Bad Request: missing title'}).send();
	}
	if(!params.album) {
		return res.status(400).jsonp({errorCode: 400, description: 'Bad Request: missing album'}).send();
	}

	image.title = params.title;
	image.picture = null;
	image.album = params.album;


	image.save(function (err, image) {
		if(err){
			res.status(500).send("Error al guardar el image "+ err);
		}else {
			res.status(200).send({image: image})
		}
	});

}


function updateImage(req , res) {
	var imageId = req.params.id;
	var update = req.body;

	Image.findByIdAndUpdate(imageId, update, function(err, updateImage){
		if(err) {
			res.status(500).send("Error al guardar el image "+ err);
		}
		if(updateImage){
			res.status(200).send({update: true, updateImage: updateImage});		
		}
	});

	
}

function deleteImage(req , res) {
	
	var imageId = req.params.id;
	console.log(imageId)
	Image.findByIdAndRemove(imageId, function(err, image){
		if(err){
			res.status(500).send({message: "Error al devolver el image"});
		}else {
			if(!image){
			res.status(404).send({message: "No existe"});
			}else {
				res.status(200).send({delete: true, image: image});			
			}
		}
	});
}


function uploadImage(req, res) {
	var imageId = req.params.id;
	var file_name = 'No subido...'
	if(req.files){
		var file_path = req.files.images.path;
		file_name = file_path.split('/')[1];

		console.log(file_name)
		console.log(file_path)
		console.log(imageId)

		Image.findByIdAndUpdate(imageId, {picture: file_name}, function(err, updateImage){
			console.log("findByIdAndUpdate -------")
			console.log(updateImage)
			if(err) {
				console.log("Error al guardar el image "+ err)
				res.status(500).send("Error al guardar el image "+ err);
			}
			if(!updateImage){
				console.log('Error al actualizar')

				res.status(404).send({update: false, updateImage: 'Error al actualizar'});		
			}else{
								console.log(updateImage)

				res.status(200).send({update: true, updateImage: updateImage});		
			}
		});

	}else {
		console.log(req.files);
		res.status(200).send({message:' No hay imagen'});	
	}	
}

function getImageFile(req, res) {
	var imageFile = req.params.imageFile;
	console.log(imageFile)
	fs.exists('./uploads/'+imageFile, (exists)=> {
		console.log(exists)
		if(exists){
			res.sendFile(path.resolve('./uploads/'+imageFile));
		}else {
			res.status(200).send({message:' No hay imagen'});	
		}
	});
}	


module.exports = {
	getImage,
	getImages,
	saveImage,
	updateImage,
	deleteImage,
	uploadImage,
	getImageFile
}