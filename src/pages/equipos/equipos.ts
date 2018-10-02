import { Component } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { CargarCombustiblePage } from "../cargar-combustible/cargar-combustible"
import { VerCargasCombustiblePage } from '../ver-cargas-combustible/ver-cargas-combustible';

@Component({
  selector: 'page-equipos',
  templateUrl: 'equipos.html',
})
export class EquiposPage {

	elements:any = []
  user:any = {}
  CargarCombustible = CargarCombustiblePage
  VerCargasCombustible = VerCargasCombustiblePage

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private storage: StorageServiceProvider) {

      this.user =  JSON.parse(this.storage.session.user);


      this.loadEquipos(navParams.data.tipoEquipo);
  }

  doRefresh(refresher:Refresher){
  	console.log('Iniciando')
  	setTimeout(() => {
  		console.log("Termina")
  		refresher.complete()
  	},1500)
  }

  loadEquipos(tipoEquipo:any){
  	this.http.get(this.storage.url + '/equipos/tipoequipo/' + tipoEquipo)
  		.subscribe(response => {
  			this.elements = response
  			this.storage.getStorage();
  		})
  }

}
