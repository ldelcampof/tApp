import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
// import { Platform } from 'ionic-angular';

/**
 * Generated class for the EquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipo',
  templateUrl: 'equipo.html',
})
export class EquipoPage {
	equipo:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })
	HorometrosKilometrajes:any = []
	user: any = {}

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private http:HttpClient, private _user:StorageServiceProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController) {
		this.HorometrosKilometrajes = []
		this.user = this._user

		this.getEquipo(this.navParams.data.id)

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EquipoPage');
	}

	getEquipo(id: any){
		this.loading.present()
		this.equipo = this.navParams.data
		this.HorometrosKilometrajes = this.navParams.data.HorometrosKilometrajes
		this.loading.dismiss();
		// this.http.get(this._user.url + '/api/apiEquipos/' + id)
		// 	.subscribe(response => {
		// 		this.equipo = response
		// 		this.loading.dismiss();
		// 	}, error => {
		// 		this.showAlert(error.error)
		// 	})
	}
	showAlert(message) {
		const alert = this.alertCtrl.create({
			title: message,
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						if(message == 'Registro guardado')
							this.navCtrl.pop();
					}
				},
			]
		});
		alert.present();
	}

}
