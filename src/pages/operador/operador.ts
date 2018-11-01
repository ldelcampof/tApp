import { Component } from '@angular/core';
import { App, NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { CreateChecklistPage } from "../create-checklist/create-checklist";
import { CreateChecklistBpPage } from "../create-checklist-bp/create-checklist-bp";
import { ViewChecklistPage } from "../view-checklist/view-checklist";
import { GeneralChecklistPage } from "../general-checklist/general-checklist";
import { HomePage } from "../home/home";
import { VerCargasCombustiblePage } from "../ver-cargas-combustible/ver-cargas-combustible";
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

/**
 * Generated class for the OperadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-operador',
  templateUrl: 'operador.html',
})
export class OperadorPage {
	verCargasDiesel = VerCargasCombustiblePage
	createChecklistPage = CreateChecklistPage
	createChecklistBPPage = CreateChecklistBpPage
	viewChecklistPage = ViewChecklistPage
	generalChecklist = GeneralChecklistPage
	Login = HomePage

	storage:any = {}
	user:any = {}
	tipoVehiculo:any = {}
	tiposEquipo:any = []
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

  	constructor(public app: App,
  		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public alertCtrl: AlertController) {

  		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()
		this.user = JSON.parse(this._user.session.user);

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
