import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { HeaderComponent } from './header/header.component';
import { PeterTestComponent } from './peter-test/peter-test.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
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
    NewPostComponent,
    PostComponent
],
  exports: [
    CommonModule,
    HeaderComponent,
    PeterTestComponent,
    NewPostComponent,
    PostComponent
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
