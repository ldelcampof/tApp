import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
  selector: 'page-detalle-checklist-bp',
  templateUrl: 'detalle-checklist-bp.html',
})
export class DetalleChecklistBpPage {
	checklist:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	detail:any = {
		equipoId: 0,
		nivelFinalCombustible: 100,
		operadorId: 0,
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
		observaciones: 'Todo bien'
	}

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, private _user: StorageServiceProvider,
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController,) {

		this.loading.present()
		this._user.getStorage()
		this.checklist = this.navParams.get('checklist');
		this.http.get( this._user.url + '/api/apiReporteDiarioOperadorBP/' + this.checklist.reporteId)
			.subscribe(response => {
				this.detail = response
				this.loading.dismiss()
			}, error => {
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
