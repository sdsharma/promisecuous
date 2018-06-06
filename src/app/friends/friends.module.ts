import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from './friends.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FriendsRoutes } from './friends.routing';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    RouterModule.forChild(FriendsRoutes),
    FormsModule,
    SharedModule.forRoot()
  ],
  declarations: [
    FriendsComponent
  ]
})
export class FriendsModule { }
