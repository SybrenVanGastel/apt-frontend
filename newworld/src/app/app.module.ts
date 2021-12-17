import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildOverviewComponent } from './build-overview/build-overview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BuildDetailComponent } from './build-detail/build-detail.component';
import { BuildFormComponent } from './build-form/build-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildOverviewComponent,
    NavbarComponent,
    BuildDetailComponent,
    BuildFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
