import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routes';
import { RouterModule } from '@angular/router';
import { CuousComponent } from './cuous/cuous.component';
import { PromiseComponent } from './promise/promise.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    ClarityModule.forRoot(),
    FormsModule,
    SharedModule.forRoot(),
  ],
  declarations: [
    AdminComponent,
    CuousComponent,
    PromiseComponent
  ]
})
export class AdminModule { }
