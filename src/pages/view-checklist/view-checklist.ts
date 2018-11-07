import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { DetalleChecklistPage } from '../detalle-checklist/detalle-checklist';
import { DetalleChecklistBpPage } from '../detalle-checklist-bp/detalle-checklist-bp';
import { DetalleChecklistCrPage } from '../detalle-checklist-cr/detalle-checklist-cr';
import { Platform } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-view-checklist',
  templateUrl: 'view-checklist.html',
})
export class ViewChecklistPage {
	checklists:any = []
	session:any = {}
	user:any = {
		equipo: {
			id: 0
		}
	}
	equipo:any = {}
	detailChecklistBp = DetalleChecklistBpPage
	detailChecklistCr = DetalleChecklistCrPage
	detailChecklist = DetalleChecklistPage
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private http:HttpClient, private _user:StorageServiceProvider,
		private platform:Platform, public alertCtrl: AlertController,
		public loadingCtrl: LoadingController) {

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}

		if(navParams.data.id == undefined){
			this.equipo = this.user.equipo
		}else{
			this.equipo = navParams.data
		}

		this.getChecklist(this.equipo)

	}

	getChecklist(equipo:any){
		this.loading.present()
		var url = '/checklist/GetChecklists/'

		this.http.get(this._user.url + url + equipo.id)
			.subscribe(response => {
				this.checklists = response
				for(let i = 0; this.checklists.length > i; i++){
					this.checklists[i].createdAt = moment(this.checklists[i].createdAt).format('DD/MM/YYYY')
				}
				this.loading.dismiss();
			}, error => {
				this.loading.dismiss();
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
