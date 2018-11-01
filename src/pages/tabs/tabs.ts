import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccionesPage } from '../acciones/acciones';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
	accionesPage = AccionesPage
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

}
