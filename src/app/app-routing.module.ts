import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'trending',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then(m => m.VideosPageModule)
  },
  {
    path: 'embedded',
    loadChildren: () => import('./embedded/embedded.module').then(m => m.EmbeddedPageModule)
  },
  {
    path: 'fullscreen',
    loadChildren: () => import('./fullscreen/fullscreen.module').then(m => m.FullscreenPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'trends',
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsPageModule)
  },
  {
    path: 'trending',
    loadChildren: () => import('./trends/trends.module').then( m => m.TrendsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'content-policy',
    loadChildren: () => import('./content-policy/content-policy.module').then( m => m.ContentPolicyPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'topic/:id',
    loadChildren: () => import('./topic/topic.module').then( m => m.TopicPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
