import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AccionesPage } from '../acciones/acciones';
import { HttpClient } from '@angular/common/http';

import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	accionesPage = AccionesPage
	user = {
		nombreUsuario: '',
		password: ''
	}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })


	main:any = MainPage
		constructor(public navCtrl: NavController,
			private http: HttpClient,
			private _user: StorageServiceProvider,
			public alertCtrl: AlertController,
			public loadingCtrl: LoadingController) {

			this._user.getStorage()
			if(this._user.session.status){
				this.navCtrl.push(this.accionesPage)
			}
	}

	userLogin(){
		let data = new FormData()
		data.append('nombreUsuario', this.user.nombreUsuario)
		data.append('password', this.user.password)
		this.loading.present()

		this.http.post(this._user.url + '/usuarios/login', data, {withCredentials : false})
			.subscribe(response => {
				this.loading.dismiss()
				this._user.session = response
				this._user.session.status = true
				this._user.set_storage()
				this.navCtrl.push(this.accionesPage)
			}, error => {
				this.showAlert(error.error)
				this.loading.dismiss()
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