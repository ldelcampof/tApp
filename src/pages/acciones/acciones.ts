import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private _user: StorageServiceProvider) {

		this._user.getStorage()
		this.storage = this._user
		this.user = JSON.parse(this._user.session.user);
		console.log(this.user)
		if(this.user.equipo != null && this.user.equipo != undefined){
			this.tipoVehiculo = this.user.equipo.tipoVehiculo
		}
	}
	salir(){
		console.log('SI')
		this.storage.clean()
		this.navCtrl.pop()
	}

}
