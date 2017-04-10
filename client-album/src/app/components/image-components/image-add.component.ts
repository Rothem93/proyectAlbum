// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {ImageService} from '../../services/image.services';
import {Image} from '../../models/image';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'image-add',
    templateUrl: '../../views/views-image/image-add.html',
    providers: [ImageService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class ImageAddComponent implements OnInit {

	public titleSection:string;
	public image: Image;
	public errorMessage;

	constructor(
		private _imageService: ImageService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.titleSection="Añadir una imagen"
	}

	ngOnInit() {
		console.log("image-add.component.ts cargado")
		this.image = new Image("", "", "", "");
	}

	onSubmit() {
		this._route.params.forEach((params: Params) => {

			let albumId = params.album_id;
			this.image.album = albumId;
			console.log(this.image);

			this._imageService.addImage(this.image).subscribe(res => {
				if(!res.image){
					alert("Error en el servidor")
				}else {
					this.image = res.image;
					console.log(res)
					if(this.image) {
						this._router.navigate(['/editar-image/', res.image._id]);
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
