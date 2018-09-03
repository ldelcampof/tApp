import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
  selector: 'page-detalle-checklist-cr',
  templateUrl: 'detalle-checklist-cr.html',
})
export class DetalleChecklistCrPage {
	checklist:any = {}
	detail:any = {
		equiposId: '',
		usuariosId: '',
		horometroInicial: 0,
		kilometrajeInicial: 0,
		cargaDiesel: 0,
		nivelFinalCombustible: 0,
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
		obervaciones: "",
	}

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, private _user: StorageServiceProvider) {
		this._user.getStorage()
		this.checklist = this.navParams.get('checklist');
		this.http.get(this._user.url + '/api/apiReporteDiarioOperadorCR/' + this.checklist.reporteId)
			.subscribe(response => {
				this.detail = response
				console.log(this.detail)
			})
	}

}
