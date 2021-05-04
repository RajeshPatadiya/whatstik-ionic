import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPolicyPageRoutingModule } from './content-policy-routing.module';

import { ContentPolicyPage } from './content-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPolicyPageRoutingModule
  ],
  declarations: [ContentPolicyPage]
})
export class ContentPolicyPageModule {}
