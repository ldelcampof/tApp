import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
// import { CreateChecklistPage } from "../create-checklist/create-checklist";
// import { CreateChecklistBpPage } from "../create-checklist-bp/create-checklist-bp";
// import { ViewChecklistPage } from "../view-checklist/view-checklist";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

/**
 * Generated class for the OperadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operador',
  templateUrl: 'operador.html',
})
export class OperadorPage {
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

	ionViewDidLoad() {
		console.log('ionViewDidLoad OperadorPage');
	}

}
