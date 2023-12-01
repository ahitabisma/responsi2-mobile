import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PribadiPage } from './pribadi.page';

const routes: Routes = [
  {
    path: '',
    component: PribadiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PribadiPageRoutingModule {}
