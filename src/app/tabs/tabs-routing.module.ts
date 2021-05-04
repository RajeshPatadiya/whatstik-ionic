import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'discover',
		component: TabsPage,
		children: [
			{
				path: 'tab1',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../tab1/tab1.module').then(m => m.Tab1PageModule)
					}
				]
			},
			{
				path: 'tab2',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../tab2/tab2.module').then(m => m.Tab2PageModule)
					}
				]
			},
			{
				path: 'tab3',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../tab3/tab3.module').then(m => m.Tab3PageModule)
					}
				]
			},
			{
				path: 'profile',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../profile/profile.module').then(m => m.ProfilePageModule)
					}
				]
			},
			{
				path: 'notifications',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../notifications/notifications.module').then(m => m.NotificationsPageModule)
					}
				]
			},
			{
				path: 'videos',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../videos/videos.module').then(m => m.VideosPageModule)
					}
				]
			},
			{
				path: 'explore',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../explore/explore.module').then(m => m.ExplorePageModule)
					}
				]
			},
			{
				path: 'home',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('../home/home.module').then(m => m.HomePageModule)
					}
				]
			},
			{
				path: '',
				redirectTo: '/discover/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/discover/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule { }
