import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

import { EquiposPage } from "../equipos/equipos";


/**
 * Generated class for the TiposEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tipos-equipos',
  templateUrl: 'tipos-equipos.html',
})
export class TiposEquiposPage {
	EquiposPage = EquiposPage

	storage:any = {}
	session:any = {}
	user:any = {}
	tiposEquipo:any = []
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public platform: Platform,
		private http: HttpClient) {

		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this.storage.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this.storage.session.user)
		}

  		this.http.get(this.storage.url + '/Equipos/GetTiposEquipos')
				.subscribe(response => {
					this.tiposEquipo = response
				})
  	}

	salir(){
		this.storage.clean()
		this.navCtrl.pop()
	}

}
