import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { Platform } from 'ionic-angular';
import moment from 'moment';
/**
 * Generated class for the CargarCombustiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cargar-combustible',
  templateUrl: 'cargar-combustible.html',
})
export class CargarCombustiblePage {

	carga:any = {}
	checklist:any = {}
	ultimoHorometro:any = {}
	ultimoKilometraje:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })
	session:any = {}
	user:any = {}

  	constructor(public navCtrl: NavController, private http: HttpClient,
  		public navParams: NavParams, private _user: StorageServiceProvider,
			public loadingCtrl: LoadingController, public alertCtrl: AlertController,
			public platform: Platform) {

		this._user.getStorage()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}

		this.carga.fechaCarga = moment().format('YYYY-MM-DD')

	  	this.http.get(this._user.url + '/api/apiequipos/' + this.navParams.data.id)
			.subscribe(response => {
				this.checklist = response
				this.ultimoHorometro = parseInt(this.checklist.HorometrosKilometrajes[0].ultimoHorometro)
				this.ultimoKilometraje = parseInt(this.checklist.HorometrosKilometrajes[0].ultimoKilometraje)
			})
  	}

  	sendData(){
  		var data = new FormData()
		let success = true
		let fecha = this.carga.fechaCarga.split('-');

		this.carga.fechaCarga = fecha[2] +'/'+fecha[1]+'/'+fecha[0]
		this.carga.usersId = this.user.Id
		this.carga.equiposId = this.navParams.data.id
		this.carga.kilometrajeAnterior = this.ultimoKilometraje
		this.carga.horometroAnterior = this.ultimoHorometro

		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();

		if(this.ultimoHorometro > this.carga.nuevoHorometro){
			this.loading.dismiss();
			this.showAlert('El horometro no puede ser menor que el anterior')
			success = false
		}else{
			if(this.ultimoKilometraje > this.carga.nuevoKilometraje){
				this.loading.dismiss();
				this.showAlert('El kilometraje no puede ser menor que el anterior')
				success = false
			}
		}

		if(success){
			data.append('equipo', JSON.stringify(this.carga))
			this.http.post(this._user.url + '/equipos/PostCargarDiesel/' + this.navParams.data.id, data)
				.subscribe(response => {
					this.loading.dismiss();
					this.showAlert('Registro guardado')
				},error => {
					this.loading.dismiss()
					this.showAlert(error.error)
				})
		}
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
