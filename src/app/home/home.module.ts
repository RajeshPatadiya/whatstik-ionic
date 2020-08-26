import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';


import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { InViewportModule } from 'ng-in-viewport';

// Remember to import `intersection-observer` polyfill to support all major browsers
import 'intersection-observer';

import { HideHeaderDirective } from '../directives/hide-header.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    InViewportModule
  ],
  exports: [HideHeaderDirective],
  declarations: [HomePage, HideHeaderDirective]
})
export class HomePageModule { }
