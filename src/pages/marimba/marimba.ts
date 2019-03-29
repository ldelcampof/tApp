import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

import { CargarCombustiblePage } from "../cargar-combustible/cargar-combustible"
import { EquiposPage } from "../equipos/equipos";
import { HomePage } from "../home/home";
import * as moment from 'moment';


/**
 * Generated class for the TiposEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-marimba',
  templateUrl: 'marimba.html',
})
export class MarimbaPage {
	CargarCombustible = CargarCombustiblePage
	EquiposPage = EquiposPage
	Login = HomePage

	storage:any = {}
	session:any = {}
	user:any = {}
	cargasdiesel:any = []
	date:any = moment().format('D MMM YYYY')
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public platform: Platform,
		private http: HttpClient,
		public app: App,
		private alertCtrl: AlertController) {

		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()
// console.log(this.storage)
		if(this.platform.is('cordova')){
			// this.session = JSON.parse(this.storage.session)
			// this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this.storage.session.user)
		}

		let data = new FormData()
		data.append('fechaInicio', moment().format('YYYY/MM/DD'))
		data.append('fechaFin', moment().format('YYYY/MM/DD'))

  		this.http.post(this.storage.url + 'cargasdiesel/buscafecha', data)
			.subscribe(response => {
				this.cargasdiesel = response
			})
  	}
  	salir(){
		this.showConfirm()
	}

	showConfirm() {
		const confirm = this.alertCtrl.create({
			title: 'Salir de TRILOGIC',
			message: '¿Realmente quieres salir de la aplicación?',
			buttons: [
				{
					text: 'No',
					handler: () => {
						console.log('Disagree clicked');
					}
				},
				{
					text: 'Si',
					handler: () => {
						this.storage.clean()

						this.app.getRootNav().setRoot(this.Login).then(data => {
							console.log('Going home')
						      console.log(data);
						  }, (error) => {
						      console.log(error);
						  })
					}
				}
			]
		});
		confirm.present();
	}
}
