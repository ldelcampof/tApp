import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccionesPage } from '../pages/acciones/acciones';
import { CargarCombustiblePage } from '../pages/cargar-combustible/cargar-combustible';
import { ConsultorPage } from '../pages/consultor/consultor';
import { ConsultarCargasPage } from '../pages/consultar-cargas/consultar-cargas';
import { ConsultarChecklistPage } from '../pages/consultar-checklist/consultar-checklist';
import { CreateChecklistBpPage } from '../pages/create-checklist-bp/create-checklist-bp';
import { CreateChecklistPage } from '../pages/create-checklist/create-checklist';
import { DetalleChecklistPage } from '../pages/detalle-checklist/detalle-checklist';
import { DetalleChecklistBpPage } from '../pages/detalle-checklist-bp/detalle-checklist-bp';
import { DetalleChecklistCrPage } from '../pages/detalle-checklist-cr/detalle-checklist-cr';
import { EquipoPage } from '../pages/equipo/equipo';
import { EquiposPage } from '../pages/equipos/equipos';
import { GeneralChecklistPage } from '../pages/general-checklist/general-checklist';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { ListPage } from '../pages/list/list';
import { MainPage } from '../pages/main/main';
import { MyApp } from './app.component';
import { OperadorPage } from '../pages/operador/operador';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { TabsPage } from '../pages/tabs/tabs';
import { TiposEquiposPage } from "../pages/tipos-equipos/tipos-equipos";
import { VerCargasCombustiblePage } from '../pages/ver-cargas-combustible/ver-cargas-combustible';
import { ViewChecklistPage } from '../pages/view-checklist/view-checklist';

// plugins
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
	declarations: [
		AccionesPage,
		CargarCombustiblePage,
		ConsultarCargasPage,
		ConsultorPage,
		ConsultarChecklistPage,
		CreateChecklistBpPage,
		CreateChecklistPage,
		DetalleChecklistPage,
		DetalleChecklistBpPage,
		DetalleChecklistCrPage,
		EquipoPage,
		EquiposPage,
		GeneralChecklistPage,
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
		ConsultorPage,
		ConsultarChecklistPage,
		CreateChecklistBpPage,
		CreateChecklistPage,
		DetalleChecklistPage,
		DetalleChecklistBpPage,
		DetalleChecklistCrPage,
		EquipoPage,
		EquiposPage,
		GeneralChecklistPage,
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
