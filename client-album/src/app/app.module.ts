import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }  from './app.component';
import { AlbumsListComponent }  from './components/albums-list.component';
import { AlbumDetailComponent }  from './components/album-detail.component';
import { AlbumAddComponent }  from './components/album-add.component';
import { AlbumEditComponent }  from './components/album-edit.component';
import { ImageAddComponent }  from './components/image-components/image-add.component';
import { ImageEditComponent }  from './components/image-components/image-edit.component';
import { ImageDetailComponent }  from './components/image-components/image-detail.component';

 
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, routing ],
  declarations: [ 
	  	AppComponent, 
	  	AlbumsListComponent, 
	  	AlbumDetailComponent, 
	  	AlbumAddComponent, 
	  	AlbumEditComponent, 
	  	ImageAddComponent, 
	  	ImageEditComponent,
	  	ImageDetailComponent
	],
  providers:    [ appRoutingProviders ],
  bootstrap:    [ AppComponent ]
})
 
export class AppModule { }
