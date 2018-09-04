import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from "../../providers/storage-service/storage-service";
import { HttpClient } from '@angular/common/http';
import { DetalleChecklistBpPage } from '../detalle-checklist-bp/detalle-checklist-bp';
import { DetalleChecklistCrPage } from '../detalle-checklist-cr/detalle-checklist-cr';
import moment from 'moment'

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

				for(let i = 0; this.checklists.length > i; i++){
					// this.checklists[i].createdAt = this.checklists[i].createdAt.replace(/\//g, "")
					// this.checklists[i].createdAt = this.checklists[i].createdAt.replace('Date(', "")
					// this.checklists[i].createdAt = this.checklists[i].createdAt.replace(')', "")
					// this.checklists[i].createdAt = parseInt(this.checklists[i].createdAt.substring(0, 10));
					moment.locale('es')

					this.checklists[i].createdAt = moment(this.checklists[i].createdAt)
				}
			})
	}

}
