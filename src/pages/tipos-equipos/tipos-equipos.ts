import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

import { CargarCombustiblePage } from "../cargar-combustible/cargar-combustible"
import { EquiposPage } from "../equipos/equipos";
import { HomePage } from "../home/home";



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
	CargarCombustible = CargarCombustiblePage
	EquiposPage = EquiposPage
	Login = HomePage

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

  		this.http.get(this.storage.url + '/Equipos/GetTiposEquipos')
			.subscribe(response => {
				this.tiposEquipo = response
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
