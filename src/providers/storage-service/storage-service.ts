import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {
	url = 'http://192.168.0.13/trilogic'
	// url = 'http://c35b528d.ngrok.io/trilogic/'
	// url = 'http://192.168.0.11/trilogic'
	// url = 'http://192.168.1.6/trilogic'
	session:any = {
		status: false,
		user: {
			equipo: {
				id: 0,
				tipoVehiculo: ''
			}
		}
	}

	constructor(private storage: Storage, private platform: Platform) {
	}

	getStorage(){
		if(this.platform.is('cordova')){
			// Dispositivo
			this.storage.get('session').then((val) => {
			    this.session = val
			});

		}else{
			// Escritorio
			if(localStorage.getItem('session')){
				this.session = JSON.parse(localStorage.getItem("session"))
			}
		}
	}

	set_storage(){
		this.session.status = true
		if(this.platform.is('cordova')){
			// Dispositivo
			this.storage.set('session',JSON.stringify(this.session))
		}else{
			// Escritorio
			localStorage.setItem("session", JSON.stringify(this.session))
		}
	}

	clean(){
		if(this.platform.is('cordova')){
			// Dispositivo
			this.storage.clear()

		}else{
			// Escritorio
			localStorage.clear()
		}
	}


}
