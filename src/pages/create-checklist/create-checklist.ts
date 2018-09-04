import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-create-checklist',
  templateUrl: 'create-checklist.html',
})
export class CreateChecklistPage {

	mantenimiento = {}
	checklist:any = {}
	horometro:any = ''
	kilometraje:any = ''
	user:any = {}

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, public alertCtrl: AlertController,
			private _user: StorageServiceProvider) {
		this._user.getStorage()
		this.user = JSON.parse(this._user.session.user)

		this.http.get(this._user.url + '/api/apiequipos/' + this.user.equipo.id)
			.subscribe(response => {
				this.checklist = response
				this.horometro = this.checklist.HorometrosKilometrajes[0].ultimoHorometro
				this.kilometraje = this.checklist.HorometrosKilometrajes[0].ultimoKilometraje
			})

		this.mantenimiento = {
			equipoId: this.user.equipo.id,
			nivelFinalCombustible: 100,
			operadorId: this.user.Id,
			horometroInicial: 0,
			kilometrajeInicial: 0,
			purgarTanqueAire: 'CONFORME',
			valvulaReguladora: 'CONFORME',
			nivelAceiteMotor: 'CONFORME',
			nivelRefrigerante: 'CONFORME',
			nivelLiquidoLavaParabrisas: 'CONFORME',
			nivelRestriccionFiltroAire: 'CONFORME',
			nivelAceiteHidraulico: 'CONFORME',
			nivelReductorOlla: 'CONFORME',
			nivelBombaSustraOlla: 'CONFORME',
			embargueCambioVelocidades: 'CONFORME',
			acelerador: 'CONFORME',
			presionAceite: 'CONFORME',
			alarmaPresionAire: 'CONFORME',
			bandas: 'CONFORME',
			limpiezaCabina: 'CONFORME',
			limpiezaOllaInterior: 'CONFORME',
			limpiezaOllaExterior: 'CONFORME',
			engrasado: 'CONFORME',
			funcionamientoAlarmaReversa: 'CONFORME',
			funcionamientoFrenos: 'CONFORME',
			espejosCompletos: 'CONFORME',
			funcionamientoEstadoBateria: 'CONFORME',
			estadoParabrisasVidrios: 'CONFORME',
			condicionLuces: 'CONFORME',
			limpiaparabrisas: 'CONFORME',
			funcionamientoAireAcondicionado: 'CONFORME',
			cinturonSeguridad: 'CONFORME',
			funcionamientoBocina: 'CONFORME',
			asientos: 'CONFORME',
			lenguetaSella: 'CONFORME',
			neumaticos: 'CONFORME',
			condicionTanqueCombustible: 'CONFORME',
			fugasAceite: 'CONFORME',
			consumoCombustible: 'CONFORME',
			consumoAceiteMotor: 'CONFORME',
			consumoAceiteHidraulico: 'CONFORME',
			consumoAceiteTransmision: 'CONFORME',
			consumoRefrigerante: 'CONFORME',
			observaciones: ''
		}
	}

	sendData(){
		var data = new FormData()
		data.append('mantenimiento', JSON.stringify(this.mantenimiento))
		this.http.post(this._user.url + '/api/apiReporteDiarioOperadorCR/' + this.user.equipo.id, data)
			.subscribe(response => {
				this.showAlert('Registro guardado')
			},
			error => {
				this.showAlert(error.error[0])
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
