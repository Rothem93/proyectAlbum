// Importar Component desde el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.services';
import {ImageService} from '../services/image.services';
import {Album} from '../models/album';
import {Image} from '../models/image';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [AlbumService, ImageService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AlbumDetailComponent implements OnInit{

	public errorMessage;
	public album: Album;
	public images: Image[];
	public loading: boolean;
	public api_url: string;


	constructor(
		private _albumService: AlbumService, 
		private _imageService: ImageService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.loading = true;
	}

	ngOnInit() {
		this.api_url = this._imageService.getApiUrl('get-image/');
		this.getAlbum();
	}

	getAlbum(){
		this._route.params.forEach((params: Params) => {
			let id = params["id"];
			this._albumService.getAlbum(id).subscribe(
				res => {
					this.loading = false;
					this.album = res.album;
					if(!this.album) {
						this._router.navigate(['/']);
					}else {
						this._imageService.getImages(res.album._id).subscribe(
						response => {
							this.images = response.images;
							console.log(response)
							if(!this.images) {
								alert("SIN IMAGENES")
							}else {

							}
						}, error => {
							this.loading = false;
							this.errorMessage = <any>error;
							if(this.errorMessage != null) {
								console.log(this.errorMessage);
								alert("Error en la petición")
							}
						});
					}
				}, error => {
					this.loading = false;
					this.errorMessage = <any>error;
					if(this.errorMessage != null) {
						console.log(this.errorMessage);
						alert("Error en la petición")
					}
				});
		})
	}
}
