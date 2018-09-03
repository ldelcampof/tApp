import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
  selector: 'page-detalle-checklist-bp',
  templateUrl: 'detalle-checklist-bp.html',
})
export class DetalleChecklistBpPage {
	checklist:any = {}
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
			private http: HttpClient, private _user: StorageServiceProvider) {
		this._user.getStorage()
		this.checklist = this.navParams.get('checklist');
		this.http.get( this._user.url + '/api/apiReporteDiarioOperadorBP/' + this.checklist.reporteId)
			.subscribe(response => {
				this.detail = response
				console.log(this.detail)
			})
	}

}
