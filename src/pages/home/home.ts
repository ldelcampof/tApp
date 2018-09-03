import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

	main:any = MainPage
		constructor(public navCtrl: NavController,
			private http: HttpClient,
			private _user: StorageServiceProvider) {

			this._user.getStorage()
			if(this._user.session.status){
				this.navCtrl.push(this.accionesPage)
			}
	}

	userLogin(){
		let data = new FormData()
		data.append('nombreUsuario', this.user.nombreUsuario)
		data.append('password', this.user.password)

		this.http.post(this._user.url + '/usuarios/login', data, {withCredentials : false})
			.subscribe(response => {
				this._user.session = response
				this._user.session.status = true
				this._user.set_storage()
				this.navCtrl.push(this.accionesPage)
			})
	}
}