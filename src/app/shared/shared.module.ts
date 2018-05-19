import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { HeaderComponent } from './header/header.component';
import { PeterTestComponent } from './peter-test/peter-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { newPostComponent } from './new-post/new-post.component';

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
    newPostComponent
],
  exports: [
    CommonModule,
    HeaderComponent,
    PeterTestComponent,
    newPostComponent
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
