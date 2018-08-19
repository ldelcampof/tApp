import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EquiposPage } from '../equipos/equipos'

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

  	openPage() {
		this.navCtrl.push(EquiposPage)
  	}

}
