import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

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
	storage:any = {}
	user:any = {}
	tipoVehiculo:any = {}
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
