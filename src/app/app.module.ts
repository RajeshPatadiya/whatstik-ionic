import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      // disableTimeOut: true,
      timeOut: 3000,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'API_BASE_URL', useValue: environment.API_BASE_URL },
    VideoPlayer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
