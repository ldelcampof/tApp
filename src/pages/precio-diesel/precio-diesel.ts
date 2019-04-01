import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { Platform } from 'ionic-angular';
import { MarimbaPage } from "../marimba/marimba";
import moment from 'moment';
/**
 * Generated class for the PrecioDieselPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-precio-diesel',
  templateUrl: 'precio-diesel.html',
})
export class PrecioDieselPage {
	precio:any = {}
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })
	Marimba = MarimbaPage

  	constructor(public navCtrl: NavController, private http: HttpClient, public navParams: NavParams, private _user: StorageServiceProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform) {
		this.precio.fecha = moment().format('YYYY-MM-DD')
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PrecioDieselPage');
	}

  	sendData(){
  		var data = new FormData()

		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();

		data.append('precio', JSON.stringify(this.precio))
		this.http.post(this._user.url + '/cargasdiesel/setprecio', data)
			.subscribe(response => {
				this.loading.dismiss();
				this.showAlert('Registro guardado')
				this.navCtrl.setRoot(this.Marimba)
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
					}
				},
			]
		});
		alert.present();
	}

}
