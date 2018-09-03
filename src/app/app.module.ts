import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccionesPage } from '../pages/acciones/acciones';
import { CreateChecklistPage } from '../pages/create-checklist/create-checklist';
import { CreateChecklistBpPage } from '../pages/create-checklist-bp/create-checklist-bp';
import { DetalleChecklistCrPage } from '../pages/detalle-checklist-cr/detalle-checklist-cr';
import { DetalleChecklistBpPage } from '../pages/detalle-checklist-bp/detalle-checklist-bp';
import { EquiposPage } from '../pages/equipos/equipos';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { MyApp } from './app.component';
import { ViewChecklistPage } from '../pages/view-checklist/view-checklist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

// plugins
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
	declarations: [
		AccionesPage,
		CreateChecklistPage,
		CreateChecklistBpPage,
		DetalleChecklistCrPage,
		DetalleChecklistBpPage,
		MyApp,
		HomePage,
		ListPage,
		EquiposPage,
		MainPage,
		ViewChecklistPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule,
    	IonicStorageModule.forRoot(),
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AccionesPage,
		CreateChecklistPage,
		CreateChecklistBpPage,
		DetalleChecklistCrPage,
		DetalleChecklistBpPage,
		MyApp,
		HomePage,
		ListPage,
		EquiposPage,
		MainPage,
		ViewChecklistPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
    	StorageServiceProvider
	]
})
export class AppModule {}
