import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    RouterModule.forChild(HomeRoutes),
    FormsModule,
    SharedModule.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 2930227358,
    }),
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
