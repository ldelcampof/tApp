import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultorPage } from './consultor';

@NgModule({
  declarations: [
    ConsultorPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultorPage),
  ],
})
export class ConsultorPageModule {}
