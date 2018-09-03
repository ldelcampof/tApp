import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { DetalleChecklistBpPage } from '../detalle-checklist-bp/detalle-checklist-bp';
import { DetalleChecklistCrPage } from '../detalle-checklist-cr/detalle-checklist-cr';

@Component({
  selector: 'page-view-checklist',
  templateUrl: 'view-checklist.html',
})
export class ViewChecklistPage {
	checklists:any = []
	user = {
		equipo: {
			id: 0
		}
	}
	detailChecklistBp = DetalleChecklistBpPage
	detailChecklistCr = DetalleChecklistCrPage

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private http: HttpClient, private _user: StorageServiceProvider) {
		this._user.getStorage()
		this.user = JSON.parse(this._user.session.user)
		this.getChecklist()

	}

	getChecklist(){
		this.http.get(this._user.url + '/reportesoperador/equipo/' + this.user.equipo.id)
			.subscribe(response => {
				this.checklists = response
			})
	}

}
