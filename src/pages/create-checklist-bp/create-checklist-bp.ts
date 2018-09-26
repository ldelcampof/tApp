import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-create-checklist-bp',
  templateUrl: 'create-checklist-bp.html',
})
export class CreateChecklistBpPage {
	mantenimiento:any = {}
	session: any = {}
	checklist:any = {}
	ultimoHorometro:any = {}
	ultimoKilometraje:any = {}
	user:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, public alertCtrl: AlertController,
			private _user: StorageServiceProvider,private platform:Platform,
			public loadingCtrl: LoadingController) {

		this._user.getStorage()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}

		this.http.get(this._user.url + '/api/apiequipos/' + this.user.equipo.id)
			.subscribe(response => {
				this.checklist = response
				this.ultimoHorometro = parseInt(this.checklist.HorometrosKilometrajes[0].ultimoHorometro)
				this.ultimoKilometraje = parseInt(this.checklist.HorometrosKilometrajes[0].ultimoKilometraje)
			})

			this.mantenimiento = {
	            equipoId: this.user.equipo.id,
				nivelFinalCombustible: 0,
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
	            obervaciones: "",
	        }

	}

	sendData(){
		var data = new FormData()
		let success = true
		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();

		if(this.ultimoHorometro >= this.mantenimiento.horometroInicial){
			this.loading.dismiss();
			this.showAlert('El horometro no puede ser menor que el anterior')
			success = false
		}
		if(this.ultimoKilometraje >= this.mantenimiento.kilometrajeInicial){
			this.loading.dismiss();
			this.showAlert('El kilometraje no puede ser menor que el anterior')
			success = false
		}

		if(success){
			data.append('mantenimiento', JSON.stringify(this.mantenimiento))
			this.http.post(this._user.url + '/api/apiReporteDiarioOperadorBP/' + this.user.equipo.id, data)
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
