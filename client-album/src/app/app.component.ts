// Importar Component desde el núcleo de Angular
import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
 
// Clase del componente donde irán los datos y funcionalidades
export class AppComponent {

	public title: string;
	public description: string;

	constructor() {
		this.title = "Angular2 -AngularCLI - MEAN";
		this.description = "Gestión album de fotos online";
	}

}
