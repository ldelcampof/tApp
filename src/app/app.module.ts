import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccionesPage } from '../pages/acciones/acciones';
import { CargarCombustiblePage } from '../pages/cargar-combustible/cargar-combustible';
import { CreateChecklistPage } from '../pages/create-checklist/create-checklist';
import { CreateChecklistBpPage } from '../pages/create-checklist-bp/create-checklist-bp';
import { DetalleChecklistCrPage } from '../pages/detalle-checklist-cr/detalle-checklist-cr';
import { DetalleChecklistBpPage } from '../pages/detalle-checklist-bp/detalle-checklist-bp';
import { EquiposPage } from '../pages/equipos/equipos';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { MyApp } from './app.component';
import { TiposEquiposPage } from "../pages/tipos-equipos/tipos-equipos";
import { ViewChecklistPage } from '../pages/view-checklist/view-checklist';
import { VerCargasCombustiblePage } from '../pages/ver-cargas-combustible/ver-cargas-combustible';
import { TabsPage } from '../pages/tabs/tabs';
import { OperadorPage } from '../pages/operador/operador';

import { ConsultarCargasPage } from '../pages/consultar-cargas/consultar-cargas';
import { ConsultarChecklistPage } from '../pages/consultar-checklist/consultar-checklist';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

// plugins
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
	declarations: [
		AccionesPage,
		CargarCombustiblePage,
		ConsultarCargasPage,
		ConsultarChecklistPage,
		CreateChecklistBpPage,
		CreateChecklistPage,
		DetalleChecklistBpPage,
		DetalleChecklistCrPage,
		EquiposPage,
		HomePage,
		ListPage,
		MainPage,
		MyApp,
		OperadorPage,
		TabsPage,
		TiposEquiposPage,
		VerCargasCombustiblePage,
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
		CargarCombustiblePage,
		ConsultarCargasPage,
		ConsultarChecklistPage,
		CreateChecklistBpPage,
		CreateChecklistPage,
		DetalleChecklistBpPage,
		DetalleChecklistCrPage,
		EquiposPage,
		HomePage,
		ListPage,
		MainPage,
		MyApp,
		OperadorPage,
		TabsPage,
		TiposEquiposPage,
		VerCargasCombustiblePage,
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
