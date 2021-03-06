import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-create-checklist',
  templateUrl: 'create-checklist.html',
})
export class CreateChecklistPage {

	mantenimiento:any = {}
	session:any = {}
	checklist:any = {}
	horometro:any = ''
	kilometraje:any = ''
	user:any = {}
	exists:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, public alertCtrl: AlertController,
			private _user: StorageServiceProvider,
			public loadingCtrl: LoadingController,
			private platform:Platform) {
		this._user.getStorage()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}
		this.loading.present()

		this.http.get(this._user.url + '/checklist/checkexist/' + this.user.equipo.id)
			.subscribe(response => {
				this.exists = response
				if(this.exists.length == 0){
					this.http.get(this._user.url + '/api/apiequipos/' + this.user.equipo.id)
						.subscribe(response => {
							this.checklist = response
							this.horometro = this.checklist.HorometrosKilometrajes[0].ultimoHorometro
							this.kilometraje = this.checklist.HorometrosKilometrajes[0].ultimoKilometraje
							this.loading.dismiss()
						}, error => {
							this.loading.dismiss()
							this.showAlert(error.error)
						})
				}else{
					this.loading.dismiss()
					this.showAlert('Ya fue dado un checklist el dia de hoy')
					this.navCtrl.pop()
				}
			})

		this.mantenimiento = {
			equipoId: this.user.equipo.id,
			nivelFinalCombustible: 100,
			operadorId: this.user.Id,
			horometroInicial: 0,
			kilometrajeInicial: 0,
			purgarTanqueAire: '',
			valvulaReguladora: '',
			nivelAceiteMotor: '',
			nivelRefrigerante: '',
			nivelLiquidoLavaParabrisas: '',
			nivelRestriccionFiltroAire: '',
			nivelAceiteHidraulico: '',
			nivelReductorOlla: '',
			nivelBombaSustraOlla: '',
			embargueCambioVelocidades: '',
			acelerador: '',
			presionAceite: '',
			alarmaPresionAire: '',
			bandas: '',
			limpiezaCabina: '',
			limpiezaOllaInterior: '',
			limpiezaOllaExterior: '',
			engrasado: '',
			funcionamientoAlarmaReversa: '',
			funcionamientoFrenos: '',
			espejosCompletos: '',
			funcionamientoEstadoBateria: '',
			estadoParabrisasVidrios: '',
			condicionLuces: '',
			limpiaparabrisas: '',
			funcionamientoAireAcondicionado: '',
			cinturonSeguridad: '',
			funcionamientoBocina: '',
			asientos: '',
			lenguetaSella: '',
			neumaticos: '',
			condicionTanqueCombustible: '',
			fugasAceite: '',
			consumoCombustible: '',
			consumoAceiteMotor: '',
			consumoAceiteHidraulico: '',
			consumoAceiteTransmision: '',
			consumoRefrigerante: '',
			observaciones: ''
		}
	}

	sendData(){
		var data = new FormData()
		let success = true
		let valid = true

		if(this.horometro >= this.mantenimiento.horometroInicial){
			this.showAlert('El horometro no puede ser menor que el anterior')
			success = false
		}
		if(this.kilometraje >= this.mantenimiento.kilometrajeInicial){
			this.showAlert('El kilometraje no puede ser menor que el anterior')
			success = false
		}
		for(var answer in this.mantenimiento){
			if(answer == ''){
				valid = false
			}
		}

		if(!valid){
			this.showAlert('No se han contestado todas las preguntas')
		}

		if(success){
			this.loading = this.loadingCtrl.create({ content: 'Cargando...' })
			this.loading.present()

			data.append('mantenimiento', JSON.stringify(this.mantenimiento))
			this.http.post(this._user.url + '/api/apiReporteDiarioOperadorCR/' + this.user.equipo.id, data)
				.subscribe(response => {
					this.loading.dismiss()
					this.showAlert('Registro guardado')
				}, error => {
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
						if(message == 'Registro guardado'){
							this.navCtrl.pop();
						}
					}
				},
			]
		});
		alert.present();
	}

}
