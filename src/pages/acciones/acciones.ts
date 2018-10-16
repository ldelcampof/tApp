import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

import { EquiposPage } from "../equipos/equipos";
import { TiposEquiposPage } from "../tipos-equipos/tipos-equipos";
import { ConsultarChecklistPage } from "../consultar-checklist/consultar-checklist";
import { ConsultarCargasPage } from "../consultar-cargas/consultar-cargas";
import { HomePage } from "../home/home";

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
	Login = HomePage
	equiposPage = EquiposPage
	TiposEquipos = TiposEquiposPage
	ConsultarChecklist = ConsultarChecklistPage
	ConsultarCargas = ConsultarCargasPage

	division:any
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })
	storage:any = {}
	session:any = {}
	tiposEquipo:any = []
	tipoVehiculo:any = {}
	user:any = {}

	constructor(public app: App,
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public alertCtrl: AlertController) {

		this.division = this.navParams.get('division');
		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()
		var user = JSON.stringify(this._user.session).replace(/\\/g, '')
		console.log(user)
		if(this.user != {}){
			// this.session = JSON.parse(user)
			// this.user = JSON.parse(this.session.user);
		}

		if(this.user.equipo != null && this.user.equipo != undefined){
			this.tipoVehiculo = this.user.equipo.tipoVehiculo
		}

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
