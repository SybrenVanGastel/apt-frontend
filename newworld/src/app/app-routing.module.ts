import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildDetailComponent } from './build-detail/build-detail.component';
import { BuildOverviewComponent } from './build-overview/build-overview.component';

const routes: Routes = [
  { path: '', component: BuildOverviewComponent },
  { path: 'build/:name', component: BuildDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
