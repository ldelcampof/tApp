import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the GeneralChecklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-general-checklist',
  templateUrl: 'general-checklist.html',
})
export class GeneralChecklistPage {
	ElementosChecklistId:any
	respuestas:any = []
	storage:any = {}
	session:any = {}
	user:any = {}
	tipoEquipo:any = {}
	newResponse:any
	loading:any = this.loadingCtrl.create({ content: 'Cargando...' })

  	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private _user: StorageServiceProvider,
		public platform: Platform,
		private http: HttpClient) {

		this._user.getStorage()
		this.storage = this._user
		this.loading.dismiss()

  		this.http.get(this.storage.url + '/equipos/getequipo/' + this.navParams.data.id)
			.subscribe(response => {
				this.newResponse = response
				console.log(response[0])
				this.tipoEquipo = this.newResponse[0].TiposEquipos
				for(let i = 0; this.tipoEquipo.elementos.length > i; i++){
                    let opcion = {
                        ElementosChecklistId: this.tipoEquipo.elementos[i].elemento.Id,
                        EquipoId: this.navParams.data.id
                    }
                    this.respuestas.push(opcion)
                }
			})
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GeneralChecklistPage');
	}

	sendData(){
		var data = new FormData()
		this.loading = this.loadingCtrl.create({ content: 'Cargando...' })

		this.loading.present();

		if(this.respuestas.length != this.tipoEquipo.elementos.length){
			this.loading.dismiss();
			this.showAlert('No se han respondido todas las preguntas')
        }else{
            data.append('respuestas', JSON.stringify(this.respuestas))
            this.http.post(this._user.url + '/checklist/poststore/' + this.navParams.data.id, data)
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
