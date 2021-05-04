import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicPageRoutingModule } from './topic-routing.module';

import { TopicPage } from './topic.page';
import {CommonHeaderComponent} from '../common-header/common-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicPageRoutingModule
  ],
  exports: [
    CommonHeaderComponent
  ],
  declarations: [TopicPage, CommonHeaderComponent]
})
export class TopicPageModule {}
