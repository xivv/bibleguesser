import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectmodePage } from './selectmode.page';

const routes: Routes = [
  {
    path: '',
    component: SelectmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectmodePageRoutingModule {}
