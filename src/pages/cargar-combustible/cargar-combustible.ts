import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { Storage } from '@ionic/storage';
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
	elementos:any = []
	division:any = []
	clasificacion:any = []
	equipos:any = []
	ultimoHorometro:any = {}
	ultimoKilometraje:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })
	session:any = {}
	user:any = {}

  	constructor(public navCtrl: NavController, private http: HttpClient,
  		public navParams: NavParams, private _user: StorageServiceProvider, private storage: Storage,
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

	  	this.http.get(this._user.url + '/api/apiclasificacionequipos/')
			.subscribe(response => {
				this.elementos = response

				for(let i=0; this.elementos.length > i; i++){
					if(this.elementos[i].nivel == 1){
						this.division.push(this.elementos[i])
					}
				}

				if(this.platform.is('cordova')){
					// Dispositivo
					this.storage.get('division').then((val) => {
					    this.carga.division = val
					});

					this.getData()
				}else{
					// Escritorio
					if(localStorage.getItem('division')){
						this.carga.division = localStorage.getItem("division")
					}
					this.getData()
				}

			})


  	}

  	getData(){
  		if(this.platform.is('cordova')){
			this.storage.get('clasificacion').then((val) => {
			    this.carga.clasificacion = val
			});
  		}else{
  			this.carga.clasificacion = localStorage.getItem("clasificacion")
  		}

		this.selectClasification()
		this.selectEquipment()
  	}

  	selectClasification(){

  		this.equipos = []
  		this.clasificacion = []

		if(this.platform.is('cordova')){
  			this.storage.set('division', this.carga.division)
  		}else{
  			localStorage.setItem('division', this.carga.division)
  		}

  		for(let i=0; this.elementos.length > i; i++){
			if(this.elementos[i].padre == this.carga.division){
				this.clasificacion.push(this.elementos[i])
			}
		}
  	}

  	selectEquipment(){
		if(this.platform.is('cordova')){
  			this.storage.set('clasificacion', this.carga.clasificacion)
  		}else{
  			localStorage.setItem('clasificacion', this.carga.clasificacion)
  		}

  		this.http.get(this._user.url + '/equipos/tipoequipo/' + this.carga.clasificacion)
  			.subscribe(response => {
  				this.equipos = response
  			})
  	}

  	sendData(){
  		var data = new FormData()
		let fecha = this.carga.fechaCarga.split('-');

		this.carga.fechaCarga = fecha[2] +'/'+fecha[1]+'/'+fecha[0]
		this.carga.usersId = this.user.Id
		this.carga.kilometrajeAnterior = 0
		this.carga.horometroAnterior = 0

		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();

		data.append('equipo', JSON.stringify(this.carga))
		this.http.post(this._user.url + '/equipos/PostCargarDiesel/' + this.carga.equiposId, data)
			.subscribe(response => {
				this.loading.dismiss();
				this.showAlert('Registro guardado')
			},error => {
				this.loading.dismiss()
				this.showAlert(error.error)
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
