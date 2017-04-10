// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.services';
import {Album} from '../models/album';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [AlbumService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AlbumEditComponent implements OnInit {

	public titleSection:string;
	public album: Album;
	public errorMessage;

	constructor(
		private _albumService: AlbumService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.titleSection="Editar un album"
	}

	ngOnInit() {
		this.album = new Album("", "", "");
		this.getAlbum();
	}

	getAlbum(){
		this._route.params.forEach((params: Params) => {
			let id = params["id"];
			this._albumService.getAlbum(id).subscribe(
				res => {
					this.album = res.album;
					if(!this.album) {
						this._router.navigate(['/']);
					}
				}, error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null) {
						console.log(this.errorMessage);
						alert("Error en la petición")
					}
				});
		})
	}

	onSubmit() {
		console.log(this.album);
		this._route.params.forEach((params: Params) => {
			let id = params["id"];
				this._albumService.editAlbum(id, this.album).subscribe(res => {
				if(!res.updateAlbum && !res.update){
					alert("Error en el servidor")
				}else {
					this.album = res.updateAlbum;
					if(this.album) {
						this._router.navigate(['/myAlbum', this.album["_id"]]);
					}
				}
			}, error => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null) {
					console.log(this.errorMessage);
					alert("Error en la petición")
				}
			});
		})
	}
}
