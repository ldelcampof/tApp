import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-create-checklist-bp',
  templateUrl: 'create-checklist-bp.html',
})
export class CreateChecklistBpPage {
	mantenimiento:any = {}
	user:any = {}

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, public alertCtrl: AlertController,
			private _user: StorageServiceProvider) {
		this._user.getStorage()
		this.user = JSON.parse(this._user.session.user)
		this.mantenimiento = {
            equipoId: this.user.equipo.id,
			nivelFinalCombustible: 0,
			operadorId: this.user.Id,
			horometroInicial: this.user.equipo.horometro,
			kilometrajeInicial: this.user.equipo.kilometraje,
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
            obervaciones: "",
        }
	}

	sendData(){
		var data = new FormData()
		data.append('mantenimiento', JSON.stringify(this.mantenimiento))
		this.http.post(this._user.url + '/api/apiReporteDiarioOperadorBP/' + this.user.equipo.id, data)
			.subscribe(response => {
				this.showAlert('Registro guardado')
			},error => {
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
