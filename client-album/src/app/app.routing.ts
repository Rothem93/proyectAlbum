import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { AlbumsListComponent }  from './components/albums-list.component';
import { AlbumDetailComponent }  from './components/album-detail.component';
import { AlbumAddComponent }  from './components/album-add.component';
import { AlbumEditComponent }  from './components/album-edit.component';
import { ImageAddComponent }  from './components/image-components/image-add.component';
import { ImageEditComponent }  from './components/image-components/image-edit.component';
import { ImageDetailComponent }  from './components/image-components/image-detail.component';


const appRoutes: Routes = [
	
	{path: '', component: AlbumsListComponent},
	{path: 'album/:id', component: AlbumDetailComponent},
	{path: 'album', component: AlbumDetailComponent},
	{path: 'crear-album', component: AlbumAddComponent},
	{path: 'add-image/:album_id', component: ImageAddComponent},
	{path: 'editar-image/:id', component: ImageEditComponent},
	{path: 'editar-album/:id', component: AlbumEditComponent},
	{path: 'editar-album/:id', component: AlbumEditComponent},
	{path: 'image/:id', component: ImageDetailComponent},
	{path: '**', component: AlbumsListComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);