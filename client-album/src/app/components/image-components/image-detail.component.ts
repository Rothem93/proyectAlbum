// Importar Component desde el núcleo de Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {ImageService} from '../../services/image.services';
import {Image} from '../../models/image';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'image-detail',
    templateUrl: '../../views/views-image/image-detail.html',
    providers: [ImageService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class ImageDetailComponent implements OnInit{

	public errorMessage;
	public image: Image;
	public loading: boolean;
	public api_url: string;
	public confirmado;

	constructor(
		private _imageService: ImageService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.loading = true;
	}

	ngOnInit() {
		this.api_url = this._imageService.getApiUrl('get-image/');
		this.getImage();
	}

	getImage(){
		this._route.params.forEach((params: Params) => {
			let id = params["id"];
			this._imageService.getImage(id).subscribe(
				res => {
					this.loading = false;
					this.image = res.image;
					if(!this.image) {
						this._router.navigate(['/']);
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


	
	onDeleteConfirm(id) {
		this.confirmado = id;
	}

	onDeleteCancel(id) {
		this.confirmado = null;
	}

	onDeleteImage(id) {
		this._imageService.deleteImage(id).subscribe(
			res => {
				if(!res.image){
					alert("Error en la petición")
				}
				this._router.navigate(['/album', res.image.album]);
			}, error => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null) {
					console.log(this.errorMessage);
					alert("Error en la petición")
				}
			}
		)
	}

}
