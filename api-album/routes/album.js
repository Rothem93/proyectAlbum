'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();

api.get('/albums', AlbumController.getAlbums);
api.get('/album/:id', AlbumController.getAlbum);
api.put('/album/:id', AlbumController.updateAlbum);
api.post('/album', AlbumController.saveAlbum);
api.delete('/album/:id', AlbumController.deleteAlbum);



module.exports = api;