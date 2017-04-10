// Importar Component desde el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.services';
import {Album} from '../models/album';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.html',
    providers: [AlbumService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AlbumAddComponent implements OnInit {

	public titleSection:string;
	public album: Album;
	public errorMessage;

	constructor(
		private _albumService: AlbumService, 
		private _route: ActivatedRoute, 
		private _router: Router
	) {
		this.titleSection="Añadir un album"
	}

	ngOnInit() {
		this.album = new Album("", "", "");
	}

	onSubmit() {
		console.log(this.album);
		this._albumService.addAlbum(this.album).subscribe(res => {
			if(!res.album){
				alert("Error en el servidor")
			}else {
				this.album = res.album;
				if(this.album) {
					this._router.navigate(['/marcador', this.album["_id"]]);
				}
			}
		}, error => {
			this.errorMessage = <any>error;
			if(this.errorMessage != null) {
				console.log(this.errorMessage);
				alert("Error en la petición")
			}
		});
	}
}
