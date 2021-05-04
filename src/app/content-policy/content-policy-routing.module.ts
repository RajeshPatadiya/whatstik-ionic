import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPolicyPage } from './content-policy.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPolicyPageRoutingModule {}
