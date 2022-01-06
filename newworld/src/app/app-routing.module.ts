import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildDetailComponent } from './build-detail/build-detail.component';
import { BuildFormComponent } from './build-form/build-form.component';
import { BuildOverviewComponent } from './build-overview/build-overview.component';

const routes: Routes = [
  { path: '', component: BuildOverviewComponent },
  { path: 'build/:name', component: BuildDetailComponent },
  { path: 'builds/form/:type/:name', component: BuildFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
