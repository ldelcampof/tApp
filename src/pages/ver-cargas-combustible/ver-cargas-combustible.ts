import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { Platform } from 'ionic-angular';

import * as moment from 'moment';

/**
 * Generated class for the VerCargasCombustiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ver-cargas-combustible',
  templateUrl: 'ver-cargas-combustible.html',
})
export class VerCargasCombustiblePage {
  	cargas:any = []

	constructor(public navCtrl: NavController, private http: HttpClient,
  		public navParams: NavParams, private _user: StorageServiceProvider,
			public loadingCtrl: LoadingController, public alertCtrl: AlertController,
			public platform: Platform) {

  		this.http.get(this._user.url + '/cargasdiesel/buscaequipo/' + this.navParams.data.id)
			.subscribe(response => {
				this.cargas = response
				moment.locale('es')
				for(let i = 0; this.cargas.length > i; i++){
					this.cargas[i].fechaCarga = moment(this.cargas[i].fechaCarga).format('DD/MM/YYYY')
				}
			})
  }

}
