import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { HeaderComponent } from './header/header.component';
import { PeterTestComponent } from './peter-test/peter-test.component';
import {PostResponseComponent} from "./post-response/post-response.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    PeterTestComponent,
      PostResponseComponent,
],
  exports: [
    CommonModule,
    HeaderComponent,
    PeterTestComponent,
      PostResponseComponent,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }

}
