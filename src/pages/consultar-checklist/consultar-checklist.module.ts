import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarChecklistPage } from './consultar-checklist';

@NgModule({
  declarations: [
    ConsultarChecklistPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarChecklistPage),
  ],
})
export class ConsultarChecklistPageModule {}
