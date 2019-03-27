import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the GeneralChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-general-checklist',
  templateUrl: 'general-checklist.html',
})
export class GeneralChecklistPage {
	ElementosChecklistId:any
	respuestas:any = []
	checklist:any = {}
	storage:any = {}
	session:any = {}
	horometro:any = ''
	kilometraje:any = ''
	mantenimiento:any = ''
	user:any = {}
	tipoEquipo:any = {}
	newResponse:any
	exists:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

  	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public platform: Platform,
		private http: HttpClient) {

		this._user.getStorage()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}

		this.storage = this._user
		this.loading.dismiss()

		this.http.get(this._user.url + '/checklist/checkexist/' + this.navParams.data.id)
			.subscribe(response => {
				this.exists = response
				if(this.exists.length == 0){
					if(this.navParams.data.TiposEquipos_Id == 2){
						this.http.get(this._user.url + '/api/apiequipos/' + this.navParams.data.id)
							.subscribe(response => {
								this.checklist = response
								this.horometro = this.checklist.HorometrosKilometrajes[0].ultimoHorometro
								this.kilometraje = this.checklist.HorometrosKilometrajes[0].ultimoKilometraje
								this.mantenimiento = {
						            equiposId: this.user.equipo.id,
									nivelCombustible: 0,
									operadorId: this.user.Id,
									horometroInicial: 0,
									kilometrajeInicial: 0,
						            cargaDiesel: 0,
						            controlTeleMando: "CONFORME",
						            estadoSegurosEstabilizadores: "CONFORME",
						            paroEmergencia: "CONFORME",
						            iluminacionPluma: "CONFORME",
						            estadoAbrazaderas: "CONFORME",
						            nivelEstabilizadores: "CONFORME",
						            funcionamientoLubricador: "CONFORME",
						            lubricacionElementos: "CONFORME",
						            limpiezaTolva: "CONFORME",
						            limpiezaCabina: "CONFORME",
						            engrasado: "CONFORME",
						            funcionamientoAlarma: "CONFORME",
						            funcionamientoFrenos: "CONFORME",
						            espejosCompletos: "CONFORME",
						            funcionamientoBateria: "CONFORME",
						            estadoParabrisas: "CONFORME",
						            nivelAceiteHidraulico: "CONFORME",
						            nivelAceiteReductor: "CONFORME",
						            nivelAceiteMotor: "CONFORME",
						            nivelRefrigerante: "CONFORME",
						            condicionLuces: "CONFORME",
						            consumoCombustible: "CONFORME",
						            consumoAceiteMotor: "CONFORME",
						            consumoAceiteHidraulico: "CONFORME",
						            consumoAceiteTransmision: "CONFORME",
						            consumoRefrigerante: "CONFORME",
						            observaciones: "",
						        }


								this.loading.dismiss()
							}, error => {
								this.loading.dismiss()
								this.showAlert(error.error)
							})
					}
			  		this.http.get(this.storage.url + '/equipos/getequipo/' + this.navParams.data.id)
						.subscribe(response => {
							this.newResponse = response
							this.tipoEquipo = this.newResponse[0].TiposEquipos

							if(this.tipoEquipo.elementos.length > 0){
								for(let i = 0; this.tipoEquipo.elementos.length > i; i++){
				                    let opcion = {
				                        ElementosChecklistId: this.tipoEquipo.elementos[i].elemento.Id,
				                        EquipoId: this.navParams.data.id
				                    }
				                    this.respuestas.push(opcion)
				                }
				            }else{
								this.showAlert('El equipo no tiene elementos para checklist')
				            }
						})
				}else{
					this.loading.dismiss()
					this.showAlert('Ya fue dado un checklist el dia de hoy')
				}
		})
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GeneralChecklistPage');
	}

	sendData(){
		var data = new FormData()
		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();
		let count = 0;
		for(let i = 0; this.respuestas.length > i; i++){
			if(this.respuestas[i].respuesta != undefined){
				count++;
			}
		}
		if(this.horometro > this.mantenimiento.horometroInicial){
			this.loading.dismiss();
			this.showAlert('El horometro no puede ser menor que el inicial')
		}else{
			if(this.kilometraje > this.mantenimiento.kilometrajeInicial){
				this.loading.dismiss();
				this.showAlert('El kilometraje no puede ser menor que el inicial')
			}else{

				if(count != this.tipoEquipo.elementos.length){
					this.loading.dismiss();
					this.showAlert('No se han respondido todas las preguntas')
		        }else{
		            data.append('respuestas', JSON.stringify(this.respuestas))
		            data.append('mantenimiento', JSON.stringify(this.mantenimiento))
		            data.append('tipoEquipo', JSON.stringify(this.navParams.data.TiposEquipos_Id))
		            this.http.post(this._user.url + '/checklist/poststore/' + this.navParams.data.id, data)
		                .subscribe(response => {
							this.loading.dismiss();
							this.showAlert('Registro guardado')
						},error => {
							this.loading.dismiss()
							this.showAlert(error.error)
						})
		        }
		    }
	    }
	}
	showAlert(message) {
		const alert = this.alertCtrl.create({
			title: message,
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						if(message == 'Registro guardado' || message == 'Ya fue dado un checklist el dia de hoy' || message == 'El equipo no tiene elementos para checklist')
							this.navCtrl.pop();
					}
				},
			]
		});
		alert.present();
	}
}
