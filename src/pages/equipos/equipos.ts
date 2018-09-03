import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";


@Component({
  selector: 'page-equipos',
  templateUrl: 'equipos.html',
})
export class EquiposPage {

	elements:any = []

  constructor(public navCtrl: NavController, private http: HttpClient, private storage: StorageServiceProvider) {
  	this.loadEquipos();
  }

  doRefresh(refresher:Refresher){
  	console.log('Iniciando')
  	setTimeout(() => {
  		console.log("Termina")
  		refresher.complete()
  	},1500)
  }

  loadEquipos(){
  	this.http.get(this.storage.url + '/equipos/tipoequipo/Cami%C3%B3n%20Revolvedor')
  		.subscribe(response => {
  			this.elements = response
  			this.storage.getStorage();
  		})
  }

}
