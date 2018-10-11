import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

import { EquiposPage } from "../equipos/equipos";
import { CreateChecklistPage } from "../create-checklist/create-checklist";
import { CreateChecklistBpPage } from "../create-checklist-bp/create-checklist-bp";
import { ViewChecklistPage } from "../view-checklist/view-checklist";
import { TiposEquiposPage } from "../tipos-equipos/tipos-equipos";
import { ConsultarChecklistPage } from "../consultar-checklist/consultar-checklist";
import { ConsultarCargasPage } from "../consultar-cargas/consultar-cargas";
/**
 * Generated class for the AccionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-acciones',
  templateUrl: 'acciones.html',
})

export class AccionesPage {
	createChecklistPage = CreateChecklistPage
	createChecklistBPPage = CreateChecklistBpPage
	viewChecklistPage = ViewChecklistPage
	EquiposPage = EquiposPage
	TiposEquipos = TiposEquiposPage
	ConsultarChecklist = ConsultarChecklistPage
	ConsultarCargas = ConsultarCargasPage

	storage:any = {}
	user:any = {}
	tipoVehiculo:any = {}
	tiposEquipo:any = []
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider) {

		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()
		this.user = JSON.parse(this._user.session.user);

		if(this.user.equipo != null && this.user.equipo != undefined){
			this.tipoVehiculo = this.user.equipo.tipoVehiculo
		}

	}

	salir(){
		this.storage.clean()
		this.navCtrl.pop()
	}

}
