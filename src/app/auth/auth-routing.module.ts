import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
