import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';

import { EquiposPage } from "../equipos/equipos";
import { CreateChecklistPage } from "../create-checklist/create-checklist";
import { CreateChecklistBpPage } from "../create-checklist-bp/create-checklist-bp";
import { ViewChecklistPage } from "../view-checklist/view-checklist";

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

	storage:any = {}
	user:any = {}
	tipoVehiculo:any = {}
	tiposEquipo:any = []
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		private http: HttpClient) {

		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()
		this.user = JSON.parse(this._user.session.user);

		if(this.user.equipo != null && this.user.equipo != undefined){
			this.tipoVehiculo = this.user.equipo.tipoVehiculo
		}

		if(this.user.RolesId == 1){
			this.http.get(this.storage.url + '/Equipos/GetTiposEquipos')
				.subscribe(response => {
					this.tiposEquipo = response
				})
		}
	}
	salir(){
		this.storage.clean()
		this.navCtrl.pop()
	}

}
