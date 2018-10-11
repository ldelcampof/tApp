import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarCargasPage } from './consultar-cargas';

@NgModule({
  declarations: [
    ConsultarCargasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarCargasPage),
  ],
})
export class ConsultarCargasPageModule {}
