import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";

/**
 * Generated class for the ConsultarCargasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-consultar-cargas',
  templateUrl: 'consultar-cargas.html',
})
export class ConsultarCargasPage {
	session:any = {}
	user:any = {}

	checklists:any = []
	fecha:string = ''
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

  	constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,
  		private _user:StorageServiceProvider, public loadingCtrl: LoadingController,
  		private platform: Platform, public alertCtrl: AlertController) {
  		this._user.getStorage()

		if(this.platform.is('cordova')){
			this.session = JSON.parse(this._user.session)
			this.user = JSON.parse(this.session.user)
		}else{
			this.user = JSON.parse(this._user.session.user)
		}
  	}

	consultarCarga(){
  		var data = new FormData()
		data.append('fecha', this.fecha)

		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })
		this.loading.present();

		this.http.get(this._user.url + '/cargasdiesel/buscafecha/' + this.fecha)
			.subscribe(response => {
				console.log(response)
				this.loading.dismiss();
				this.checklists = response
			},error => {
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
