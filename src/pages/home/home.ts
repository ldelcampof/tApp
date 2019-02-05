import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AccionesPage } from '../acciones/acciones';
import { HttpClient } from '@angular/common/http';
import { TiposEquiposPage } from "../tipos-equipos/tipos-equipos";
import { OperadorPage } from "../operador/operador";
import { PrecioDieselPage } from "../precio-diesel/precio-diesel";
import { TabsPage } from "../tabs/tabs";

import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	accionesPage = AccionesPage
	tabsPage = TabsPage
	TiposEquipos = TiposEquiposPage
	PrecioDieselPage = PrecioDieselPage
	Operador = OperadorPage
	userSession:any = {}
	precioDiesel:any = 0

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
			public loadingCtrl: LoadingController,
			private menu: MenuController) {

			this.menu.enable(false, 'side_menu');
			this._user.getStorage()
			if(this._user.session.status){
				this.userSession =  JSON.parse(this._user.session.user);

				if(this.userSession.RolesId == 7){
					this.http.get(this._user.url + '/cargasdiesel/getprecio')
						.subscribe(response => {
							this.precioDiesel = response
							if(this.precioDiesel != null){
								this.navCtrl.setRoot(this.TiposEquipos)
							}else{
								this.navCtrl.setRoot(this.PrecioDieselPage)
							}
						})
				}else{
					if(this.userSession.RolesId == 4){
						this.navCtrl.setRoot(this.Operador)
					}else{
						this.navCtrl.setRoot(this.tabsPage)
					}
				}

				// this.navCtrl.setRoot(this.rootPage)
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
				this.userSession =  JSON.parse(this._user.session.user);
				this._user.session.status = true
				this._user.set_storage()

				if(this.userSession.RolesId == 7){
					this.http.get(this._user.url + '/cargasdiesel/getprecio')
						.subscribe(response => {
							this.precioDiesel = response
							if(this.precioDiesel != null){
								this.navCtrl.setRoot(this.TiposEquipos)
							}else{
								this.navCtrl.setRoot(this.PrecioDieselPage)
							}
						})

				}else{
					if(this.userSession.RolesId == 4){
						this.navCtrl.setRoot(this.Operador)
					}else{
						this.navCtrl.setRoot(this.tabsPage)
					}
				}
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
					handler: () => {}
				},
			]
		});
		alert.present();
	}
}