// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {ImageService} from '../../services/image.services';
import {Image} from '../../models/image';
import {GLOBAL} from '../../services/global'


// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'image-edit',
    templateUrl: '../../views/views-image/image-add.html',
    providers: [ImageService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class ImageEditComponent implements OnInit {

	public titleSection:string;
	public image: Image;
	public errorMessage;
	public is_edit: boolean;

	constructor(
		private _imageService: ImageService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.titleSection="Editar una imagen";
		this.is_edit = true;
	}

	ngOnInit() {
		console.log("image-edit.component.ts cargado")
		this.image = new Image("", "", "", "");
		this.getImage();
	}

	getImage(){
		this._route.params.forEach((params: Params) => {
			let id = params["id"];
			this._imageService.getImage(id).subscribe(
				res => {
					this.image = res.image;
					if(!this.image) {
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
		this._route.params.forEach((params: Params) => {

			let id = params['id'];

			console.log(this.image);

			this._imageService.editImage(id, this.image).subscribe(res => {
				if(!res.updateImage){
					alert("Error en el servidor")
				}else {
					this.image = res.updateImage;
					if(this.image) {
						console.log(this.image)
						console.log(id)
						if(!this.filesToUpload) {
							this._router.navigate(['/album', this.image.album])
						}else {
							this.makeFileRequest(GLOBAL.url+'upload-image/'+id, [], this.filesToUpload)
							.then((rslt)=>{
								this.resultUpload = rslt;
								this.image.picture = this.resultUpload.filename
								this._router.navigate(['/album', this.image.album])
							}, (err)=> {
								this.errorMessage = <any>err;
								if(this.errorMessage != null) {
									console.log(this.errorMessage);
									alert("Error en la petición")
								}
							});
						}
					}else {
						alert("Error en el servicio");
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

	public filesToUpload: Array<File>;
	public resultUpload;

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		return new Promise((resolve, reject) => {
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for (var i = files.length - 1; i >= 0; i--) {
				formData.append('images', files[i], files[i].name);
			}

			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4){
					 if(xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					}else {
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}

}
