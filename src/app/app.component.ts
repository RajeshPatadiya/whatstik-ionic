import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SidemenuService } from './services/sidemenu.service';
import { GeneralService } from './services/general.service';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	public selectedIndex = 0;
	appPages: Array<any>;
	generalData: any;
	// public appPages = [
	//   {
	//     title: 'Inbox',
	//     url: '/folder/Inbox',
	//     icon: 'mail'
	//   },
	//   {
	//     title: 'Outbox',
	//     url: '/folder/Outbox',
	//     icon: 'paper-plane'
	//   },
	//   {
	//     title: 'Favorites',
	//     url: '/folder/Favorites',
	//     icon: 'heart'
	//   },
	//   {
	//     title: 'Archived',
	//     url: '/folder/Archived',
	//     icon: 'archive'
	//   },
	//   {
	//     title: 'Trash',
	//     url: '/folder/Trash',
	//     icon: 'trash'
	//   },
	//   {
	//     title: 'Spam',
	//     url: '/folder/Spam',
	//     icon: 'warning'
	//   }
	// ];
	public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
	error: any;

	constructor(private menuContoller: MenuController, private generalService: GeneralService, private toastr: ToastrService, private sidemenuService: SidemenuService, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			/**
			 * Load sidebar Menu
			 */
			this.sidemenuService.getSidemenu().subscribe(async (response) => {
				if (response['status'] == 0) {
					this.toastr.error('There are no sidemenu available', 'No sidemenu Found', {
						disableTimeOut: true
					});
				}
				this.appPages = response['data'].sub_menu;
			}, error => {
				this.error = error;
			});

			/**
			 * Load general setting
			 */
			this.generalService.getGeneralData().subscribe(async (response) => {
				if (response['status'] == 0) {
					this.toastr.error('There are no general data available', 'No general Found', {
						disableTimeOut: true
					});
				}
				this.generalData = response['data'];
			}, error => {
				this.error = error;
			});
		});
	}

	ngOnInit() {
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			// this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		}
	}

	closeMenu() {
		this.menuContoller.enable(true, 'first');
		this.menuContoller.close('first');
	}
}
