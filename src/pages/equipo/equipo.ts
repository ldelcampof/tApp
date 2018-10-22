import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
// import { Platform } from 'ionic-angular';
import moment from 'moment'

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
	empleado:any = {}
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
		this.http.get(this._user.url + '/api/apiEmpleados/' + this.navParams.data.codigoEmpleado)
			.subscribe(response => {
				this.empleado = response
				this.empleado.edad = moment(this.empleado.fechanacimiento).fromNow()
				this.empleado.edad = this.empleado.edad.split(' ')
				this.empleado.edad = this.empleado.edad[0]
				this.empleado.fechanacimiento = moment(this.empleado.fechanacimiento).format('DD/MM/YYYY')
				console.log(this.empleado)
				this.loading.dismiss();
			}, error => {
				this.showAlert(error.error)
				this.loading.dismiss();
			})
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
