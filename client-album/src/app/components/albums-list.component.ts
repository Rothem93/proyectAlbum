import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.services';
import {Album} from '../models/album';

@Component({
	selector: 'albums-list',
	templateUrl: '../views/albums-list.html',
	providers: [AlbumService]
})

export class AlbumsListComponent implements OnInit{
	public title:string;
	public errorMessage;

	public albums: Album[];
	public loading:boolean;
	public confirmado;
	constructor(
		private _albumService : AlbumService
	) {
		this.title = "Listado de albums: ";
		this.loading = true;
	}

	ngOnInit() {
		console.log('album-list.album-list.component cargado...');
		this.getAlbums();
	}

	onDeleteConfirm(id) {
		this.confirmado = id;
	}

	onDeleteCancel(id) {
		this.confirmado = null;
	}

	onDeleteAlbum(id) {
		this._albumService.deleteAlbum(id).subscribe(
			res => {
				if(!res.message){
					alert("Error en la petición")
				}
				this.getAlbums();
			}, error => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null) {
					console.log(this.errorMessage);
					alert("Error en la petición")
				}
			}
		)
	}

	getAlbums() {
		this._albumService.getAlbums().subscribe(
			res => {
				console.log(res);
				this.albums = res.data;
				if(!this.albums) {
					alert("Albums empty")
				}else {
					this.loading = false;
				}
			},
			error => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null) {
					console.log(this.errorMessage);
					alert("Error en la petición")
				}
			}
		);
	}
}