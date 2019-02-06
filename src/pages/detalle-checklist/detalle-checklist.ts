import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

/**
 * Generated class for the DetalleChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detalle-checklist',
  templateUrl: 'detalle-checklist.html',
})
export class DetalleChecklistPage {
	respuestas:any = []
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

  	constructor(public navCtrl: NavController, public navParams: NavParams,
			private http: HttpClient, private _user: StorageServiceProvider,
			public loadingCtrl: LoadingController,
			public alertCtrl: AlertController) {
  		let url = ''
  		console.log(navParams.data)
  	if(navParams.data.Id != undefined){
  		url = this._user.url + '/checklist/GetDetail/' + this.navParams.data.Id
  	}else{
  		url = this._user.url + '/checklist/GetDetailBP/' + this.navParams.data.id
  	}

  	this.http.get(url)
			.subscribe(response => {
				this.respuestas = response
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
